import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { DataViewerComponent } from './data-viewer.component';
import { DataViewerSchema } from './types/data-viewer.schema';

export const DataViewerDef: ContentTemplateDef<DataViewerComponent> = {
  component: DataViewerComponent,
  spec: DataViewerSchema,
};
