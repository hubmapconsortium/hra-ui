import { Provider } from '@angular/core';
import {
  PAGE_SECTION_ACTIVATION_OPTIONS,
  PageSectionActivationOptions,
  PageSectionActivationService,
} from './services/page-section-activation.service';
import { PageSectionService } from './services/page-section.service';

/**
 * Provides the services required for page section tracking.
 * Should be provided inside a component - not in root!
 *
 * @param options Page section activation options
 * @returns Component providers
 */
export function providePageSectionNavigation(options: PageSectionActivationOptions = {}): Provider[] {
  return [
    {
      provide: PAGE_SECTION_ACTIVATION_OPTIONS,
      useValue: options,
    },
    PageSectionService,
    PageSectionActivationService,
  ];
}
