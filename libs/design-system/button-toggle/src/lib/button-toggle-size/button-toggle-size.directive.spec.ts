import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { ToggleButtonSizeDirective } from './button-toggle-size.directive';

@Component({
  template: `<div hraButtonToggleSize="large" data-testid="dir"></div>`,
  imports: [ToggleButtonSizeDirective],
  standalone: true,
})
class ButtonToggleComponent {}

describe('ButtonToggleSizeDirective', () => {
  it('should apply the styles based on the directive', async () => {
    await render(ButtonToggleComponent);

    const directive = screen.getByTestId('dir');
    const styles = window.getComputedStyle(directive);
    const lineHeight = styles.getPropertyValue('--mat-standard-button-toggle-height');
    const font = styles.getPropertyValue('font');
    expect(font).toBe('var(--sys-label-large)');
    expect(lineHeight).toBe('24px');
  });
});
