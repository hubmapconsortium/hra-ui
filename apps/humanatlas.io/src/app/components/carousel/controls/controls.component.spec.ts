import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  const providers = [provideHttpClient()];

  async function setup() {
    const result = await render(ControlsComponent, { providers });
    return result;
  }

  it('should create', async () => {
    await setup();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('should render navigation buttons and pagination container', async () => {
    await setup();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);

    const prevIcon = screen.getByText('chevron_left');
    const nextIcon = screen.getByText('chevron_right');
    expect(prevIcon).toBeInTheDocument();
    expect(nextIcon).toBeInTheDocument();
  });
});
