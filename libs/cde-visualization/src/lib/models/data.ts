// TODO: Rename to prevent name conflict with global Node type
export interface NodeEntry {
  x: number;
  y: number;
  z?: number;
  cell_type: string;
  cell_ontology_id?: string;
}

export interface EdgeEntry {
  sourceNodeIndex: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
}
