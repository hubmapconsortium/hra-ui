import { DOWN_ARROW, END, HOME, UP_ARROW } from '@angular/cdk/keycodes';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { fireEvent, render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { NavigationRailModule } from './navigation-rail.module';

describe('NavigationRailComponent', () => {
  async function setup(template: string, componentProperties: Record<string, unknown> = {}) {
    const result = await render(template, { imports: [NavigationRailModule], componentProperties });
    await result.fixture.whenStable();
    return result;
  }

  // The CDK key manager reads keyCode, which user-event doesn't set for these keys
  function press(key: string, keyCode: number): void {
    fireEvent.keyDown(document.activeElement as Element, { key, keyCode });
  }

  const RAIL = `
    <hra-navigation-rail aria-label="Actions">
      <button hraNavigationRailItem icon="layers">Display</button>
      <button hraNavigationRailItem icon="restart_alt">Reset</button>
      <button hraNavigationRailItem icon="download">Downloads</button>
      <button hraNavigationRailItem icon="help" hraNavigationRailBottom>Help</button>
    </hra-navigation-rail>
    <button>After</button>
  `;

  it('is a vertical toolbar', async () => {
    await setup(RAIL);

    const rail = screen.getByRole('toolbar', { name: 'Actions' });
    expect(rail).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('uses the projected content as the item name and hides the icon', async () => {
    await setup(RAIL);

    expect(screen.getByRole('button', { name: 'Display' })).toBeInTheDocument();
    expect(screen.getByText('layers')).toHaveAttribute('aria-hidden', 'true');
  });

  it('pins bottom items to the bottom slot', async () => {
    const { container } = await setup(RAIL);

    expect(container.querySelector('.hra-navigation-rail--bottom')).toContainElement(
      screen.getByRole('button', { name: 'Help' }),
    );
  });

  it('is a single tab stop', async () => {
    const user = userEvent.setup();
    await setup(RAIL);

    await user.tab();
    expect(screen.getByRole('button', { name: 'Display' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveAttribute('tabindex', '-1');

    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('moves focus with the arrow keys, Home and End, and wraps', async () => {
    const user = userEvent.setup();
    await setup(RAIL);

    await user.tab();
    press('ArrowDown', DOWN_ARROW);
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveFocus();

    press('End', END);
    expect(screen.getByRole('button', { name: 'Help' })).toHaveFocus();

    press('ArrowDown', DOWN_ARROW);
    expect(screen.getByRole('button', { name: 'Display' })).toHaveFocus();

    press('ArrowUp', UP_ARROW);
    expect(screen.getByRole('button', { name: 'Help' })).toHaveFocus();

    press('Home', HOME);
    expect(screen.getByRole('button', { name: 'Display' })).toHaveFocus();
  });

  it('keeps the focused item as the tab stop', async () => {
    const user = userEvent.setup();
    const { fixture } = await setup(RAIL);

    await user.click(screen.getByRole('button', { name: 'Downloads' }));
    await fixture.whenStable();

    expect(screen.getByRole('button', { name: 'Downloads' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'Display' })).toHaveAttribute('tabindex', '-1');
  });

  it('skips disabled items', async () => {
    const user = userEvent.setup();
    await setup(`
      <hra-navigation-rail aria-label="Actions">
        <button hraNavigationRailItem icon="layers" disabled>Display</button>
        <a hraNavigationRailItem icon="code" aria-disabled="true">Embed</a>
        <button hraNavigationRailItem icon="restart_alt">Reset</button>
        <button hraNavigationRailItem icon="download">Downloads</button>
      </hra-navigation-rail>
    `);

    await user.tab();
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveFocus();

    press('ArrowUp', UP_ARROW);
    expect(screen.getByRole('button', { name: 'Downloads' })).toHaveFocus();
  });

  it('supports links', async () => {
    await setup(`
      <hra-navigation-rail aria-label="Actions">
        <a hraNavigationRailItem icon="code" href="https://example.com/embed" aria-current="page">Embed</a>
      </hra-navigation-rail>
    `);

    const link = screen.getByRole('link', { name: 'Embed' });
    expect(link).toHaveAttribute('href', 'https://example.com/embed');
    expect(link).toHaveAttribute('tabindex', '0');
  });

  it('shows items as active from the active input', async () => {
    const { rerender } = await setup(
      `
      <hra-navigation-rail aria-label="Actions">
        <button hraNavigationRailItem icon="download" [active]="open">Downloads</button>
      </hra-navigation-rail>
    `,
      { open: false },
    );

    const item = screen.getByRole('button', { name: 'Downloads' });
    expect(item).not.toHaveClass('hra-navigation-rail-item--active');

    await rerender({ componentProperties: { open: true } });
    expect(item).toHaveClass('hra-navigation-rail-item--active');
  });

  it('leaves the tab index alone outside a rail', async () => {
    await setup(`<button hraNavigationRailItem icon="help">Help</button>`);

    expect(screen.getByRole('button', { name: 'Help' })).not.toHaveAttribute('tabindex');
  });

  describe('tooltips', () => {
    const TOOLTIP_RAIL = `
      <hra-navigation-rail aria-label="Actions">
        <button hraNavigationRailItem icon="download" hraPlainTooltip="Download data and images">Downloads</button>
      </hra-navigation-rail>
    `;

    it('open beside the rail and keep the app tooltip options', async () => {
      const { fixture } = await render(TOOLTIP_RAIL, {
        imports: [NavigationRailModule, PlainTooltipDirective],
        providers: [
          { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 250, hideDelay: 0, touchendHideDelay: 1500 } },
        ],
      });
      const tooltip = fixture.debugElement.query(By.directive(MatTooltip)).injector.get(MatTooltip);

      expect(tooltip.position).toBe('after');
      expect(tooltip.showDelay).toBe(250);
    });

    it('show on keyboard focus', async () => {
      const user = userEvent.setup();
      await render(TOOLTIP_RAIL, { imports: [NavigationRailModule, PlainTooltipDirective] });

      await user.tab();
      expect(
        await screen.findByText('Download data and images', { selector: '.mat-mdc-tooltip-surface' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Downloads' })).toHaveAccessibleDescription('Download data and images');
    });
  });
});
