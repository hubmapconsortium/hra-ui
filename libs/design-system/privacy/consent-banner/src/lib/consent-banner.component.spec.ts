import { provideHttpClient } from '@angular/common/http';
import { ConsentBannerComponent } from './consent-banner.component';
import { render, fireEvent } from '@testing-library/angular';

describe('ConsentBannerComponent', () => {
  it('should create the component', async () => {
    const component = await render(ConsentBannerComponent, {
      imports: [],
      providers: [provideHttpClient()],
    });
    expect(component).toBeTruthy();
  });

  it('should emit allowAllClick event when "Allow all" button is clicked', async () => {
    const component = await render(ConsentBannerComponent, {
      imports: [],
      providers: [provideHttpClient()],
    });

    let emitted = false;
    component.fixture.componentInstance.allowAllClick.subscribe(() => {
      emitted = true;
    });

    const allowAllButton = component.getByText('Allow all');
    fireEvent.click(allowAllButton);
    expect(emitted).toBe(true);
  });

  it('should emit allowNecessaryOnlyClick event when "Allow necessary only" button is clicked', async () => {
    const component = await render(ConsentBannerComponent, {
      imports: [],
      providers: [provideHttpClient()],
    });

    let emitted = false;
    component.fixture.componentInstance.allowNecessaryOnlyClick.subscribe(() => {
      emitted = true;
    });

    const allowNecessaryOnlyButton = component.getByText('Allow necessary only');
    fireEvent.click(allowNecessaryOnlyButton);
    expect(emitted).toBe(true);
  });

  it('should emit customizeClick event when "Customize" button is clicked', async () => {
    const component = await render(ConsentBannerComponent, {
      imports: [],
      providers: [provideHttpClient()],
    });

    let emitted = false;
    component.fixture.componentInstance.customizeClick.subscribe(() => {
      emitted = true;
    });

    const customizeButton = component.getByText('Customize');
    fireEvent.click(customizeButton);
    expect(emitted).toBe(true);
  });
});
