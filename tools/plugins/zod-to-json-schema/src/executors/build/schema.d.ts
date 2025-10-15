import { toJSONSchema } from 'zod';

// Not exported by zod...
type ToJSONSchemaParams = Pick<
  NonNullable<Parameters<typeof toJSONSchema>[1]>,
  'target' | 'unrepresentable' | 'cycles' | 'reused'
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface BuildExecutorSchema extends ToJSONSchemaParams {}
