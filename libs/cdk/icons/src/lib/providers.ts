import { Location } from '@angular/common';
import { APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { createSvgIconResolver } from './resolvers';

export interface FontIconsConfig {
  defaultClasses?: string[];
}

export interface SvgIconsConfig {
  directory?: string;
}

export interface IconsConfig {
  fontIcons?: FontIconsConfig;
  svgIcons?: SvgIconsConfig;
}

const FONT_ICONS_CONFIG = new InjectionToken<Required<FontIconsConfig>>('FONT_ICONS_CONFIG');
const SVG_ICONS_CONFIG = new InjectionToken<Required<SvgIconsConfig>>('SVG_ICONS_CONFIG');

const DEFAULT_FONT_ICONS_CONFIG: Required<FontIconsConfig> = {
  defaultClasses: [],
};

const DEFAULT_SVG_ICONS_CONFIG: Required<SvgIconsConfig> = {
  directory: 'assets/icons',
};

function registerDefaultFontSetClassesFactory(
  registry: MatIconRegistry,
  { defaultClasses }: Required<FontIconsConfig>,
): () => void {
  return () => {
    const existingClasses = registry.getDefaultFontSetClass();
    registry.setDefaultFontSetClass(...defaultClasses, ...existingClasses);
  };
}

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

export function provideIcons(config?: IconsConfig): EnvironmentProviders {
  return makeEnvironmentProviders([provideFontIcons(config?.fontIcons), provideSvgIcons(config?.svgIcons)]);
}
