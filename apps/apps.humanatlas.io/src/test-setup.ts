import '@testing-library/jest-dom';
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// Polyfill for structuredClone if not available (needed for vega-embed)
if (!global.structuredClone) {
  global.structuredClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
}

// Mock vega-embed to avoid canvas and DOM issues in Jest
jest.mock('vega-embed', () => ({}));
