import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { ToggleButtonSizeDirective } from './button-toggle-size.directive';

describe('ButtonToggleSizeDirective', () => {
  it('should apply the styles based on the directive', async () => {
    @Component({
      template: `<div hraButtonToggleSize="large" data-testid="dir"></div>`,
      imports: [ToggleButtonSizeDirective],
      standalone: true,
    })
    class ButtonToggleComponent {}

    await render(ButtonToggleComponent);

    const directive = screen.getByTestId('dir');
    expect(directive.getAttribute('hrabuttontogglesize')).toBe('large');
    expect(directive.style.font).toBe('var(--sys-label-large)');
  });
});
