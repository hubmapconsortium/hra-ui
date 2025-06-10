import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { provideIcons } from '@hra-ui/design-system/icons';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];
  it('should render the router outlet', async () => {
    await render(AppComponent, {
      providers: globalProviders,
    });
  });

  it('should create the component', async () => {
    const { fixture } = await render(AppComponent, {
      providers: globalProviders,
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
