import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';
import { PageSectionComponent } from './page-section.component';
import { PageSectionSchema } from './types/page-section.schema';

/** PageSection content template definition */
export const PageSectionDef: AnyContentTemplateDef = {
  component: PageSectionComponent,
  spec: PageSectionSchema,
  projectedProperties: {
    '*': 'content',
  },
};
