import { Component } from '@angular/core';
import { SelectSizeDirective } from './select-size.directive';
import { render, screen } from '@testing-library/angular';

describe('SelectSizeDirective', () => {
  @Component({
    template: `<div hraSelectSize="small" data-testid="dir"></div>`,
    imports: [SelectSizeDirective],
    standalone: true,
  })
  class SelectSizeDemoComponent {}

  it('Element with select size directive should be in the document', async () => {
    await render(SelectSizeDemoComponent);
    const directive = screen.getByTestId('dir');
    expect(directive).toBeInTheDocument();
  });
});
