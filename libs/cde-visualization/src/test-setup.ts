import { setupScrollTesting } from '@hra-ui/design-system/scrolling/testing';
import '@testing-library/jest-dom';
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

setupScrollTesting();
