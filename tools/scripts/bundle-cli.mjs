import { Command } from 'commander';
import { build } from 'esbuild';
import { chmod } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * @typedef BundleOptions
 * @property {string} output
 * @property {boolean} verbose
 */

const VERSION = '0.0.1';

/** @type {(script: string, dir: string, options: BundleOptions) => Promise<void>} */
async function bundleCliAction(script, dir, options) {
  const outfile = resolve(dir, options.output);
  await build({
    allowOverwrite: true,
    banner: {
      js: '#!/usr/bin/env node',
    },
    bundle: true,
    entryPoints: [resolve(script)],
    external: ['node:*'],
    format: 'iife',
    legalComments: 'eof',
    logLevel: options.verbose ? 'debug' : 'silent',
    minify: false,
    outfile,
  });

  await chmod(outfile, 0o755);
}

const program = new Command()
  .name('bundle-cli')
  .description('Bundle a cli script')
  .version(VERSION)
  .argument('<script>', 'CLI script to bundle')
  .argument('<dir>', 'output directory')
  .option('-o, --output <filename>', 'output file name', 'cli.js')
  .option('-v, --verbose', 'enable verbose logging')
  .action(bundleCliAction);

await program.parseAsync();
