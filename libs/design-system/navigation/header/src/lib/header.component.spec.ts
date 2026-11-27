import { BreakpointObserver } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { HUBMAP_MENU, MENUS } from './static-data/parsed';

describe('HeaderComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];
  const mobileBreakpointsProvider = {
    provide: BreakpointObserver,
    useValue: { observe: () => of({ matches: true, breakpoints: {} }) },
  };

  beforeAll(() => {
    if (typeof ResizeObserver === 'undefined') {
      window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    }
  });

  it('should render', async () => {
    await expect(render(HeaderComponent, { providers })).resolves.toBeDefined();
  });

  it('should toggle a menu when the associated button is clicked', async () => {
    const group = HUBMAP_MENU[0];
    await render(HeaderComponent, { providers });

    // Open the menu
    const button = screen.getByRole('button', { name: /main navigation/i });
    await userEvent.click(button);
    expect(screen.queryByText(group.label)).toBeDefined();

    // Close the menu
    await userEvent.click(button);
    expect(screen.queryByText(group.label)).toBeNull();

    // Close the menu by click outside
    const outsideElement = screen.getByTestId('header');
    await userEvent.click(button);
    await userEvent.click(outsideElement);
    expect(screen.queryByText(group.label)).toBeNull();
  });

  it('should render the mobile menu on small screens', async () => {
    const menu = MENUS[0];
    await render(HeaderComponent, {
      providers: [...providers, mobileBreakpointsProvider],
    });

    expect(screen.queryByRole('button', { name: menu.label })).toBeNull();

    const button = screen.getByRole('button', { name: /main navigation/i });
    await userEvent.click(button);
    expect(screen.queryAllByText(menu.label).length).toBeGreaterThan(0);
  });

  it('should show actions in the main bar, even without breadcrumbs', async () => {
    await render(
      `<hra-header>
        <button hraHeaderActions>Upload</button>
        <span>Breadcrumbs row content</span>
      </hra-header>`,
      { imports: [HeaderComponent], providers },
    );

    const action = screen.getByRole('button', { name: 'Upload' });
    const menuButton = screen.getByRole('button', { name: /main navigation/i });
    expect(action.closest('.menus')).toBe(menuButton.closest('.menus'));
    expect(action.compareDocumentPosition(menuButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.queryByText('Breadcrumbs row content')).toBeNull();
  });

  it('should name the apps button HuBMAP apps in its tooltip', async () => {
    const { fixture } = await render(HeaderComponent, { providers });

    const button = fixture.debugElement.query(By.css('[hraFeature="menu-toggle"]'));
    expect(button.injector.get(MatTooltip).message).toBe('HuBMAP apps');
  });

  it('should name the consolidated menu button Menu in its tooltip on small screens', async () => {
    const { fixture } = await render(HeaderComponent, { providers: [...providers, mobileBreakpointsProvider] });

    const button = fixture.debugElement.query(By.css('[hraFeature="menu-toggle"]'));
    expect(button.injector.get(MatTooltip).message).toBe('Menu');
  });

  it('should name the logo Homepage in its tooltip', async () => {
    const { fixture } = await render(HeaderComponent, { providers });

    const logo = fixture.debugElement.query(By.css('hra-brand-logo a'));
    expect(logo.injector.get(MatTooltip).message).toBe('Homepage');
  });

  it('should show the navigation categories after the logo and a divider when navigationPosition is start', async () => {
    const { container } = await render(HeaderComponent, { providers, inputs: { navigationPosition: 'start' } });

    const children = Array.from(container.querySelector('.menus')?.children ?? []).map((child) =>
      child.classList.contains('filler') ? 'filler' : child.tagName.toLowerCase(),
    );
    expect(children.slice(0, 3)).toEqual(['hra-brand-logo', 'mat-divider', 'hra-navigation-category-toggle']);
    expect(children.indexOf('filler')).toBeGreaterThan(children.lastIndexOf('hra-navigation-category-toggle'));
  });

  it('should keep the navigation categories at the end by default', async () => {
    const { container } = await render(HeaderComponent, { providers });

    expect(container.querySelector('.logo-divider')).toBeNull();
    expect(container.querySelector('.menus > :nth-child(2)')).toHaveClass('filler');
  });

  it('should show an indeterminate progress bar when `progress === true`', async () => {
    await render(HeaderComponent, { providers, inputs: { progress: true } });

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('mode', 'indeterminate');
  });

  it('should show a determinate progress bar when `progress` is a number', async () => {
    await render(HeaderComponent, { providers, inputs: { progress: 50 } });

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('mode', 'determinate');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
  });

  it('should update menu positions when the header size changes', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [...providers, mobileBreakpointsProvider],
    });

    const button = screen.getByRole('button', { name: /main navigation/i });
    await userEvent.click(button);

    const header = screen.getByTestId('header');
    jest.spyOn(header, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      bottom: 100,
      height: 100,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      toJSON: () => undefined,
    });

    const { calls, instances } = jest.mocked(ResizeObserver).mock;
    for (let index = 0; index < calls.length; index++) {
      calls[index][0]([], instances[index]);
    }

    await fixture.whenStable();
    expect(header.getBoundingClientRect).toHaveBeenCalled();
  });
});
