import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideIcons } from '@hra-ui/design-system/icons';
import { provideStore } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { withNgxsResetPlugin } from 'ngxs-reset-plugin';
import { ConfigService } from './app-config.service';
import { AppComponent } from './app.component';
import { LogsState } from './store/logs.state';
import { SheetState } from './store/sheet.state';
import { TreeState } from './store/tree.state';
import { UIState } from './store/ui.state';

jest.mock('vega', () => ({ parse: jest.fn() }));

/** Outdated Tests */
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
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideIcons(),
        provideStore([SheetState, TreeState, UIState, LogsState], withNgxsResetPlugin()),
        ConfigService,
      ],
    });

    await expect(result).resolves.toBeDefined();
  });
});
