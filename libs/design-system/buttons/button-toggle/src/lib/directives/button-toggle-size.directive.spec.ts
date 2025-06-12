import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { render } from '@testing-library/angular';
import { ButtonToggleSizeDirective } from './button-toggle-size.directive';

describe('ButtonToggleSizeDirective', () => {
  const imports = [MatButtonToggleModule, ButtonToggleSizeDirective];
  const template = `<mat-button-toggle-group hraButtonToggleSize="large">
    <mat-button-toggle>Toggle</mat-button-toggle>
  </mat-button-toggle-group>`;

  it('should set an size class', async () => {
    const { container } = await render(template, { imports });
    expect(container.querySelector('.hra-button-toggle-size-large')).toBeDefined();
  });
});
