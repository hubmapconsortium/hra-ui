import { CreateNodesV2 } from '@nx/devkit';
/** Plugin options */
export interface ZodToJsonSchemaPluginOptions {
    /** Task name for building schemas, defaults to 'build-json-schemas' */
    targetName?: string;
}
/** Plugin entrypoint */
export declare const createNodesV2: CreateNodesV2<ZodToJsonSchemaPluginOptions>;
