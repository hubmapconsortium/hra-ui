import { InjectionToken } from '@angular/core';

/** Icons configuration */
export interface IconsConfig {
  /** Classes applied on default font set icons */
  fontClasses?: string[];
  /** Base directory of svg icons */
  svgDirectory?: string;
}

/** Token providing the icon configuration */
export const ICONS_CONFIG = new InjectionToken<IconsConfig>('iconsConfig');
