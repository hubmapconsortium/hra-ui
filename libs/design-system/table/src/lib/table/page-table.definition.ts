import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { TableComponent } from '../../../../table/src/lib/table/table.component';
import { PageTableSchema } from '../types/page-table.schema';

/** Content template definition for TableComponent */
export const PageTableDef: ContentTemplateDef<TableComponent> = {
  component: TableComponent,
  spec: PageTableSchema,
};
