import { EnvironmentProviders, makeEnvironmentProviders, provideEnvironmentInitializer, Provider } from '@angular/core';
import { initializeIcons } from './utils/initialize';
import { FONT_ICONS_CLASSES, SVG_ICON_DIRECTORY } from './utils/tokens';

/**
 * Enum of all icon feature kinds
 */
export const enum IconFeatureKind {
  FontIconClasses,
  SvgIconDirectory,
}

/**
 * An icon feature object. All properties are internal!
 */
export interface IconFeature<KindT extends IconFeatureKind> {
  __kind: KindT;
  __providers: (Provider | EnvironmentProviders)[];
}

/**
 * Helper for creating icon feature objects
 *
 * @param kind Feature kind
 * @param providers Array of providers for the feature
 * @returns A new feature object
 */
function makeIconFeature<KindT extends IconFeatureKind>(kind: KindT, providers: Provider[]): IconFeature<KindT> {
  return { __kind: kind, __providers: providers };
}

export function withFontIconClasses(classes: string[]): IconFeature<IconFeatureKind.FontIconClasses> {
  return makeIconFeature(IconFeatureKind.FontIconClasses, [
    {
      provide: FONT_ICONS_CLASSES,
      useValue: classes,
    },
  ]);
}

export function withSvgIconDirectory(directory: string): IconFeature<IconFeatureKind.SvgIconDirectory> {
  return makeIconFeature(IconFeatureKind.SvgIconDirectory, [
    {
      provide: SVG_ICON_DIRECTORY,
      useValue: directory,
    },
  ]);
}

export function provideIcons(...features: IconFeature<IconFeatureKind>[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(initializeIcons),
    features.map((feature) => feature.__providers),
  ]);
}
