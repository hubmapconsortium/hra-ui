import { CreateNodesContextV2, createNodesFromFiles, CreateNodesResult, CreateNodesV2 } from '@nx/devkit';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/** Plugin options */
export interface ZodToJsonSchemaPluginOptions {
  /** Task name for building schemas, defaults to 'build-json-schemas' */
  targetName?: string;
}

/** Glob pattern for matching project configuration files */
const PROJECT_CONFIG_FILES_GLOB = '**/project.json';
/** Glob pattern for matching zod schema files */
const ZOD_SCHEMA_FILES_GLOB = '**/*.schema.ts';

/** Plugin entrypoint */
export const createNodesV2: CreateNodesV2<ZodToJsonSchemaPluginOptions> = [
  PROJECT_CONFIG_FILES_GLOB,
  (configFiles, options, context) => createNodesFromFiles(internalCreateNodesV2, configFiles, options ?? {}, context),
];

/**
 * Adds a build json schema target if the project has any zod schema files
 *
 * @param configFile Project configuration file path
 * @param opts Plugin options
 * @param context Plugin runtime context
 * @returns New project configuration
 */
async function internalCreateNodesV2(
  configFile: string,
  opts: ZodToJsonSchemaPluginOptions | undefined,
  context: CreateNodesContextV2,
): Promise<CreateNodesResult> {
  const options = normalizeOptions(opts);
  const projectRoot = path.dirname(configFile);
  const dir = path.resolve(context.workspaceRoot, projectRoot);

  if (!(await hasSchemaFiles(dir))) {
    return {};
  }

  return {
    projects: {
      [projectRoot]: {
        targets: {
          [options.targetName]: {
            executor: '@hra-ui/zod-to-json-schema:build',
            cache: true,
            inputs: [`{projectRoot}/**/*.schema.ts`, { externalDependencies: ['zod'] }],
            outputs: [`{projectRoot}/**/*.schema.json`],
          },
        },
      },
    },
  };
}

/**
 * Tests whether a directory contains any zod schema files
 *
 * @param dir Base directory when globbing
 * @returns True if the exists at least on file matching `ZOD_SCHEMA_FILES_GLOB`, false otherwise
 */
async function hasSchemaFiles(dir: string): Promise<boolean> {
  const files = fs.glob(ZOD_SCHEMA_FILES_GLOB, { cwd: dir });
  for await (const _file of files) {
    return true;
  }

  return false;
}

/**
 * Normalizes plugin options by applying defaults
 *
 * @param options Pre-normalized options
 * @returns Normalized options
 */
function normalizeOptions(options?: ZodToJsonSchemaPluginOptions): Required<ZodToJsonSchemaPluginOptions> {
  options ??= {};
  options.targetName ??= 'build-json-schemas';
  return options as Required<ZodToJsonSchemaPluginOptions>;
}
