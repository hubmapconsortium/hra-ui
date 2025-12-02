import { MatTabsModule } from '@angular/material/tabs';
import { CodeBlockComponent, provideCodeBlock } from '@hra-ui/design-system/code-block';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { provideAssetHref } from '@hra-ui/common/url';
import { fireEvent, render, RenderComponentOptions, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EmbedSidenavContentComponent } from './embed-sidenav-content.component';
import { SnackbarService } from '@hra-ui/design-system/snackbar';

describe('EmbedSidenavContentComponent', () => {
  async function setup(options: RenderComponentOptions<EmbedSidenavContentComponent> = {}) {
    return render(EmbedSidenavContentComponent, {
      ...options,
      imports: [MatTabsModule, ButtonsModule, CodeBlockComponent, FlatCardModule],
      providers: [
        provideAssetHref('http://localhost/'),
        provideCodeBlock(),
        { provide: SnackbarService, useValue: { open: jest.fn() } },
        ...(options.providers ?? []),
      ],
      inputs: {
        tagline: '',
        code: '<p>Test Code</p>',
        showApp: true,
        documentLink: 'https://example.com',
        ...options.inputs,
      },
    });
  }

  it('should create', async () => {
    await expect(setup()).resolves.toBeDefined();
  });

  it('should display the correct tagline', async () => {
    const tagline = 'Test Tagline';
    await setup({ inputs: { tagline } });
    expect(screen.getByText(tagline)).toBeTruthy();
  });

  it('should show tab group when showApp is true', async () => {
    await setup({ inputs: { showApp: true } });
    expect(screen.getByRole('tablist')).toBeTruthy();
  });

  it('should emit closeSidenav event when close button is clicked', async () => {
    const close = jest.fn();
    await setup({ on: { closeSidenav: close } });
    const button = screen.getByRole('button', { name: 'Close card' });
    await userEvent.click(button);

    expect(close).toHaveBeenCalled();
  });

  it('should open document link in new tab when Documentation button is clicked', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation();
    await setup();

    const docButton = screen.getByText('Documentation');
    fireEvent.click(docButton);

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank');
  });

  it('should show snackbar when Copy button triggers copied event', async () => {
    const snackbar = { open: jest.fn() };
    await setup({
      providers: [{ provide: SnackbarService, useValue: snackbar }],
    });

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent(copyButton, new CustomEvent('cdkCopyToClipboardCopied'));

    expect(snackbar.open).toHaveBeenCalledWith('Copied to clipboard', '', false, 'start', { duration: 5000 });
  });

  it('should handle tab change', async () => {
    await setup();

    const tabs = screen.getAllByRole('tab');
    await userEvent.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });
});
