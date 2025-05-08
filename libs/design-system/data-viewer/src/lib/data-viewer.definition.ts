import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { DataViewerComponent } from './data-viewer.component';
import { DataViewerSchema } from './types/data-viewer.schema';

/** Content template definition for DataViewerComponent */
export const DataViewerDef: ContentTemplateDef<DataViewerComponent> = {
  component: DataViewerComponent,
  spec: DataViewerSchema,
};
