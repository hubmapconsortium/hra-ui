import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { VersionedDataTableComponent } from '../versioned-data-table.component';
import { VersionedDataTableSchema } from './versioned-data-table.schema';

/** Content template definition for VersionedTableDataComponent */
export const VersionedDataTableDef: ContentTemplateDef<VersionedDataTableComponent> = {
  component: VersionedDataTableComponent,
  spec: VersionedDataTableSchema,
};
