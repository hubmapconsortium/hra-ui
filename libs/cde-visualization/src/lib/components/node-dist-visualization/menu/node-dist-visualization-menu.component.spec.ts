import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { fireEvent, render, screen } from '@testing-library/angular';
import { NodeDistVisualizationMenuComponent } from './node-dist-visualization-menu.component';

describe('NodeDistVisualizationMenuComponent', () => {
  async function openMenu(hasDeletedCells = false) {
    const resetViewClick = jest.fn();
    const resetDeletedClick = jest.fn();
    const result = await render(NodeDistVisualizationMenuComponent, {
      inputs: { hasDeletedCells },
      on: { resetViewClick, resetDeletedClick },
      providers: [provideNoopAnimations()],
    });
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    await screen.findByRole('menu');
    return { ...result, resetViewClick, resetDeletedClick };
  }

  it('toggles cell links and keeps the menu open', async () => {
    const { fixture } = await openMenu();
    const cellLinks = screen.getByRole('menuitemcheckbox', { name: /Cell links/ });

    fireEvent.click(cellLinks);
    fixture.detectChanges();
    expect(fixture.componentInstance.edgesDisabled()).toBe(true);
    expect(cellLinks).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('disables restoring cells when none were deleted', async () => {
    await openMenu();
    expect(screen.getByRole('menuitem', { name: /Restore deleted cells/ })).toBeDisabled();
  });

  it('emits the reset actions', async () => {
    const { resetViewClick, resetDeletedClick } = await openMenu(true);

    fireEvent.click(screen.getByRole('menuitem', { name: /Restore deleted cells/ }));
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    fireEvent.click(await screen.findByRole('menuitem', { name: /Reset view/ }));
    expect(resetDeletedClick).toHaveBeenCalled();
    expect(resetViewClick).toHaveBeenCalled();
  });
});
