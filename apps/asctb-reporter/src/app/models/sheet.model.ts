enum BM_TYPE {
  G = 'gene',
  P = 'protein',
  BL = 'lipids',
  BM = 'metabolites',
  BF = 'proteoforms',
}

export enum PROTEIN_PRESENCE {
  POS = 'Positive',
  NEG = 'Negative',
  UNKNOWN = 'Unknown',
  INTERMEDIATE = 'Intermediate',
}

export interface Reference {
  id?: string;
  doi?: string;
  notes?: string;
}

export interface OrganTableSelect {
  organs?: string[];
  omapOrgans?: string[];
  isIntilalSelect: boolean;
  getFromCache: boolean;
}

export interface OrganTableOnClose {
  organs: boolean;
  cache: boolean;
}

export interface Structure {
  name?: string;
  id?: string;
  rdfs_label?: string;
  b_type?: BM_TYPE;
  isNew?: boolean;
  color?: string;
  organName?: string;
  notes?: string;
  proteinPresence?: PROTEIN_PRESENCE;
}

export interface Row {
  anatomical_structures: Structure[];
  cell_types: Structure[];
  biomarkers: Structure[];
  biomarkers_gene: Structure[];
  biomarkers_protein: Structure[];
  biomarkers_lipids: Structure[];
  biomarkers_meta: Structure[];
  biomarkers_prot: Structure[];
  references: Reference[];
  organName: string;
  tableVersion: string;
}

export interface ResponseData {
  csv: string;
  data: Row[];
  parsed: [];
  isOmap?: boolean;
}

export interface Sheet {
  name: string;
  sheetId?: string;
  gid?: string;
  display: string;
  config: SheetConfig;
  title: string;
  data?: string;
  csvUrl?: string;
  formData?: FormData;
}

export interface CompareData {
  link: string;
  title: string;
  description: string;
  color: string;
  sheetId: string;
  gid: string;
  csvUrl?: string;
  formData?: FormData;
  fileName?: string;
  isOmap?: boolean;
}

export interface SheetConfig {
  bimodal_distance_y: number;
  bimodal_distance_x: number;
  width: number;
  height: number;
  show_ontology?: boolean;
  show_all_AS?: boolean;
  discrepencyLabel?: boolean;
  discrepencyId?: boolean;
  duplicateId?: boolean;
}

export interface SheetInfo {
  name: string;
  ontologyId: string;
  ontologyCode: string;
  iri: string;
  label: string;
  desc: string;
  hasError: boolean;
  msg: string;
  status: number;
  notes: string;
  references?: Reference[];
  extraLinks?: Record<string, string>;
}

export interface DOI {
  doi: string;
  id: string;
  notes: string;
}

export interface VersionDetail {
  value: string;
  viewValue: string;
  hraVersion?: string;
  link?: string;
  csvUrl?: string;
  sheetId?: string;
  gid?: string;
  xlsx?: string;
  as?: number;
  ct?: number;
  bp?: number;
}

export interface SheetDetails {
  name: string;
  omapId?: string;
  tissuePreservationMethod?: string;
  imagingMethod?: string;
  display: string;
  body?: string;
  sheetId?: string;
  gid?: string;
  config: {
    bimodal_distance_x: number;
    bimodal_distance_y: number;
    width: number;
    height: number;
  };
  title: string;
  version?: VersionDetail[];
  data?: string;
  csvUrl?: string;
  symbol?: string;
  position?: number;
  representation_of?: string[];
  uberon_id?: string;
}

export interface SheetOptions {
  title: string;
  sheet: string;
  version?: {
    value: string;
    viewValue: string;
    hraVersion?: string;
  }[];
  symbol?: string;
}

export interface PlaygroundSheetOptions {
  title: string;
  sheet: string;
}

export interface ConfigurationOptions {
  headerCount: string;
  imgOptions: string[];
  masterSheetLink: string;
  sheetId: string;
  version1Url: string;
  playgroundSheetOptions: PlaygroundSheetOptions[];
  version: Version[];
  moreOptions: MoreOption[];
}

export interface MoreOption {
  name: string;
  url: string;
  type: string;
}

export interface Version {
  display: string;
  folder: string;
}

export interface GEdge {
  source: number;
  target: number;
}

export interface GNode {
  id: number;
  type: string;
  name: string;
  metadata: Metadata;
}

export interface Metadata {
  ontologyTypeId: string;
  ontologyType: string;
  label: string;
  name: string;
  ontologyId: string;
  bmType?: string;
  references: Reference[];
}

export interface Graph {
  nodes: GNode[];
  edges: GEdge[];
}

export interface GraphData {
  data: Graph;
}

export interface CompareReport {
  identicalAS: string[];
  newAS: string[];
  identicalCT: string[];
  newCT: string[];
  identicalB: string[];
  newB: string[];
  color: string;
  title: string;
  description: string;
  identicalBMCTPair: Row[];
}

export interface CompareReportData {
  data: CompareReport[];
}

export interface UploadForm {
  link: string;
  csvUrl?: string;
  formData?: FormData;
  fileName?: string;
  sheetId: string;
  gid: string;
}

export interface SelectedOrganBeforeFilter {
  selector?: string;
  organName?: string;
  filteredOut?: boolean;
  version?: string;
}
