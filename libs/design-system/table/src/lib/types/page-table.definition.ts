import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { TableComponent } from '../table/table.component';
import { PageTableSchema } from './page-table.schema';

/** Content template definition for TableComponent */
export const PageTableDef: ContentTemplateDef<TableComponent> = {
  component: TableComponent,
  spec: PageTableSchema,
};
