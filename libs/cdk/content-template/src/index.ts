export { ContentTemplateOutletDirective } from './lib/directives/content-template.directive';
export {
  ContentTemplateController,
  ContentTemplateControllerConstructor,
  ContentTemplateControllerRegistryService,
  provideContentTemplateControllers,
} from './lib/services/controller-registry.service';
export { ContentTemplateDefRegistryService, provideContentTemplateDefs } from './lib/services/def-registry.service';
export { AnyContentTemplateDef, ContentTemplateDef } from './lib/types/content-template-def';
export {
  AnyContentTemplate,
  AnyContentTemplateSchema,
  AnyContentTemplateSpec,
  Classes,
  ClassesSchema,
  ContentTemplateSchema,
  Controller,
  ControllerSchema,
  ProjectedContentTemplate,
  ProjectedContentTemplateSchema,
  setContentTemplateSpecs,
  Styles,
  StylesSchema,
} from './lib/types/content-template.schema';
