import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { DataSelectorComponent } from '../data-selector.component';
import { DataSelectorSchema } from './data-selector.schema';

/** Content template definition for DataSelectorComponent */
export const DataSelectorDef: ContentTemplateDef<DataSelectorComponent> = {
  component: DataSelectorComponent,
  spec: DataSelectorSchema,
};
