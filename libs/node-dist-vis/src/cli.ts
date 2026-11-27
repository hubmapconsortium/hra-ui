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
import { NODE_STREAM_INPUT, parse } from 'papaparse';

const VERSION = '0.0.1';

interface GenerateEdgesOptions {
  target: string;
  keys: string[];
  maxDistance: string;
  output: string;
}

function readCsv(input: string): AsyncIterable<Record<string, unknown>> {
  let inputStream: NodeJS.ReadableStream =
    !input || input === '-' ? process.stdin : createReadStream(input, { autoClose: true });
  if (input?.endsWith('.gz')) {
    inputStream = inputStream.pipe(createGunzip());
  }
  return inputStream.pipe(parse(NODE_STREAM_INPUT, { header: true, dynamicTyping: true, skipEmptyLines: 'greedy' }));
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

async function loadNodes(file: string, mappings: string[]): Promise<NodesView | undefined> {
  const data: Record<string, unknown>[] = [];
  for await (const row of readCsv(file)) {
    data.push(row);
  }
  if (data.length === 0) {
    return undefined;
  }

  const mapping = createKeyMapping(data[0], mappings);
  return new NodesView(data, mapping);
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
  nodes: NodesView | undefined,
  target: string,
  maxDistance: number,
  outputFile: string,
): Promise<void> {
  const length = nodes?.length ?? 0;
  const reportStep = Math.max(1, Math.floor(length / 20));
  const writeStream = createWriteStream(outputFile, { encoding: 'utf-8' });

  writeStream.write('Cell ID,Target ID,X1,Y1,Z1,X2,Y2,Z2\n');

  if (nodes) {
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
  } else {
    // eslint-disable-next-line no-console
    console.warn('No nodes found in input');
  }

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
