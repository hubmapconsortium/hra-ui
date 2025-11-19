"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
const node_os_1 = tslib_1.__importDefault(require("node:os"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const schema_module_1 = require("./util/schema-module");
/**
 * Nx executor that converts Zod schema TypeScript files to JSON schema files.
 * @param options - Executor options
 * @param context - Nx execution context containing project and workspace information
 * @returns Promise resolving to success status
 */
const runExecutor = async (options, context) => {
    devkit_1.logger.verbose('Starting zod-to-json-schema build executor');
    devkit_1.logger.verbose(`Options: ${JSON.stringify(options, undefined, 2)}`);
    const projectConfig = resolveProjectConfiguration(context);
    const buildDir = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), 'zod-to-json-schema-'));
    devkit_1.logger.verbose(`Temporary build directory: ${buildDir}`);
    const files = await (0, schema_module_1.findSchemaModules)(context, projectConfig);
    if (files.length === 0) {
        devkit_1.logger.warn('No schema files found in the project. Exiting...');
        return { success: true };
    }
    devkit_1.logger.info(`Found ${files.length} schema files. Starting compilation...`);
    devkit_1.logger.verbose('Schema files: ', files);
    const compiledFiles = await Promise.all(files.map((file) => (0, schema_module_1.compileSchemaModule)(file, buildDir, context.isVerbose)));
    const modules = await Promise.all(compiledFiles.map((file) => (0, schema_module_1.loadSchemaModule)(file)));
    devkit_1.logger.info('Compilation complete. Starting convertions...');
    const schemas = files.map((file, index) => (0, schema_module_1.convertSchemaModule)(file, modules[index], options));
    devkit_1.logger.info('Convertions complete. Writing files...');
    let count = 0;
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const schema = schemas[index];
        const outFile = node_path_1.default.format({ ...node_path_1.default.parse(file), base: undefined, ext: '.json' });
        if (schema) {
            await promises_1.default.writeFile(outFile, schema);
            count++;
        }
    }
    devkit_1.logger.info(`Wrote ${count} schemas.`);
    devkit_1.logger.info('All done!');
    return { success: true };
};
exports.default = runExecutor;
/**
 * Resolve the project configuration the executor was invoked with.
 * Throws if the executor was not run in a project context.
 *
 * @param context Executor context
 * @returns The project configuration
 */
function resolveProjectConfiguration(context) {
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
//# sourceMappingURL=build.js.map