import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  const providers = [provideHttpClient()];

  it('should create', async () => {
    const { fixture } = await render(ControlsComponent, { providers });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render navigation buttons and pagination container', async () => {
    const { container } = await render(ControlsComponent, { providers });

    const prevButton = container.querySelector('.prev-button');
    const nextButton = container.querySelector('.next-button');
    const paginationContainer = container.querySelector('.pagination-container');

    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
    expect(paginationContainer).toBeTruthy();
  });
});
