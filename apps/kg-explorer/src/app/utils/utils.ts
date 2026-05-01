import { DigitalObjectInfo } from '../digital-objects-metadata.schema';
import asctbIconMapJson from './asctb-icon-map.json';
import organIconMapJson from './organ-icon-map.json';
import iconTooltipMapJson from './icon-tooltip-map.json';

/** Tooltip data interface */
export interface TooltipData {
  /** Tooltip description */
  description: string;
  /** Text on action button */
  actionText?: string;
  /** Url on action button */
  actionUrl?: string;
}

/** Interface for digital object type data */
export interface ObjectTypeData {
  /** Object type label */
  label: string;
  /** Design system icon to use for the object type */
  icon: string;
  /** Tooltip data for the digital object type */
  tooltip: TooltipData;
  /** Documentation url, if available for the object type */
  documentationUrl?: string;
}

/** Filter option category interface */
export interface FilterOptionCategory {
  /** Category label */
  label: string;
  /** Filter options for the category */
  options?: FilterOption[];
  /** Tooltip data */
  tooltip?: TooltipData;
}

/** Filter option interface */
export interface FilterOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
  /** Secondary label (for release version options) */
  secondaryLabel?: string;
  /** Number of results for the filter option in the data */
  count: number;
  /** Tooltip data for the filter option (for digital objects category) */
  tooltip?: TooltipData;
}

export interface FilterOptions {
  /** Digital object filters */
  digitalObjects: FilterOption[];
  /** Release version filters */
  releaseVersion: FilterOption[];
  /** Organ filters */
  organs: FilterOption[];
  /** Anatomical structures filters */
  anatomicalStructures: FilterOption[];
  /** Cell type filters */
  cellTypes: FilterOption[];
  /** Biomarker filters */
  biomarkers: FilterOption[];
}

/** Filter types for the filter form */
export type FilterType = keyof FilterOptions;

/** Filter category info */
export const FILTER_CATEGORY_INFO: Record<FilterType, FilterOptionCategory> = {
  digitalObjects: {
    label: 'Digital objects',
    tooltip: {
      description: 'Categories of unique data structures that construct the evolving Human Reference Atlas.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/overview-data',
    },
  },
  releaseVersion: {
    label: 'HRA release version',
    tooltip: {
      description: 'New and updated data is released twice a year on June 15 and December 15.',
    },
  },
  organs: {
    label: 'Organs',
    tooltip: {
      description:
        'Organs are distinct body structures made of specialized cells and tissues that work together to perform specific biological functions.',
    },
  },
  anatomicalStructures: {
    label: 'Anatomical structures',
    tooltip: {
      description:
        'A distinct biological entity with a 3D volume and shape, e.g., an organ, functional tissue unit, or cell.',
    },
  },
  cellTypes: {
    label: 'Cell types',
    tooltip: {
      description:
        'Mammalian cells are biological units with a defined function that typically have a nucleus and cytoplasm surrounded by a membrane. Each cell type may have broad common functions across organs and specialized functions or morphological or molecular features within each organ or region. Tissue is composed of different (resident and transitory) cell types that are characterized or identified via biomarkers.',
    },
  },
  biomarkers: {
    label: 'Biomarkers',
    tooltip: {
      description:
        'Molecular, histological, morphological, radiological, physiological or anatomical features that help to characterize the biological state of the body. Here we focus on the molecular markers that can be measured to characterize a cell type. They include genes (BG), proteins (BP), metabolites (BM), proteoforms (BF), and lipids (BL).',
    },
  },
};

