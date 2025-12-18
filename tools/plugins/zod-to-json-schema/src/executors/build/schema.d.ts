import { type toJSONSchema } from 'zod';

/** Zod's `toJSONSchema` options */
type JSONSchemaOptions = NonNullable<Parameters<typeof toJSONSchema>[1]>;

/** Options for the zod-to-json-schema build executor */
export interface BuildExecutorSchema {
  /** Json schema target version */
  target?: JSONSchemaOptions['target'];
  /** How to handle cycles within a schema */
  cycles?: JSONSchemaOptions['cycles'];
  /** How to handle reused subschemas */
  reused?: JSONSchemaOptions['reused'];
  /** How to handle types that are not representable in json schema */
  unrepresentable?: JSONSchemaOptions['unrepresentable'];
}
