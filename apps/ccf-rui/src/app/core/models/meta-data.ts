/** Interface for a metadata field */
export interface MetaDataField {
  /** Name of field */
  label: string;
  /** Value of field */
  value?: string;
}

/** Export metadata type as array of metadata field objects */
export type MetaData = MetaDataField[];
