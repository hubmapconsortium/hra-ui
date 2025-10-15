import {
  CreateNodesContextV2,
  createNodesFromFiles,
  CreateNodesResult,
  CreateNodesV2,
  TargetConfiguration,
} from '@nx/devkit';
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export interface ZodToJsonSchemaPluginOptions {
  buildTargetName?: string;
}

type ZodToJsonSchemaPluginOptionsWithDefaults = Required<ZodToJsonSchemaPluginOptions>;

const defaultOptions: ZodToJsonSchemaPluginOptionsWithDefaults = {
  buildTargetName: 'build-schema', // TODO rename to build-json-schemas
};

export const createNodesV2: CreateNodesV2<ZodToJsonSchemaPluginOptions> = [
  '**/*.schema.ts',
  async (schemaFiles, options = {}, context) => {
    const optionsWithDefaults = applyOptionsDefaults(options);
    const projectRoots = await findProjectRoots(schemaFiles, optionsWithDefaults, context);
    return await createNodesFromFiles(createNodesInternal, projectRoots, optionsWithDefaults, context);
  },
];

function applyOptionsDefaults(options: ZodToJsonSchemaPluginOptions): ZodToJsonSchemaPluginOptionsWithDefaults {
  return { ...defaultOptions, ...options };
}

async function createNodesInternal(
  projectRoot: string,
  options: ZodToJsonSchemaPluginOptionsWithDefaults | undefined,
  context: CreateNodesContextV2,
): Promise<CreateNodesResult> {
  if (!options) {
    throw new Error('Unreachable!');
  }

  const buildTarget: TargetConfiguration = {
    executor: '@hra-ui/zod-to-json-schema-plugin:build',
    // TODO options?
    cache: true,
    inputs: [`{projectRoot}/**/*.schema.ts`, { externalDependencies: ['zod'] }],
    outputs: [`{projectRoot}/**/*.schema.json`],
  };

  return {
    projects: {
      [projectRoot]: {
        targets: {
          [options.buildTargetName || 'build-schema']: buildTarget,
        },
      },
    },
  };
}

async function findProjectRoots(
  schemaFiles: readonly string[],
  options: ZodToJsonSchemaPluginOptionsWithDefaults,
  context: CreateNodesContextV2,
) {
  const projectRoots = await Promise.all(schemaFiles.map((file) => findProjectRoot(file, options, context)));
  return Array.from(new Set(projectRoots.filter((root) => root !== undefined)));
}

async function findProjectRoot(
  schemaFile: string,
  options: ZodToJsonSchemaPluginOptionsWithDefaults,
  context: CreateNodesContextV2,
): Promise<string | undefined> {
  let currentDir = dirname(schemaFile);
  let parentDir = dirname(currentDir);
  while (currentDir !== parentDir) {
    const files = await readdir(join(context.workspaceRoot, currentDir));
    if (files.includes('package.json') || files.includes('project.json')) {
      return currentDir;
    }

    currentDir = parentDir;
    parentDir = dirname(parentDir);
  }

  return undefined;
}
