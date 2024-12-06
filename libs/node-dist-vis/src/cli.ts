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
  validateViewKeyMapping,
} from '@hra-ui/node-dist-vis/models';
import { Command } from 'commander';
import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'papaparse';

const VERSION = '0.0.1';

interface GenerateEdgesOptions {
  target: string;
  keys: string[];
  maxDistance: string;
  output: string;
}

function createBaseKeyMapping(mappings: string[]): Partial<KeyMapping<NodeEntry>> {
  const normalize = (value: string) => value.replace(/\\:/g, ':');
  const result: Record<string, string> = {};
  for (const mapping of mappings) {
    const [from, to] = mapping.split(/(?<!\\):/, 2);
    result[normalize(from)] = normalize(to);
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
  const fileContent = await readFile(file, { encoding: 'utf-8' });
  const { data } = parse<unknown[]>(fileContent, { dynamicTyping: true, skipEmptyLines: 'greedy' });
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

const edgeKeyMapping = {
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
  const result = await (await edges.toCsv()).text();
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
  .option('-t, --target', 'node target selector', 'Endothelial')
  .option('-k, --keys <mapping...>', "key mapping in the format 'from:to'", [])
  .option('-d, --max-distance', '', '1000')
  .option('-o, --output <filename>', 'output file for generated edges', 'edges.csv')
  .action(generateEdgesAction);

program.parseAsync();
