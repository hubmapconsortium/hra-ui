import { ApplicationConfig } from '@angular/core';
import { provideDesignSystem } from '@hra-ui/design-system';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [provideDesignSystem()],
};
