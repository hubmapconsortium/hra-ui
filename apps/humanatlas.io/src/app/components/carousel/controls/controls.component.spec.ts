import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  const providers = [provideHttpClient()];

  async function setup() {
    const result = await render(ControlsComponent, { providers });
    return result;
  }

  it('should create', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should render navigation buttons and pagination container', async () => {
    const { container } = await setup();

    const prevButton = container.querySelector('.prev-button');
    const nextButton = container.querySelector('.next-button');
    const paginationContainer = container.querySelector('.pagination-container');

    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
    expect(paginationContainer).toBeTruthy();
  });
});
