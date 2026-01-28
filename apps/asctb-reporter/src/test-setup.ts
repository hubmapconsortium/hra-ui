import '@testing-library/jest-dom';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// Simple Vega mocks
jest.mock('vega', () => ({
  parse: jest.fn(),
  View: jest.fn(),
  Spec: {},
}));

jest.mock('vega-tooltip', () => jest.fn());
