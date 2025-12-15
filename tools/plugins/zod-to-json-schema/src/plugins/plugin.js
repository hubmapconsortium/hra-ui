"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodesV2 = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const glob_1 = require("glob");
const path = tslib_1.__importStar(require("node:path"));
/** Glob pattern for matching project configuration files */
const PROJECT_CONFIG_FILES_GLOB = '**/project.json';
/** Glob pattern for matching zod schema files */
const ZOD_SCHEMA_FILES_GLOB = '**/*.schema.ts';
/** Plugin entrypoint */
exports.createNodesV2 = [
    PROJECT_CONFIG_FILES_GLOB,
    (configFiles, options, context) => (0, devkit_1.createNodesFromFiles)(internalCreateNodesV2, configFiles, options ?? {}, context),
];
/**
 * Adds a build json schema target if the project has any zod schema files
 *
 * @param configFile Project configuration file path
 * @param opts Plugin options
 * @param context Plugin runtime context
 * @returns New project configuration
 */
async function internalCreateNodesV2(configFile, opts, context) {
    const options = normalizeOptions(opts);
    const projectRoot = path.dirname(configFile);
    const dir = path.join(context.workspaceRoot, projectRoot);
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
async function hasSchemaFiles(dir) {
    const files = (0, glob_1.globIterate)(ZOD_SCHEMA_FILES_GLOB, { cwd: dir });
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
function normalizeOptions(options) {
    options ??= {};
    options.targetName ??= 'build-json-schemas';
    return options;
}
//# sourceMappingURL=plugin.js.map