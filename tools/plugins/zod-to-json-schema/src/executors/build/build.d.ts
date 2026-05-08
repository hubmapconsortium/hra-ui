import { PromiseExecutor } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
/**
 * Nx executor that converts Zod schema TypeScript files to JSON schema files.
 * @param options - Executor options
 * @param context - Nx execution context containing project and workspace information
 * @returns Promise resolving to success status
 */
declare const runExecutor: PromiseExecutor<BuildExecutorSchema>;
export default runExecutor;
