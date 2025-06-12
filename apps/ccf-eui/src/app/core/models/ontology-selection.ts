import { OntologyTreeNode } from '@hra-api/ng-client';

/** Ontology selection */
export interface OntologySelection {
  /** Node */
  location: OntologyTreeNode | undefined;
  /** Id */
  id: string;
  /** Label */
  label: string;
}
