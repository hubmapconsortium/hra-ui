import { Command } from 'commander';
import { build } from 'esbuild';
import { resolve } from 'node:path';

/**
 * @typedef BundleOptions
 * @property {boolean} verbose
 */

const VERSION = '0.0.1';

/** @type {(script: string, dir: string, options: BundleOptions) => Promise<void>} */
async function bundleCliAction(script, dir, options) {
  await build({
    allowOverwrite: true,
    bundle: true,
    entryPoints: [resolve(script)],
    external: ['node:*'],
    format: 'iife',
    legalComments: 'eof',
    logLevel: options.verbose ? 'debug' : 'silent',
    minify: false,
    outdir: resolve(dir),
  });
}

const program = new Command()
  .name('bundle-cli')
  .description('Bundle a cli script')
  .version(VERSION)
  .argument('<script>', 'CLI script to bundle')
  .argument('<dir>', 'output directory')
  .option('-v, --verbose', 'enable verbose logging')
  .action(bundleCliAction);

await program.parseAsync();
