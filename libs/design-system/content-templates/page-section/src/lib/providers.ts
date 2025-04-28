import { Provider } from '@angular/core';
import {
  PAGE_SECTION_ACTIVATION_OPTIONS,
  PageSectionActivationOptions,
  PageSectionActivationService,
} from './services/page-section-activation.service';
import { PageSectionService } from './services/page-section.service';

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
