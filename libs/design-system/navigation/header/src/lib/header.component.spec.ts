import { BreakpointObserver } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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

  it('should render', async () => {
    await expect(render(HeaderComponent, { providers })).resolves.toBeDefined();
  });

  it('should toggle a menu when the associated button is clicked', async () => {
    const group = HUBMAP_MENU.groups[0];
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
    const menu = MENUS.menus[0];
    await render(HeaderComponent, {
      providers: [...providers, mobileBreakpointsProvider],
    });

    expect(screen.queryByRole('button', { name: menu.label })).toBeNull();

    const button = screen.getByRole('button', { name: /main navigation/i });
    await userEvent.click(button);
    expect(screen.queryAllByText(menu.label).length).toBeGreaterThan(0);
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
    await render(HeaderComponent, {
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
  });
});
