import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { OmicsFeaturedStudyCardComponent } from './omics-featured-study-card.component';
import { OmicsFeaturedStudyCardSchema } from './omics-featured-study-card.schema';

/** Content template definition for omics featured study card */
export const OmicsFeaturedStudyCardDef: ContentTemplateDef<OmicsFeaturedStudyCardComponent> = {
  component: OmicsFeaturedStudyCardComponent,
  spec: OmicsFeaturedStudyCardSchema,
  projectedProperties: {
    '*': 'content',
  },
};
