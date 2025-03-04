import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { render } from '@testing-library/angular';
import configuration from '../assets/configuration.json';
import omapSheetConfig from '../assets/omap-sheet-config.json';
import sheetConfig from '../assets/sheet-config.json';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

jest.mock('vega', () => ({ parse: jest.fn() }));

describe('AppComponent', () => {
  beforeAll(() => {
    if (typeof ResizeObserver === 'undefined') {
      window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    }
  });

  it('should create', async () => {
    const result = render(AppComponent, {
      imports: [AppModule],
      providers: [provideHttpClientTesting(), withNgxsLoggerPlugin({ disabled: true })],
    });

    const controller = TestBed.inject(HttpTestingController);
    controller.expectOne('assets/configuration.json').flush(configuration);
    controller.expectOne('assets/omap-sheet-config.json').flush(omapSheetConfig);
    controller.expectOne('assets/sheet-config.json').flush(sheetConfig);

    await expect(result).resolves.toBeDefined();
  });
});
