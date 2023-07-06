import { writeFileSync } from 'fs';
import { PageSpec } from '../utils/data-schema.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * This function converts the Providers Zod Schema and creates a JSON schema file.
 * This json file will be used to validate the registration.yaml file.
 * @param { string } jsonSchemaPath - The path to file where JSON schema will be stored with .json extension.
 */
export function saveJsonSchema(jsonSchemaPath) {
  const jsonSchema = zodToJsonSchema(PageSpec, 'mySchema');
  writeFileSync(jsonSchemaPath, JSON.stringify(jsonSchema, null, 2));
}