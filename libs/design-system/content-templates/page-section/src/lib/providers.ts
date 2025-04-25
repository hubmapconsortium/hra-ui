import { Provider } from '@angular/core';
import { PageSectionActivationService } from './services/page-section-activation.service';
import { PageSectionService } from './services/page-section.service';

export function providePageSectionNavigation(): Provider[] {
  return [PageSectionService, PageSectionActivationService];
}
