import '@testing-library/jest-dom';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// Mock @google/model-viewer to avoid ES module issues
jest.mock('@google/model-viewer', () => ({}));
