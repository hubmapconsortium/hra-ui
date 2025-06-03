import { EnvironmentProviders, makeEnvironmentProviders, provideEnvironmentInitializer, Provider } from '@angular/core';
import { initializeIcons } from './utils/initialize';
import { FONT_ICONS_CLASSES, SVG_ICON_DIRECTORY } from './utils/tokens';

/**
 * Enum of all icon feature kinds
 */
const enum IconFeatureKind {
  FontIconClasses,
  SvgIconDirectory,
}

/**
 * An icon feature object. All properties are internal!
 */
interface IconFeature<KindT extends IconFeatureKind> {
  /** Feature kind */
  __kind: KindT;
  /** Feature providers */
  __providers: (Provider | EnvironmentProviders)[];
}

/**
 * All icon features
 */
export type IconFeatures = FontIconClassesFeature | SvgIconDirectoryFeature;

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

/** Font icon classes feature */
export type FontIconClassesFeature = IconFeature<IconFeatureKind.FontIconClasses>;

/**
 * Set the default font icon classes
 *
 * @param classes Default font icon classes
 */
export function withFontIconClasses(classes: string[]): FontIconClassesFeature {
  return makeIconFeature(IconFeatureKind.FontIconClasses, [
    {
      provide: FONT_ICONS_CLASSES,
      useValue: classes,
    },
  ]);
}

/** Svg icon directory feature */
export type SvgIconDirectoryFeature = IconFeature<IconFeatureKind.SvgIconDirectory>;

/**
 * Set the svg icon directory
 *
 * @param directory Icon directory
 */
export function withSvgIconDirectory(directory: string): SvgIconDirectoryFeature {
  return makeIconFeature(IconFeatureKind.SvgIconDirectory, [
    {
      provide: SVG_ICON_DIRECTORY,
      useValue: directory,
    },
  ]);
}

/**
 * Setups design system icons
 *
 * @param features Additional icon features
 */
export function provideIcons(...features: IconFeatures[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(initializeIcons),
    ...features.map((feature) => feature.__providers).flat(),
  ]);
}