/** Stores data for a doType */
export const DO_INFO: Record<string, ObjectTypeData> = {
  'ref-organ': {
    label: '3D Reference Objects',
    tooltip: {
      description:
        '3D models of human organ structures, complete with accurate size and position data, to support the creation of a comprehensive 3D model of the human body, with each 3D model object carefully annotated with a proper label and an identifier from the Uberon and FMA ontologies.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/3d-reference-library',
    },
    icon: '3d-organ',
    documentationUrl: 'https://humanatlas.io/3d-reference-library',
  },
  'asct-b': {
    label: 'ASCT+B Tables',
    tooltip: {
      description:
        'Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Tables are authored by multiple experts across many consortia. Tables capture the partonomy of anatomical structures, cell types, and major biomarkers (e.g., gene, protein, lipid, or metabolic markers). Cellular identity is supported by scientific evidence and linked to ontologies.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/asctb-tables',
    },
    icon: 'asctb-reporter',
    documentationUrl: 'https://humanatlas.io/asctb-tables',
  },
  ctann: {
    label: 'Cell Type Annotation Crosswalks',
    tooltip: {
      description:
        'Azimuth and other cell type annotation tools are used to assign cell types to cells from sc/snRNA-seq studies. Manually compiled crosswalks are used to assign ontology IDs to cell types.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/cell-type-annotations',
    },
    icon: 'cell-type-annotations',
    documentationUrl: 'https://humanatlas.io/cell-type-annotations',
  },
  collection: {
    label: 'Collections',
    tooltip: {
      description: 'Multiple digital objects that create a collection of data.',
    },
    icon: 'collections',
  },
  'ds-graph': {
    label: 'Dataset Graphs',
    tooltip: {
      description:
        "Sample registration information submitted by consortium members in HuBMAP or other efforts, including accurate sample sizes and positions. When combined with 3D Organ data, this information helps create 3D visual tissue sample placements. Additionally, the sample information is linked to datasets from researchers' assay analyses that offer deeper insights into the tissue samples.",
    },
    icon: 'dataset-graphs',
  },
  '2d-ftu': {
    label: 'Functional Tissue Unit Illustrations',
    tooltip: {
      description:
        'A functional tissue unit is the smallest tissue organization, i.e. a set of cells, that performs a unique physiologic function and is replicated multiple times in a whole organ. Functional Tissue Unit (FTU) Illustrations are linked to ASCT+B Tables.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/2d-ftu-illustrations',
    },
    icon: 'ftu',
    documentationUrl: 'https://humanatlas.io/2d-ftu-illustrations',
  },
  '3d-ftu': {
    label: '3D Functional Tissue Unit Illustrations',
    tooltip: {
      description:
        'A functional tissue unit is the smallest tissue organization, i.e. a set of cells, that performs a unique physiologic function and is replicated multiple times in a whole organ. Functional Tissue Unit (FTU) Illustrations are linked to ASCT+B Tables.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/2d-ftu-illustrations',
    },
    icon: '3d-ftu',
    documentationUrl: 'https://humanatlas.io/2d-ftu-illustrations',
  },
  graph: {
    label: 'Graphs',
    tooltip: {
      description: 'Externally created RDF graph data.',
    },
    icon: 'graphs',
  },
  landmark: {
    label: 'Landmarks',
    tooltip: {
      description:
        '3D model shapes representing features near organs of interest (e.g., an artery or pelvis bone near a kidney) to help experts accurately orient themselves when registering tissue blocks into a 3D Organ.',
    },
    icon: 'landmark',
  },
  millitome: {
    label: 'Millitomes',
    tooltip: {
      description:
        'Data for cutting tissue samples using a millitome device. A digital data package that includes an STL file and a spreadsheet for assigning spatial locations to HuBMAP IDs and gathering metadata with information about the size, dimensions, donor sex, and laterality of the reference organ for which the millitome is fitted.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/millitome',
    },
    icon: 'millitome',
    documentationUrl: 'https://humanatlas.io/millitome',
  },
  omap: {
    label: 'Organ Mapping Antibody Panels',
    tooltip: {
      description: 'Collections of antibodies spatially mapping anatomical structures and cell types.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/omap',
    },
    icon: 'omaps',
    documentationUrl: 'https://humanatlas.io/omap',
  },
  schema: {
    label: 'Schema',
    tooltip: {
      description:
        'Describes the structure, i.e., the schema, of the normalized form of a single data type, its metadata, or shared concepts between data types.',
    },
    icon: 'schema',
  },
  'vascular-geometry': {
    label: 'Vascular Geometry',
    tooltip: {
      description:
        'Geometry information on the human blood vascular system capturing key attributes of different vessels, such as diameter and length, population, sample size, and reference to the source of data.',
    },
    icon: 'vascular-geometry',
  },
  vocab: {
    label: 'Vocabulary',
    tooltip: {
      description:
        'Various reference ontologies and vocabularies that hold standard concepts and relationships used to construct data components. Vocabularies are typically external biomedical ontologies, like CL and Uberon, and they provide a convenient mechanism for querying reference ontologies alongside HRA-curated data.',
    },
    icon: 'vocabulary',
  },
};

/** Maps UBERON id to the correct icon in the design system */
export const ORGAN_ICON_MAP: Record<string, string> = organIconMapJson;

/** Maps ASCT+B purls to the correct organ icons in the design system */
export const ASCTB_ICON_MAP: Record<string, string> = asctbIconMapJson;

/** If the icon tooltip is different from the icon name, this map provides the correct tooltip */
export const ICON_TOOLTIP_MAP: Record<string, string> = iconTooltipMapJson;

