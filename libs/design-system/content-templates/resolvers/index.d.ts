import { ResolveFn } from '@angular/router';
import { z } from 'zod';

/**
 * Creates a resolver function that loads and validates json data
 *
 * @param url Json url path
 * @param spec Zod schema to validate the spec
 * @returns A resolver function
 */
declare function createJsonSpecResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>>;
/**
 * Creates a resolver function that loads and validates yaml data
 *
 * @param file Yaml url path
 * @param spec Zod schema to validate the spec
 * @returns A resolver function
 */
declare function createYamlSpecResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>>;

export { createJsonSpecResolver, createYamlSpecResolver };
