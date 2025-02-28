import '@testing-library/jest-dom';
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// window.ResizeObserver = jest.fn().mockImplementation(() => ({
//   observe: jest.fn(),
//   unobserve: jest.fn(),
//   disconnect: jest.fn(),
// }));
