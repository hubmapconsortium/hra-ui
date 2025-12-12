import { ExecutorContext, ProjectConfiguration, PromiseExecutor, logger } from '@nx/devkit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { BuildExecutorSchema } from './schema';
import { compileSchemaModule, convertSchemaModule, findSchemaModules, loadSchemaModule } from './util/schema-module';

/**
 * Nx executor that converts Zod schema TypeScript files to JSON schema files.
 * @param options - Executor options
 * @param context - Nx execution context containing project and workspace information
 * @returns Promise resolving to success status
 */
const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (options, context) => {
  logger.verbose('Starting zod-to-json-schema build executor');
  logger.verbose(`Options: ${JSON.stringify(options, undefined, 2)}`);

  const projectConfig = resolveProjectConfiguration(context);
  const files = await findSchemaModules(context, projectConfig);
  if (files.length === 0) {
    logger.warn('No schema files found in the project. Exiting...');
    return { success: true };
  }

  logger.info(`Found ${files.length} schema files. Starting compilation...`);
  logger.verbose('Schema files: ', files);
  const compiledFiles = await Promise.all(files.map((file) => compileSchemaModule(file, context.isVerbose)));
  const modules = await Promise.all(compiledFiles.map((content) => loadSchemaModule(content)));

  logger.info('Compilation complete. Starting convertions...');
  const schemas = files.map((file, index) => convertSchemaModule(file, modules[index], options));

  logger.info('Convertions complete. Writing files...');
  let count = 0;
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const schema = schemas[index];
    const outFile = path.format({ ...path.parse(file), base: undefined, ext: '.json' });

    if (schema) {
      await fs.writeFile(outFile, schema);
      count++;
    }
  }

  logger.info(`Built ${count} schemas.`);
  logger.info('All done!');
  return { success: true };
};

export default runExecutor;

/**
 * Resolve the project configuration the executor was invoked with.
 * Throws if the executor was not run in a project context.
 *
 * @param context Executor context
 * @returns The project configuration
 */
function resolveProjectConfiguration(context: ExecutorContext): ProjectConfiguration {
  const { projectName } = context;
  if (!projectName) {
    throw new Error('zod-to-json-schema build must be run within a project context');
  }

  const config = context.projectsConfigurations.projects[projectName];
  if (!config) {
    throw new Error(`Could not find configuration for project "${projectName}"`);
  }

  return config;
}
