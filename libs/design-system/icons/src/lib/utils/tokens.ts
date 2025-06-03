import { InjectionToken } from '@angular/core';

export const FONT_ICONS_CLASSES = new InjectionToken('FONT_ICONS_CLASSES', {
  providedIn: 'root',
  factory: () => ['material-symbols-rounded'],
});

export const SVG_ICON_DIRECTORY = new InjectionToken('SVG_ICON_DIRECTORY', {
  providedIn: 'root',
  factory: () => 'assets/icons/',
});
