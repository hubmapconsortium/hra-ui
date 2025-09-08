import { DigitalObjectInfo } from '@hra-api/ng-client';

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

/** Filter category info */
export const FILTER_CATEGORY_INFO: Record<string, FilterOptionCategory> = {
  digitalObjects: {
    label: 'Digital objects',
    tooltip: {
      description: 'Categories of unique data structures that construct the evolving Human Reference Atlas.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/overview-data',
    },
  },
  releaseVersions: {
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
    label: '3D Organs',
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
    label: 'Cell Type Annotations',
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
    label: 'Millitome',
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
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/vccf',
    },
    icon: 'vascular-geometry',
    documentationUrl: 'https://humanatlas.io/vccf',
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
export const ORGAN_ICON_MAP: Record<string, string> = {
  'http://purl.obolibrary.org/obo/UBERON_0004537': 'vasculature-thick', //blood vasculature
  'http://purl.obolibrary.org/obo/UBERON_0000955': 'brain',
  'http://purl.obolibrary.org/obo/UBERON_0002182': 'extrapulmonary-bronchus',
  'http://purl.obolibrary.org/obo/UBERON_0000970': 'eye',
  'http://purl.obolibrary.org/obo/UBERON_0003889': 'fallopian-tube-left', //fallopian tube
  'http://purl.obolibrary.org/obo/UBERON_0000948': 'heart',
  'http://purl.obolibrary.org/obo/UBERON_0002113': 'kidneys', //kidney
  'http://purl.obolibrary.org/obo/UBERON_0001465': 'knee',
  'http://purl.obolibrary.org/obo/UBERON_0000059': 'large-intestine',
  'http://purl.obolibrary.org/obo/UBERON_0002107': 'liver',
  'http://purl.obolibrary.org/obo/UBERON_0002048': 'lungs', //lung
  'http://purl.obolibrary.org/obo/UBERON_0000029': 'lymph-nodes', //lymph node
  'http://purl.obolibrary.org/obo/UBERON_0004536': 'lymph-nodes', //lymph vasculature
  'http://purl.obolibrary.org/obo/UBERON_0000165': 'mouth',
  'http://purl.obolibrary.org/obo/UBERON_0000992': 'ovaries', //ovary
  'http://purl.obolibrary.org/obo/UBERON_0001264': 'pancreas',
  'http://purl.obolibrary.org/obo/UBERON_0001270': 'pelvis',
  'http://purl.obolibrary.org/obo/UBERON_0001987': 'placenta',
  'http://purl.obolibrary.org/obo/UBERON_0002367': 'prostate', //prostate gland
  'http://purl.obolibrary.org/obo/UBERON_0004288': 'sternum', //skeleton
  'http://purl.obolibrary.org/obo/UBERON_0002097': 'skin',
  'http://purl.obolibrary.org/obo/UBERON_0002108': 'small-intestine',
  'http://purl.obolibrary.org/obo/UBERON_0002240': 'spinal-cord',
  'http://purl.obolibrary.org/obo/UBERON_0002106': 'spleen',
  'http://purl.obolibrary.org/obo/UBERON_0002370': 'thymus', //thoracic thymus
  'http://purl.obolibrary.org/obo/UBERON_0003126': 'trachea',
  'http://purl.obolibrary.org/obo/UBERON_0000056': 'ureter-right', //ureter
  'http://purl.obolibrary.org/obo/UBERON_0001255': 'bladder', //urinary bladder
  'http://purl.obolibrary.org/obo/UBERON_0000995': 'uterus',
};

/** HRA version data info */
export const HRA_VERSION_DATA: Record<string, { label: string; date: string }> = {
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
 * Gets organ id from a digital object. If more than one organ is listed return blank string
 * @param item Digital object data item
 * @returns Organ id
 */
export function getOrganId(item?: DigitalObjectInfo): string {
  // console.log(item)
  return item?.organIds && item.organIds.length === 1 ? item.organIds[0] : '';
}

/**
 * Returns formatted organ name from digital object, if id is not in ORGAN_ICON_MAP use the All Organs icon
 * @param organ Organ UBERON id
 * @returns Organ name in design system format
 */
export function getOrganIcon(item?: DigitalObjectInfo): string {
  return `organ:${ORGAN_ICON_MAP[getOrganId(item)] ?? 'all-organs'}`;
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
