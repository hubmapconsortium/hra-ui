import { z } from 'zod';

/** Map Entry typings */
const mapEntry = z.object({
  organ_label: z.string(),
  organ_id: z.string(),
  anatomical_structure_of: z.string(),
  source_spatial_entity: z.string(),
  node_name: z.string(),
  label: z.string(),
  OntologyID: z.string(),
  representation_of: z.string(),
  'svg file of single 2DFTU': z.string(),
  exist_asctb: z.string(),
  type: z.string(),
  'REF/1': z.string(),
  'REF/1/DOI': z.string(),
  'REF/1/NOTES': z.string(),
  'Inset #': z.string(),
});

/** Reference organ type */
const referenceOrgan = z.object({
  representation_of: z.string(),
  object: z.object({
    file: z.string(),
  }),
});

export type MapEntry = z.infer<typeof mapEntry>;

export type ReferenceOrgan = z.infer<typeof referenceOrgan>;

/** Interface for medical illustration model */
export interface MedicalIllustrationModel {
  /** Illustration URL */
  url?: string;
  /** Current selected node */
  node?: MapEntry;
  /** Mapping info */
  mapping?: MapEntry[];
  /** reference organs */
  referenceOrgans?: ReferenceOrgan[];
}
