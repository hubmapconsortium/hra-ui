import { Command } from 'commander';
import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
import { format, parse, resolve } from 'node:path';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * @typedef BuildOptions
 * @property {string} schema
 * @property {string} name
 * @property {boolean} useDefinitions
 * @property {string} output
 * @property {boolean} verbose
 */

const VERSION = '0.0.1';

/** @type {(value: unknown) => value is import("zod").ZodTypeAny} */
function isZodType(value) {
  return value !== null && typeof value === 'object' && typeof value['parse'] === 'function';
}

/** @type {(file: string, module: Record<string, unknown>, key: string) => import("zod").ZodTypeAny} */
function getRootSchema(file, module, key) {
  if (!(key in module)) {
    throw new Error(`No schema named '${key}' exported from '${file}'`);
  } else if (!isZodType(module[key])) {
    throw new Error(`Export '${key}' is not a zod type`);
  }

  return module[key];
}

/** @type {(name: string) => string} */
function normalizeDefinitionName(name) {
  const suffix = 'schema';
  if (name.toLowerCase().endsWith(suffix)) {
    return name.slice(0, -suffix.length);
  }

  return name;
}

/** @type {(module: Record<string, unknown>, rootSchema: import("zod").ZodTypeAny) => Record<string, import("zod").ZodTypeAny>} */
function getDefinitions(module, rootSchema) {
  /** @type {Record<string, import("zod").ZodTypeAny>} */
  const result = {};
  for (const [key, value] of Object.entries(module)) {
    if (isZodType(value) && key !== 'default' && value !== rootSchema) {
      result[normalizeDefinitionName(key)] = value;
    }
  }

  return result;
}

/** @type {(schema: string) => string | undefined} */
function inferName(schema) {
  return schema !== 'default' ? normalizeDefinitionName(schema) : undefined;
}

/** @type {(file: string) => string} */
function inferOutput(file) {
  return format({ ...parse(file), base: '', ext: 'json' });
}

/** @type {(file: string, options: BuildOptions) => Promise<void>} */
async function buildJsonSchemaAction(file, options) {
  const { schema, name = inferName(schema), useDefinitions, output = inferOutput(file), verbose } = options;

  const {
    outputFiles: [{ text: code }],
  } = await build({
    bundle: true,
    entryPoints: [resolve(file)],
    format: 'esm',
    logLevel: verbose ? 'debug' : 'silent',
    minify: true,
    write: false,
  });

  const module = await import(`data:text/javascript,${encodeURIComponent(code)}`);
  const rootSchema = getRootSchema(file, module, schema);
  const definitions = useDefinitions ? getDefinitions(module, rootSchema) : undefined;
  const result = zodToJsonSchema(rootSchema, { name, definitions });

  await writeFile(resolve(output), JSON.stringify(result, undefined, 2), 'utf8');
}

const program = new Command()
  .name('build-json-schema')
  .description('Create a json schema from zod definitions')
  .version(VERSION)
  .argument('<file>', 'typescript file with zod definitions')
  .option('-s, --schema <export-name>', 'root schema', 'default')
  .option('-n, --name <schema-name>', 'root schema name')
  .option('-d, --use-definitions', 'infer recurring schemas', true)
  .option('-o, --output <file>', 'output file')
  .option('-v, --verbose', 'enable verbose logging')
  .action(buildJsonSchemaAction);

await program.parseAsync();