/** HRA version data info */
export const HRA_VERSION_DATA: Record<string, { label: string; date: string }> = {
  'v2.5': {
    label: '11th Release (v2.5)',
    date: 'June 2025',
  },
  'v2.4': {
    label: '10th Release (v2.4)',
    date: 'December 2025',
  },
  'v2.3': {
    label: '9th Release (v2.3)',
    date: 'June 2025',
  },
  'v2.2': {
    label: '8th Release (v2.2)',
    date: 'December 2024',
  },
  'v2.1': {
    label: '7th Release (v2.1)',
    date: 'June 2024',
  },
  'v2.0': {
    label: '6th Release (v2.0)',
    date: 'December 2023',
  },
  'v1.4': {
    label: '5th Release (v1.4)',
    date: 'June 2023',
  },
  'v1.3': {
    label: '4th Release (v1.3)',
    date: 'December 2022',
  },
  'v1.2': {
    label: '3rd Release (v1.2)',
    date: 'June 2022',
  },
  'v1.1': {
    label: '2rd Release (v1.1)',
    date: 'December 2021',
  },
  'v1.0': {
    label: '1st Release (v1.0)',
    date: 'June 2021',
  },
};

/**
 * Gets organ id from a digital object. If more than one organ is listed return the first one, if no organs are listed return undefined
 * @param item Digital object data item
 * @returns Organ id
 */
export function getOrganId(item?: DigitalObjectInfo): string | undefined {
  const ids = coerceArray(item?.organIds);
  return ids.length > 0 ? ids[0] : undefined;
}

/**
 * Returns formatted organ name from digital object, if id is not in ORGAN_ICON_MAP use the All Organs icon
 * @param organ Organ UBERON id
 * @returns Organ name in design system format
 */
export function getOrganIcon(item?: DigitalObjectInfo): string {
  if (item?.doType === 'asct-b') {
    const purl = item?.purl;
    if (purl && ASCTB_ICON_MAP[purl]) {
      return `organ:${ASCTB_ICON_MAP[purl]}`;
    }
  }
  if (getOrganId(item)) {
    return `organ:${ORGAN_ICON_MAP[getOrganId(item) as string] ?? 'all-organs'}`;
  }
  return 'organ:all-organs';
}

export function getOrganTooltip(item: DigitalObjectInfo): string {
  let organLabel = 'All organs';
  const organId = getOrganId(item);
  if (organId && ORGAN_ICON_MAP[organId]) {
    organLabel = ORGAN_ICON_MAP[organId];
  }
  if (item.doType === 'asct-b') {
    const purl = item.purl;
    if (ASCTB_ICON_MAP[purl]) {
      organLabel = ASCTB_ICON_MAP[purl];
    }
  }
  if (ICON_TOOLTIP_MAP[organLabel as string]) {
    organLabel = ICON_TOOLTIP_MAP[organLabel as string];
  }
  return sentenceCase(organLabel).replace(/-/g, ' ');
}

/**
 * Gets product icon from digital object type
 * @param doType Digital object type
 * @returns Product icon string
 */
export function getProductIcon(doType: string): string {
  return `product:${DO_INFO[doType]?.icon}`;
}

/**
 * Gets product label from digital object type
 * @param doType Digital object type
 * @returns Product label string
 */
export function getProductLabel(doType: string): string {
  return DO_INFO[doType]?.label || '';
}

/**
 * Gets product tooltip from digital object type
 * @param doType Digital object type
 * @returns Product tooltip data object
 */
export function getProductTooltip(doType: string): TooltipData {
  return DO_INFO[doType]?.tooltip || '';
}

/**
 * Gets product documentation url from digital object type
 * @param doType Digital object type
 * @returns Documentation url
 */
export function getDocumentationUrl(doType: string): string {
  return DO_INFO[doType]?.documentationUrl || '';
}

/**
 * Converts a string to sentence case
 * @param value String to convert
 * @returns String in sentence case
 */
export function sentenceCase(value: string): string {
  const processedValue = value.trim().toLowerCase();
  return processedValue.charAt(0).toUpperCase() + processedValue.slice(1);
}

export function coerceArray(value: string | string[] | undefined): string[] {
  switch (typeof value) {
    case 'undefined':
      return [];
    case 'string':
      return [value];
    default:
      return value;
  }
}

/**
 * Formats Date to yyyy-mm
 * @param dateString Date string
 * @returns Date as yyyy-mm
 */
export function formatDateToYYYYMM(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}
