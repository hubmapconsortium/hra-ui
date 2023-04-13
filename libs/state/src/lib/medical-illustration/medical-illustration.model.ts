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

export type MapEntry = z.infer<typeof mapEntry>;

/** Interface for medical illustration model */
export interface MedicalIllustrationModel {
  /** Illustration URL */
  url?: string;
  /** Current selected node */
  node?: MapEntry;
  /** Mapping info */
  mapping?: MapEntry[];
}
