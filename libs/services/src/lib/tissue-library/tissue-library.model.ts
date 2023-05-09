import { z } from 'zod';
import { IRI } from '../shared/common.model';

export const TISSUE = z.object({
  id: IRI,
  label: z.string(),
  parent: IRI,
  children: IRI.array().default([]),
});

export const TISSUE_LIBRARY = z.object({
  root: IRI,
  nodes: z.record(IRI, TISSUE),
});

export type Tissue = z.infer<typeof TISSUE>;

export type TissueLibrary = z.infer<typeof TISSUE_LIBRARY>;
