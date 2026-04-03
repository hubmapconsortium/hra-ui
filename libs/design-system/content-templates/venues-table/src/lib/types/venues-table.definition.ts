import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { VenuesTableComponent } from '../venues-table.component';
import { VenuesTableSchema } from './venues-table.schema';

/** Content template definition for VenuesTableComponent */
export const VenuesTableDef: ContentTemplateDef<VenuesTableComponent> = {
  component: VenuesTableComponent,
  spec: VenuesTableSchema,
};
