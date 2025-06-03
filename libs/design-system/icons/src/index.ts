export { IconComponent } from './lib/icon/icon.component';
export { IconsModule } from './lib/icons.module';
export {
  FontIconClassesFeature,
  IconFeature,
  IconFeatureKind,
  IconFeatures,
  provideIcons,
  SvgIconDirectoryFeature,
  withFontIconClasses,
  withSvgIconDirectory,
} from './lib/providers';
export { IconConfig, IconConfigRegistryService, IconConfigResolver } from './lib/services/icon-config.service';
export { IconDef } from './lib/types/icon.definition';
export { Icon, IconData, IconDataSchema, IconList, IconListSchema, IconSchema } from './lib/types/icon.schema';
export { coerceIconList } from './lib/utils/coercion';
