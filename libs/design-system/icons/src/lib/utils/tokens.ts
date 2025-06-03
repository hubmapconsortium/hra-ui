import { InjectionToken } from '@angular/core';

/** Token with the default font icon classes */
export const FONT_ICONS_CLASSES = new InjectionToken('FONT_ICONS_CLASSES', {
  providedIn: 'root',
  factory: () => ['material-symbols-rounded'],
});

/** Token with the svg icon directory */
export const SVG_ICON_DIRECTORY = new InjectionToken('SVG_ICON_DIRECTORY', {
  providedIn: 'root',
  factory: () => 'assets/icons/',
});
