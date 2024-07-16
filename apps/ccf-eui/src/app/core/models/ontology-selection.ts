import { OntologyTreeNode } from '@hra-api/ng-client';

export interface OntologySelection {
  location: OntologyTreeNode | undefined;
  id: string;
  label: string;
}
