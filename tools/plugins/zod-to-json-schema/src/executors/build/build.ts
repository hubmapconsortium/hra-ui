import { PromiseExecutor, logger } from '@nx/devkit';
import { pathToFileURL } from 'node:url';
import { register } from '@swc-node/register/register';
import { glob, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { format, resolveConfig } from 'prettier';
import z, { toJSONSchema } from 'zod';
import { BuildExecutorSchema } from './schema';
import { ModuleKind, ModuleResolutionKind, ScriptTarget } from 'typescript';

interface SchemaBuildResult {
  file: string;
  content: string;
}

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
  const absoluteProjectRoot = join(workspaceRoot, projectRoot);

  // Register TypeScript loader once for the entire executor run
  register({
    target: ScriptTarget.ES2020,
    module: ModuleKind.ES2015,
    esModuleInterop: true,
    moduleResolution: ModuleResolutionKind.Node16,
    sourcemap: true,
  });

  const files = glob('**/*.schema.ts', { cwd: absoluteProjectRoot });
  const builds: Promise<SchemaBuildResult>[] = [];
  for await (const file of files) {
    builds.push(buildSchema(file, options));
  }

  const results = await Promise.allSettled(builds);
  const [items, errors] = results.reduce<[SchemaBuildResult[], unknown[]]>(
    (acc, result) => {
      if (result.status === 'fulfilled') {
        acc[0].push(result.value);
      } else {
        acc[1].push(result.reason);
      }
      return acc;
    },
    [[], []],
  );

  if (errors.length > 0) {
    logger.error(`Build errors: ${errors}`);
    return { success: false };
  }

  const success = await writeSchemaFiles(items);
  return { success };
};

export default runExecutor;

async function buildSchema(file: string, options: BuildExecutorSchema): Promise<SchemaBuildResult> {
  const outFile = file.slice(0, -3) + '.json';
  const fileUrl = compileSchemaModule(file);
  const module = await loadSchemaModule(fileUrl);
  const text = schemaModuleToJson(file, module, options);
  const content = await formatSchemaOutput(text, outFile);
  return { file: outFile, content };
}

function compileSchemaModule(file: string): string {
  const absolutePath = resolve(file);
  return pathToFileURL(absolutePath).href;
}

function loadSchemaModule(fileUrl: string): Promise<object> {
  return import(fileUrl);
}

function schemaModuleToJson(file: string, module: object, options: BuildExecutorSchema): string {
  if (!('default' in module)) {
    throw new Error(`Schema module '${file}' is missing default export`);
  }

  const json = toJSONSchema(module.default as z.ZodSchema, options);
  return JSON.stringify(json, undefined, 2);
}

async function formatSchemaOutput(text: string, file: string): Promise<string> {
  const config = await resolveConfig(file, { editorconfig: true });
  return format(text, { ...config, filepath: file });
}

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
