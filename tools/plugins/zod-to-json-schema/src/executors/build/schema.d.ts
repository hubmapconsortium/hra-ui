export interface BuildExecutorSchema {
  /** Glob pattern to match schema files */
  pattern?: string;
  /** Output file extension */
  outputExtension?: string;
  /** Path to JSON Schema specification */
  schemaRefPath?: string;
}
