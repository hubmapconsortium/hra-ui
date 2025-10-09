import '@testing-library/jest-dom';
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// Mock @google/model-viewer to avoid ES module issues
jest.mock('@google/model-viewer', () => ({}));
