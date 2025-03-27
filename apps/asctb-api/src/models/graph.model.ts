import { Reference } from './api.model';

/** Node types */
export enum Node_type {
  AS = 'AS',
  CT = 'CT',
  BM = 'BM',
  R = 'root',
}

/** Edge types */
export enum Edge_type {
  AS_AS = 'ASAS',
  AS_CT = 'ASCT',
  CT_CT = 'CTCT',
  CT_G = 'CTgene',
  CT_P = 'CTprotein',
  CT_BL = 'CTlipids',
  CT_BM = 'CTmetabolites',
  CT_BF = 'CTproteoforms',
  AS_G = 'ASgene', // Not supported, but shows up in the data
  AS_P = 'ASprotein', // Not supported, but shows up in the data
}

/** Graph node */
export class GNode {
  /** Node id */
  id: number;
  /** Parent id */
  parent: number;
  /** Node type */
  type: string;
  /** Node name */
  name: string;
  /** Node comparator */
  comparator: string;
  /** Comparator name */
  comparatorName: string;
  /** Comparator id */
  comparatorId: string;
  /** Node metadata */
  metadata: Metadata;

  /** Initialize the node */
  constructor(
    id: number,
    name: string,
    parent: number,
    ontologyId: string,
    label: string,
    type: string,
    references: Reference[],
    bType?: string,
  ) {
    this.id = id;
    this.parent = parent;
    this.type = type;
    this.comparator = '';
    this.comparatorId = '';
    this.comparatorName = '';
    this.name = name;
    this.metadata = new Metadata(name, ontologyId, label, references, bType);
  }
}

/** Node metadata */
export class Metadata {
  /** Ontology type id */
  ontologyTypeId: string;
  /** Ontology type name */
  ontologyType: string;
  /** Label */
  label: string;
  /** Name */
  name: string;
  /** Ontology id */
  ontologyId: string;
  /** Biomarker type */
  bmType?: string;
  /** References */
  references: Reference[];

  /** Initialize the metadata */
  constructor(name: string, ontologyId: string, label: string, references: Reference[], bmType?: string) {
    this.name = name;
    this.ontologyId = ontologyId;
    if (ontologyId.toLowerCase().startsWith('fma')) {
      ontologyId = ontologyId.substring(3);
      if (ontologyId.includes(':')) {
        ontologyId = ontologyId.split(':')[1];
      }
      ontologyId = 'FMA:' + ontologyId;
    } else if (ontologyId.toLowerCase().startsWith('uberon')) {
      ontologyId = ontologyId.substring('uberon'.length);
      if (ontologyId.includes(':')) {
        ontologyId = ontologyId.split(':')[1];
      }
      ontologyId = 'UBERON:' + ontologyId;
    }
    [this.ontologyType, this.ontologyTypeId] = ontologyId.split(':');
    this.name = name;
    this.label = label;
    this.bmType = bmType;
    this.references = references;
  }
}

/** Graph edge */
export interface GEdge {
  /** Source node id */
  source: number;
  /** Target node id */
  target: number;
}

/** A graph */
export interface GraphData {
  /** Nodes */
  nodes: GNode[];
  /** Edges */
  edges: GEdge[];
}
