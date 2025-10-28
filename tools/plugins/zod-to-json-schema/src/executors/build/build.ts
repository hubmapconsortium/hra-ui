import { PromiseExecutor, logger } from '@nx/devkit';
import { pathToFileURL } from 'node:url';
import { register } from '@swc-node/register/register';
import { glob, writeFile } from 'node:fs/promises';
import { join, resolve, format, parse } from 'node:path';
import * as z from 'zod';
import { BuildExecutorSchema } from './schema';
import { ModuleKind, ModuleResolutionKind, ScriptTarget } from 'typescript';

/**
 * Result of building a single schema file.
 */
interface SchemaBuildResult {
  /** Path to the output JSON schema file */
  file: string;
  /** Formatted JSON schema content */
  content: string;
}

/**
 * Nx executor that converts Zod schema TypeScript files to JSON schema files.
 * @param options - Executor options (currently unused but reserved for future configuration)
 * @param context - Nx execution context containing project and workspace information
 * @returns Promise resolving to success status
 */
const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (options, context) => {
  if (!context.projectName) {
    logger.error('No project name found in context');
    return { success: false };
  }

  const projectConfig = context.projectsConfigurations?.projects[context.projectName];
  if (!projectConfig) {
    logger.error(`Project configuration not found for ${context.projectName}`);
    return { success: false };
  }

  const projectRoot = projectConfig.root;
  const workspaceRoot = context.root;

  // TODO load ts config from project

  register({
    target: ScriptTarget.ES2020,
    module: ModuleKind.ES2015,
    esModuleInterop: true,
    moduleResolution: ModuleResolutionKind.Bundler,
    sourcemap: true,
  });

  const files = await findSchemaFiles(projectRoot, workspaceRoot);
  logger.info(`Building schemas for ${files.length} files...`);

  const builders = files.map((file) => buildSchema(file, options));
  const result = await Promise.all(builders);
  const items = result.filter((item) => !!item);
  if (items.length === 0) {
    return { success: false };
  }

  const success = await writeSchemaFiles(items);
  // TODO format files
  // Invoke nx format:write --files <filePaths>?
  return { success };
};

export default runExecutor;

async function findSchemaFiles(projectRoot: string, workspaceRoot: string): Promise<string[]> {
  const files = glob('**/*.schema.ts', { cwd: join(workspaceRoot, projectRoot) });
  const result: string[] = [];
  for await (const file of files) {
    result.push(file);
  }

  return result;
}

/**
 * Builds a JSON schema from a TypeScript schema file.
 *
 * @param file - Relative path to the schema TypeScript file
 * @param options - Build options to pass to the JSON schema converter
 * @returns Promise resolving to the build result with file path and content
 */
async function buildSchema(file: string, options: BuildExecutorSchema): Promise<SchemaBuildResult | undefined> {
  const schema = await loadSchema(file);
  const content = schema && toJSONSchema(file, schema, options);
  return content ? { file: format({ ...parse(file), ext: 'json' }), content } : undefined;
}

function ensureDefaultExport(module: object, file: string): module is { default: unknown } {
  if ('default' in module) {
    return true;
  }

  logger.error(`Schema module '${file}' is missing a default export`);
  return false;
}

function ensureSchemaExport(def: unknown, file: string): def is z.ZodType {
  if (def instanceof z.ZodType) {
    return true;
  }

  logger.error(`Schema module '${file}' default export is not a zod schema`);
  return false;
}

/**
 * Dynamically imports a schema module from its file URL.
 * @param fileUrl - File URL pointing to the schema module
 * @returns Promise resolving to the imported module object
 */
async function loadSchema(file: string): Promise<z.ZodType | undefined> {
  const url = pathToFileURL(resolve(file)).href;
  const module = await import(url).catch((reason) => {
    logger.error(`Failed to import schema definitions from '${file}': ${reason}`);
    return undefined;
  });

  if (module && ensureDefaultExport(module, file) && ensureSchemaExport(module.default, file)) {
    return module.default;
  }

  return undefined;
}

/**
 * Converts a Zod schema module to JSON schema string.
 * @param file - Path to the schema file (used for error messages)
 * @param module - The imported schema module
 * @param options - Options to pass to the JSON schema converter
 * @returns JSON string representation of the schema
 * @throws Error if the module doesn't have a default export
 */
function toJSONSchema(file: string, schema: z.ZodType, options: BuildExecutorSchema): string | undefined {
  try {
    const json = z.toJSONSchema(schema, options);
    return JSON.stringify(json, undefined, 2);
  } catch (error) {
    logger.error(`Failed to convert schema from '${file}': ${error}`);
    return undefined;
  }
}

/**
 * Formats JSON schema output using Prettier.
 * @param text - Raw JSON string to format
 * @param file - File path (used to resolve Prettier config and determine file type)
 * @returns Promise resolving to formatted JSON string
 */
// async function formatSchemaOutput(text: string, file: string): Promise<string> {
//   const config = await resolveConfig(file, { editorconfig: true });
//   return format(text, { ...config, filepath: file });
// }

/**
 * Writes all generated JSON schema files to disk.
 * @param results - Array of build results containing file paths and contents
 * @returns Promise resolving to true if all files written successfully, false otherwise
 */
async function writeSchemaFiles(results: SchemaBuildResult[]): Promise<boolean> {
  const writers = results.map((result) => writeFile(result.file, result.content, 'utf8'));
  try {
    await Promise.all(writers);
    return true;
  } catch (error) {
    logger.error(`Failed to write: ${error}`);
    return false;
  }
}
