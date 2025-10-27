import {
  AnyDataEntry,
  EdgeEntry,
  EdgesView,
  generateEdges,
  inferViewKeyMappingImpl,
  KeyMapping,
  NodeEntry,
  NodesView,
  OPTIONAL_NODE_KEYS,
  REQUIRED_NODE_KEYS,
  toCsv,
  validateViewKeyMapping,
} from '@hra-ui/node-dist-vis/models';
import { Command } from 'commander';
import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { createGunzip } from 'node:zlib';
import { parse } from 'papaparse';

const VERSION = '0.0.1';

interface GenerateEdgesOptions {
  target: string;
  keys: string[];
  maxDistance: string;
  output: string;
}

async function* readLines(inputFile: string) {
  let inputStream: NodeJS.ReadableStream =
    !inputFile || inputFile === '-' ? process.stdin : createReadStream(inputFile, { autoClose: true });
  if (inputFile?.endsWith('.gz')) {
    inputStream = inputStream.pipe(createGunzip());
  }
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  for await (const chunk of inputStream) {
    buffer += decoder.decode(chunk as Buffer, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      yield line;
    }
  }
  if (buffer.length > 0) {
    yield buffer;
  }
}

async function* readCsv(input: string): AsyncGenerator<Record<string, string>> {
  let header: string[] | undefined;
  const options = { skipEmptyLines: true, header: false };

  for await (const line of readLines(input)) {
    const parsed = parse<string[]>(line, options);
    const row = parsed.data?.[0];

    if (!row) {
      continue;
    }

    if (!header) {
      header = row;
    } else {
      const result: Record<string, string> = {};
      for (let i = 0; i < header.length; i++) {
        result[header[i]] = row[i];
      }
      yield result;
    }
  }
}

function createBaseKeyMapping(mappings: string[]): Partial<KeyMapping<NodeEntry>> {
  const result: Record<string, string> = {};

  for (const mapping of mappings) {
    const [from, to] = mapping.split(/(?<!\\):/, 2);
    result[from.replaceAll('\\:', ':')] = to.replaceAll('\\:', ':');
  }

  return result;
}

function createKeyMapping(entry: AnyDataEntry, mappings: string[]): KeyMapping<NodeEntry> {
  const result = createBaseKeyMapping(mappings);
  inferViewKeyMappingImpl(entry, result, [...REQUIRED_NODE_KEYS, ...OPTIONAL_NODE_KEYS]);

  const error = validateViewKeyMapping(result, REQUIRED_NODE_KEYS);
  if (error) {
    throw error;
  }

  return result as KeyMapping<NodeEntry>;
}

async function loadNodes(file: string, mappings: string[]): Promise<NodesView> {
  const data: Record<string, string>[] = [];
  for await (const row of readCsv(file)) {
    data.push(row);
  }
  const mapping = createKeyMapping(data[0], mappings);
  return new NodesView(data, mapping, 1);
}

const progressTimeFormat = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3,
});

function reportProgress(processed: number, total: number): void {
  const timestamp = Date.now();
  const percentage = Math.round((100 * processed) / total);
  const time = progressTimeFormat.format(timestamp);
  // eslint-disable-next-line no-console
  console.log(`Computing edges: ${percentage}% (${processed}/${total}) complete at ${time}`);
}

function generateEdgesWithProgress(nodes: NodesView, target: string, maxDistance: number): EdgeEntry[] {
  const { length } = nodes;
  const reportStep = Math.floor(length / 20);
  const edges: EdgeEntry[] = [];

  reportProgress(0, length);
  for (const edge of generateEdges(nodes, target, maxDistance)) {
    edges.push(edge);
    if (edges.length % reportStep === 0) {
      reportProgress(edges.length, length);
    }
  }

  reportProgress(length, length);
  return edges;
}

const edgeKeyMapping: KeyMapping<EdgeEntry> = {
  'Cell ID': 'Cell ID',
  'Target ID': 'Target ID',
  X1: 'X1',
  Y1: 'Y1',
  Z1: 'Z1',
  X2: 'X2',
  Y2: 'Y2',
  Z2: 'Z2',
};

async function generateEdgesAction(file: string, options: GenerateEdgesOptions): Promise<void> {
  const nodes = await loadNodes(file, options.keys);
  const entries = generateEdgesWithProgress(nodes, options.target, Number(options.maxDistance));
  const edges = new EdgesView(entries, edgeKeyMapping);
  const result = await (await toCsv(edges)).text();
  await writeFile(options.output, result, { encoding: 'utf-8' });
}

const program = new Command()
  .name('@hra-ui/node-dist-vis')
  .description('Node distance visualization CLI')
  .version(VERSION);

program
  .command('generate-edges')
  .description('Generate edges from nodes')
  .argument('<nodes>', 'csv file with nodes')
  .option('-t, --target <target>', 'node target selector', 'Endothelial')
  .option('-k, --keys <mapping...>', "key mapping in the format 'from:to'", [])
  .option('-d, --max-distance <maxDistance>', 'max distance to target', '1000')
  .option('-o, --output <filename>', 'output file for generated edges', 'edges.csv')
  .action(generateEdgesAction);

program.parseAsync();
