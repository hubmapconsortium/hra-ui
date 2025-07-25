import { inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { createSvgIconResolver } from '../resolvers/icon.resolver';
import { FONT_ICONS_CLASSES } from './tokens';

/**
 * Initializes design system icons by configuring material's icon registry
 */
export function initializeIcons(): void {
  const registry = inject(MatIconRegistry);
  const classes = [...registry.getDefaultFontSetClass(), ...inject(FONT_ICONS_CLASSES)];

  registry.setDefaultFontSetClass(...classes);
  registry.addSvgIconResolver(createSvgIconResolver());
}
