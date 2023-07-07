import { z } from 'zod';
import { IRI } from '../shared/common.model';

/**
 * zod Schema Object for a Tissue
 */
export const TISSUE = z.object({
  id: IRI,
  label: z.string(),
  parent: IRI,
  children: IRI.array().default([]),
});

/**
 * zod Schema Object for a Tissue Library
 */
export const TISSUE_LIBRARY = z.object({
  root: IRI,
  nodes: z.record(IRI, TISSUE),
});

/**
 * Type for Tissue
 */
export type Tissue = z.infer<typeof TISSUE>;

/**
 * Type for Tissue
 */
export type TissueLibrary = z.infer<typeof TISSUE_LIBRARY>;
