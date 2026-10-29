import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { fireEvent, render, RenderComponentOptions, screen } from '@testing-library/angular';
import { ToolbarComponent } from './toolbar.component';
import { EMBEDDING_GUIDE_URL, TOOLBAR_CONTENT } from './toolbar.content';

describe('ToolbarComponent', () => {
  async function setup(options?: RenderComponentOptions<ToolbarComponent>) {
    return render(ToolbarComponent, { ...options, providers: [provideNoopAnimations()] });
  }

  async function openMenu(label: string) {
    fireEvent.click(screen.getByRole('button', { name: label }));
    return screen.findByRole('menu');
  }

  it('is a vertical toolbar of the visualization actions', async () => {
    await setup();

    const toolbar = screen.getByRole('toolbar', { name: TOOLBAR_CONTENT.label });
    expect(toolbar).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByRole('link', { name: TOOLBAR_CONTENT.embed.label })).toHaveAttribute(
      'href',
      EMBEDDING_GUIDE_URL,
    );
  });

  it('toggles display options and keeps the menu open', async () => {
    const { fixture } = await setup({ inputs: { hasHiddenMetadata: true } });
    const instance = fixture.componentInstance;
    await openMenu(TOOLBAR_CONTENT.display.label);

    const cellLinks = screen.getByRole('menuitemcheckbox', { name: TOOLBAR_CONTENT.display.cellLinks });
    expect(cellLinks).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(cellLinks);
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: TOOLBAR_CONTENT.display.cellLinkData }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: TOOLBAR_CONTENT.display.allMetadata }));
    fixture.detectChanges();

    expect(instance.cellLinks()).toBe(false);
    expect(instance.cellLinkData()).toBe(false);
    expect(instance.allMetadata()).toBe(true);
    expect(cellLinks).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('disables all metadata when no fields are hidden', async () => {
    await setup();
    await openMenu(TOOLBAR_CONTENT.display.label);

    expect(screen.getByRole('menuitemcheckbox', { name: TOOLBAR_CONTENT.display.allMetadata })).toBeDisabled();
  });

  it('emits the reset actions', async () => {
    const resetViewClick = jest.fn();
    const restoreDeletedCellsClick = jest.fn();
    const resetColorsClick = jest.fn();
    await setup({
      inputs: { hasDeletedCells: true },
      on: { resetViewClick, restoreDeletedCellsClick, resetColorsClick },
    });

    await openMenu(TOOLBAR_CONTENT.reset.label);
    fireEvent.click(screen.getByRole('menuitem', { name: TOOLBAR_CONTENT.reset.view }));
    await openMenu(TOOLBAR_CONTENT.reset.label);
    fireEvent.click(screen.getByRole('menuitem', { name: TOOLBAR_CONTENT.reset.deletedCells }));
    await openMenu(TOOLBAR_CONTENT.reset.label);
    fireEvent.click(screen.getByRole('menuitem', { name: TOOLBAR_CONTENT.reset.colors }));

    expect(resetViewClick).toHaveBeenCalled();
    expect(restoreDeletedCellsClick).toHaveBeenCalled();
    expect(resetColorsClick).toHaveBeenCalled();
  });

  it('disables restoring cells when none were deleted', async () => {
    await setup();
    await openMenu(TOOLBAR_CONTENT.reset.label);

    expect(screen.getByRole('menuitem', { name: TOOLBAR_CONTENT.reset.deletedCells })).toBeDisabled();
  });

  it('opens sheets and shows the open one as active', async () => {
    const openSheetChange = jest.fn();
    await setup({ on: { openSheet: openSheetChange } });
    const downloads = screen.getByRole('button', { name: TOOLBAR_CONTENT.downloads.label });
    const info = screen.getByRole('button', { name: TOOLBAR_CONTENT.info.label });

    fireEvent.click(downloads);
    expect(openSheetChange).toHaveBeenLastCalledWith('downloads');
    expect(downloads).toHaveClass('hra-navigation-rail-item--active');

    fireEvent.click(info);
    expect(openSheetChange).toHaveBeenLastCalledWith('about');
    expect(info).toHaveClass('hra-navigation-rail-item--active');
    expect(downloads).not.toHaveClass('hra-navigation-rail-item--active');
  });

  it('links to the help resources', async () => {
    await setup();
    await openMenu(TOOLBAR_CONTENT.help.label);

    for (const link of TOOLBAR_CONTENT.help.links) {
      expect(screen.getByRole('menuitem', { name: new RegExp(link.label) })).toHaveAttribute('href', link.url);
    }
  });
});
