import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';
import { PageSectionComponent } from './lib/page-section.component';
import { PageSectionSchema } from './lib/types/page-section.schema';

export { PageSectionComponent } from './lib/page-section.component';
export { providePageSectionNavigation } from './lib/providers';
export {
  PageSectionActivationOptions,
  PageSectionActivationService,
} from './lib/services/page-section-activation.service';
export { PageSection, PageSectionService } from './lib/services/page-section.service';
export { PageSectionSchema } from './lib/types/page-section.schema';

export const PageSectionDef: AnyContentTemplateDef = {
  component: PageSectionComponent,
  spec: PageSectionSchema,
};
