#!/usr/bin/env node

import { Command } from 'commander';
import { saveJsonSchema } from './json-schema.js';

const program = new Command();

program
  .command('json-schemas')
  .description(
    'Exports the JSON Schema used to validate registrations.yaml files'
  )
  .argument('<output path>', 'Path for storing the json schema')
  .action((str) => {
    saveJsonSchema(str);
  });

program.parse(process.argv);