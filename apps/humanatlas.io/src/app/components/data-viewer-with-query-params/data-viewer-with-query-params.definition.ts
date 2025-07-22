import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { DataViewerWithQueryParamsComponent } from './data-viewer-with-query-params.component';
import { DataViewerWithQueryParamsSchema } from './data-viewer-with-query-params.schema';

/** Definition for Data Viewer with Query Params Component */
export const DataViewerWithQueryParamsDef: ContentTemplateDef<DataViewerWithQueryParamsComponent> = {
  component: DataViewerWithQueryParamsComponent,
  spec: DataViewerWithQueryParamsSchema,
};
