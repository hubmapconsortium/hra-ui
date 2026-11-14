import { Provider } from '@angular/core';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenu, MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import {
  NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS,
  NAVIGATION_RAIL_MENU_PANEL_CLASS,
} from './navigation-rail-menu.directive';
import { NavigationRailModule } from './navigation-rail.module';

describe('NavigationRailMenuDirective', () => {
  const TEMPLATE = `
    <hra-navigation-rail aria-label="Actions">
      <button hraNavigationRailItem icon="layers" [matMenuTriggerFor]="menu">Display</button>
    </hra-navigation-rail>
    <mat-menu #menu="matMenu" hraNavigationRailMenu>
      <button mat-menu-item>Cell links</button>
    </mat-menu>
  `;

  async function setup(providers: Provider[] = []) {
    const result = await render(TEMPLATE, {
      imports: [NavigationRailModule, MatMenuModule],
      providers,
    });
    const menu = result.fixture.debugElement.query(By.directive(MatMenu)).injector.get(MatMenu);
    return { ...result, menu };
  }

  it('overlaps the trigger and opens after it', async () => {
    const { menu } = await setup();

    expect(menu.overlapTrigger).toBe(true);
    expect(menu.xPosition).toBe('after');
    expect(menu.overlayPanelClass).toEqual([NAVIGATION_RAIL_MENU_PANEL_CLASS]);
  });

  it('adds the rail class to the overlay pane', async () => {
    const user = userEvent.setup();
    await setup();

    await user.click(screen.getByRole('button', { name: 'Display' }));

    const item = await screen.findByRole('menuitem', { name: 'Cell links' });
    expect(item.closest('.cdk-overlay-pane')).toHaveClass(NAVIGATION_RAIL_MENU_PANEL_CLASS);
  });

  it('keeps panel classes from the app menu options', async () => {
    const { menu } = await setup([
      {
        provide: MAT_MENU_DEFAULT_OPTIONS,
        useValue: {
          overlapTrigger: false,
          xPosition: 'before',
          yPosition: 'above',
          backdropClass: 'app-backdrop',
          overlayPanelClass: 'app-menu',
        },
      },
    ]);

    expect(menu.overlayPanelClass).toEqual(['app-menu', NAVIGATION_RAIL_MENU_PANEL_CLASS]);
    expect(menu.yPosition).toBe('above');
    expect(menu.backdropClass).toBe('app-backdrop');
  });

  it('opens above a horizontal rail without the side offset, and goes back when the rail turns vertical', async () => {
    const { fixture, rerender } = await render(
      `
        <mat-menu #menu="matMenu" hraNavigationRailMenu [hraNavigationRailMenuOrientation]="orientation">
          <button mat-menu-item>Cell links</button>
        </mat-menu>
      `,
      { imports: [NavigationRailModule, MatMenuModule], componentProperties: { orientation: 'horizontal' } },
    );
    const menu = fixture.debugElement.query(By.directive(MatMenu)).injector.get(MatMenu);
    expect(menu.overlapTrigger).toBe(false);
    expect(menu.yPosition).toBe('above');
    expect(menu._classList[NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS]).toBe(true);

    await rerender({ componentProperties: { orientation: 'vertical' } });
    expect(menu.overlapTrigger).toBe(true);
    expect(menu.yPosition).toBe('below');
    expect(menu._classList[NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS]).toBe(false);
  });
});
