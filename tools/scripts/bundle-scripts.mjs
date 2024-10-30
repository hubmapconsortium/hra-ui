import { Command } from 'commander';
import { build } from 'esbuild';
import { readFile } from 'fs/promises';
import { glob } from 'glob';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * @typedef BundleOptions
 * @property {string} dir
 * @property {string} entrypoint
 * @property {boolean} verbose
 */

const VERSION = '0.0.1';
const SCRIPT_PREFIXES = ['runtime', 'polyfills', 'scripts', 'vendor', 'main'];
const SCRIPT_GLOB = `{${SCRIPT_PREFIXES.join(',')}}*.js`;
const WORKER_GLOB = `worker*.js`;
const WORKER_SHIM_SCRIPT = resolve(dirname(fileURLToPath(import.meta.url)), './inline-worker-shim.js');

/** @type {(filename: string) => number} */
function getScriptOrder(filename) {
  const index = SCRIPT_PREFIXES.findIndex((prefix) => filename.startsWith(prefix));
  return index >= 0 ? index : SCRIPT_PREFIXES.length;
}

async function createBundleContent(dir, scripts, workers) {
  const imports = scripts.map((script) => `import './${script}';`);
  const inlineWorkers = {};
  for (const worker of workers) {
    const content = await readFile(resolve(dir, worker), { encoding: 'utf-8' });
    inlineWorkers[worker] = content.trimEnd();
  }

  return `
    ${imports.join('\n')}
    import { registerInlineWorkers } from '${WORKER_SHIM_SCRIPT}';
    registerInlineWorkers(${JSON.stringify(inlineWorkers)});
  `;
}

/** @type {(options: BundleOptions) => Promise<void>} */
async function bundleScripts(options) {
  const { dir, entrypoint, verbose } = options;
  const scripts = await glob(SCRIPT_GLOB, { cwd: dir });
  const workers = await glob(WORKER_GLOB, { cwd: dir });

  scripts.sort((a, b) => getScriptOrder(a) - getScriptOrder(b));
  if (scripts.length === 0) {
    throw new Error('No scripts to bundle found!');
  }

  const content = await createBundleContent(dir, scripts, workers);

  await build({
    allowOverwrite: true,
    bundle: true,
    format: 'esm',
    inject: [WORKER_SHIM_SCRIPT],
    legalComments: 'eof',
    logLevel: verbose ? 'debug' : 'silent',
    minify: true,
    outfile: resolve(dir, entrypoint),
    stdin: {
      contents: content,
      resolveDir: resolve(dir),
      sourcefile: entrypoint,
      loader: 'js',
    },
  });
}

function createProgram() {
  return new Command()
    .name('bundle-scripts')
    .description('CLI to bundle angular output scripts into a single javascript file')
    .version(VERSION)
    .argument('<dir>', 'directory with angular output')
    .option('-e, --entrypoint', 'bundle entry point name', 'wc.js')
    .option('-v, --verbose', 'enable verbose logging');
}

async function main() {
  const program = createProgram();
  program.parse();
  await bundleScripts({
    dir: program.args[0],
    entrypoint: program.getOptionValue('entrypoint'),
    verbose: program.getOptionValue('verbose'),
  });
}

await main();
