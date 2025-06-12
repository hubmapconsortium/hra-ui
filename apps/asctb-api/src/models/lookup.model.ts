/** Response data for a lookup */
export interface LookupResponse {
  /** Label */
  label: string;
  /** Description */
  description: string;
  /** Link */
  link: string;
  /** Additional information */
  additionalInfo?: string;
  /** Extra links mapping */
  extraLinks?: Record<string, string>;
}

/** Ontology codes */
export enum OntologyCode {
  UBERON = 'UBERON',
  CL = 'CL',
  FMA = 'FMA',
  HGNC = 'HGNC',
  LMHA = 'LMHA',
}
