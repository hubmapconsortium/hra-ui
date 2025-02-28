import { setupScrollTesting } from '@hra-ui/design-system/scrolling/testing';
import '@testing-library/jest-dom';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

setupScrollTesting();
