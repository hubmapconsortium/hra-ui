import { PromiseExecutor, logger } from '@nx/devkit';
import { zodToJsonSchema } from '@alcyone-labs/zod-to-json-schema';
import { glob } from 'fast-glob';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { buildSync } from 'esbuild';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';
import { BuildExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (options, context) => {
  const {
    pattern = '**/*.schema.ts',
    outputExtension = '.schema.json',
    schemaRefPath = 'https://json-schema.org/draft-07/schema#',
  } = options;

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

  logger.info(`Building JSON schemas for project: ${context.projectName}`);
  logger.info(`Project root: ${projectRoot}`);

  try {
    const schemaFiles = await glob(pattern, {
      cwd: absoluteProjectRoot,
      absolute: false,
    });

    if (schemaFiles.length === 0) {
      logger.warn(`No schema files found matching pattern: ${pattern}`);
      return { success: true };
    }

    logger.info(`Found ${schemaFiles.length} schema file(s)`);

    let successCount = 0;
    let errorCount = 0;

    for (const schemaFile of schemaFiles) {
      try {
        await processSchemaFile(schemaFile, absoluteProjectRoot, outputExtension, schemaRefPath);
        successCount++;
        logger.info(`✓ Converted: ${schemaFile}`);
      } catch (error) {
        errorCount++;
        logger.error(`✗ Failed to convert ${schemaFile}: ${error}`);
      }
    }

    logger.info(`\nConversion complete: ${successCount} succeeded, ${errorCount} failed`);

    return { success: errorCount === 0 };
  } catch (error) {
    logger.error(`Error during schema conversion: ${error}`);
    return { success: false };
  }
};

async function processSchemaFile(
  schemaFile: string,
  projectRoot: string,
  outputExtension: string,
  schemaRefPath: string,
): Promise<void> {
  const absoluteSchemaPath = join(projectRoot, schemaFile);

  const tempDir = tmpdir();
  const tempFile = join(tempDir, `schema-${randomBytes(8).toString('hex')}.js`);

  try {
    const result = buildSync({
      entryPoints: [absoluteSchemaPath],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      outfile: tempFile,
      logLevel: 'silent',
      keepNames: true,
    });

    if (result.errors && result.errors.length > 0) {
      throw new Error(`esbuild errors: ${JSON.stringify(result.errors)}`);
    }

    delete require.cache[tempFile];
    const module = require(tempFile);

    let schema = module.default;

    if (!schema || !isZodSchema(schema)) {
      schema = findZodSchema(module);
    }

    if (!schema) {
      throw new Error(`No Zod schema found in file. Module exports: ${Object.keys(module).join(', ')}`);
    }

    const jsonSchema = zodToJsonSchema(schema, {
      $refStrategy: 'none',
      target: 'jsonSchema7',
    });

    const outputSchema = {
      $schema: schemaRefPath,
      ...jsonSchema,
    };

    const outputPath = absoluteSchemaPath.replace(/\.ts$/, '.json');

    await mkdir(dirname(outputPath), { recursive: true });

    await writeFile(outputPath, JSON.stringify(outputSchema, null, 2) + '\n', 'utf-8');
  } catch (error) {
    throw new Error(`Failed to process schema file: ${error}`);
  }
}

function findZodSchema(module: Record<string, unknown>): unknown {
  for (const key of Object.keys(module)) {
    const value = module[key];
    if (isZodSchema(value)) {
      return value;
    }
  }
  return null;
}

function isZodSchema(value: unknown): boolean {
  return value !== null && typeof value === 'object' && ('_def' in value || 'def' in value);
}

export default runExecutor;
