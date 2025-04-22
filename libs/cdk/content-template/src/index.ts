export { ContentTemplateModule } from './lib/content-template.module';
export { ContentTemplateOutletDirective } from './lib/directives/content-template.directive';
export {
  CONTENT_TEMPLATE_DEFS,
  ContentTemplateDefRegistryService,
  provideContentTemplateDefs,
} from './lib/services/def-registry.service';
export { ContentTemplateSpecRegistryService } from './lib/services/spec-registry.service';
export { AnyContentTemplateDef, ContentTemplateDef } from './lib/types/content-template-def';
export {
  AnyContentTemplate,
  AnyContentTemplateSchema,
  AnyContentTemplateSpec,
  Classes,
  ClassesSchema,
  ContentTemplateSchema,
  Styles,
  StylesSchema,
} from './lib/types/content-template.schema';
