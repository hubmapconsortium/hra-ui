import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { TreeSizeDirective } from './tree-size.directive';

describe('Tree Size Directive', () => {
  @Component({
    template: `<div hraTreeSize="small" data-testid="dir"></div>`,
    imports: [TreeSizeDirective],
    standalone: true,
  })
  class FixtureComponent {}
  it('should apply styles', async () => {
    await render(FixtureComponent);
    const directive = screen.getByTestId('dir');
    const styles = window.getComputedStyle(directive);
    expect(styles.getPropertyValue('--mat-tree-node-text-size')).toBe('0.75rem');
    expect(styles.getPropertyValue('--mat-tree-node-min-height')).toBe('1.5rem');
    expect(styles.getPropertyValue('--mdc-icon-button-state-layer-size')).toBe('1.5rem');
    expect(styles.getPropertyValue('--mdc-icon-button-icon-size')).toBe('1.25rem');
  });
});
