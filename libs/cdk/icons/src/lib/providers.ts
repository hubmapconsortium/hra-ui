import { Location } from '@angular/common';
import { APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { createSvgIconResolver } from './resolvers';

/** Font icon provider configuration */
export interface FontIconsConfig {
  /** Default classes to apply when no font set is specified */
  defaultClasses?: string[];
}

/** Svg icon provider configuration */
export interface SvgIconsConfig {
  /** Base directory containing icons and namespace folders */
  directory?: string;
}

/** Configuration when providing font icons and svg icon at the same time */
export interface IconsConfig {
  /** Font icon configuration */
  fontIcons?: FontIconsConfig;
  /** Svg icon configuration */
  svgIcons?: SvgIconsConfig;
}

/** Injection token for font icon configuration */
const FONT_ICONS_CONFIG = new InjectionToken<Required<FontIconsConfig>>('FONT_ICONS_CONFIG');

/** Injection token for svg icon configuration */
const SVG_ICONS_CONFIG = new InjectionToken<Required<SvgIconsConfig>>('SVG_ICONS_CONFIG');

/** Default values for font icon configuration */
const DEFAULT_FONT_ICONS_CONFIG: Required<FontIconsConfig> = {
  defaultClasses: [],
};

/** Default values for svg icon configuration */
const DEFAULT_SVG_ICONS_CONFIG: Required<SvgIconsConfig> = {
  directory: 'assets/icons',
};

/**
 * Factory for registering default font icon classes
 *
 * @param registry Material icon registry
 * @param config Configuration object
 * @returns Registration function
 */
function registerDefaultFontSetClassesFactory(
  registry: MatIconRegistry,
  { defaultClasses }: Required<FontIconsConfig>,
): () => void {
  return () => {
    const existingClasses = registry.getDefaultFontSetClass();
    registry.setDefaultFontSetClass(...defaultClasses, ...existingClasses);
  };
}

/**
 * Factory for registering a svg icon resolver
 *
 * @param registry Material icon registry
 * @param location Location service
 * @param sanitizer Resource url sanitizer
 * @param config Configuration object
 * @returns Registration function
 */
function registerSvgIconResolverFactory(
  registry: MatIconRegistry,
  location: Location,
  sanitizer: DomSanitizer,
  { directory }: Required<SvgIconsConfig>,
): () => void {
  return () => {
    const resolver = createSvgIconResolver({
      location,
      sanitizer,
      directory,
    });

    registry.addSvgIconResolver(resolver);
  };
}

/**
 * Provides font icons
 *
 * @param config Configuration object
 * @returns Application providers
 */
export function provideFontIcons(config?: FontIconsConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: FONT_ICONS_CONFIG,
      useValue: { ...DEFAULT_FONT_ICONS_CONFIG, ...config },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: registerDefaultFontSetClassesFactory,
      deps: [MatIconRegistry, FONT_ICONS_CONFIG],
    },
  ]);
}

/**
 * Provides svg icons
 *
 * @param config Configuration object
 * @returns Application providers
 */
export function provideSvgIcons(config?: SvgIconsConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SVG_ICONS_CONFIG,
      useValue: { ...DEFAULT_SVG_ICONS_CONFIG, ...config },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: registerSvgIconResolverFactory,
      deps: [MatIconRegistry, Location, DomSanitizer, SVG_ICONS_CONFIG],
    },
  ]);
}

/**
 * Provides both font and svg icons
 *
 * @param config Configuration object
 * @returns Application providers
 */
export function provideIcons(config?: IconsConfig): EnvironmentProviders {
  return makeEnvironmentProviders([provideFontIcons(config?.fontIcons), provideSvgIcons(config?.svgIcons)]);
}
