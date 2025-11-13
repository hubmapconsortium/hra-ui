import {
  AnyDataEntry,
  EdgeEntry,
  generateEdges,
  inferViewKeyMappingImpl,
  KeyMapping,
  NodeEntry,
  NodesView,
  OPTIONAL_NODE_KEYS,
  REQUIRED_NODE_KEYS,
  validateViewKeyMapping,
} from '@hra-ui/node-dist-vis/models';
import { Command } from 'commander';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { parse } from 'papaparse';

const VERSION = '0.0.1';

interface GenerateEdgesOptions {
  target: string;
  keys: string[];
  maxDistance: string;
  output: string;
}

async function* readLines(inputFile: string): AsyncGenerator<string> {
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

function edgeToRow(edge: EdgeEntry): string {
  return `${edge['Cell ID']},${edge['Target ID']},${edge.X1},${edge.Y1},${edge.Z1},${edge.X2},${edge.Y2},${edge.Z2}\n`;
}

async function streamEdgesToCsv(
  nodes: NodesView,
  target: string,
  maxDistance: number,
  outputFile: string,
): Promise<void> {
  const { length } = nodes;
  const reportStep = Math.max(1, Math.floor(length / 20));
  const writeStream = createWriteStream(outputFile, { encoding: 'utf-8' });

  writeStream.write('Cell ID,Target ID,X1,Y1,Z1,X2,Y2,Z2\n');

  let edgeCount = 0;
  reportProgress(0, length);

  for (const edge of generateEdges(nodes, target, maxDistance)) {
    writeStream.write(edgeToRow(edge));
    edgeCount++;

    if (edgeCount % reportStep === 0) {
      reportProgress(edgeCount, length);
    }
  }

  reportProgress(length, length);

  return new Promise((resolve, reject) => {
    writeStream.end(() => resolve());
    writeStream.on('error', reject);
  });
}

async function generateEdgesAction(file: string, options: GenerateEdgesOptions): Promise<void> {
  const nodes = await loadNodes(file, options.keys);
  await streamEdgesToCsv(nodes, options.target, Number(options.maxDistance), options.output);
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
