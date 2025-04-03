import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TissueOriginPredictionsComponent } from './tissue-origin-predictions.component';

jest.mock('file-saver');

describe('TissueOriginPredictionsComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('should create', async () => {
    const result = render(TissueOriginPredictionsComponent, { providers });
    await expect(result).resolves.toBeTruthy();
  });

  it('downloads CSV file when user clicks on download CSV button for Anatomical Structures table', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(TissueOriginPredictionsComponent, { providers });
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const menu = await loader.getHarness(
      MatMenuHarness.with({ selector: '.similar-anatomical-structures-menu-trigger' }),
    );

    await menu.clickItem({ text: /CSV/i });
    const snackbar = await loader.getHarnessOrNull(MatSnackBarHarness);

    expect(snackbar).toBeDefined();
    expect(screen.queryByText(/File downloaded/)).toBeDefined();
  });

  it('downloads CSV file when user clicks on download CSV button for Similar Datasets table', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(TissueOriginPredictionsComponent, { providers });
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const menu = await loader.getHarness(MatMenuHarness.with({ selector: '.similar-datasets-menu-trigger' }));
    await menu.clickItem({ text: /CSV/i });

    const snackbar = await loader.getHarnessOrNull(MatSnackBarHarness);
    expect(snackbar).toBeDefined();
    expect(screen.queryByText(/File downloaded/)).toBeDefined();
  });

  it('downloads JSON file when user clicks on download JSON-LD button', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(TissueOriginPredictionsComponent, { providers });
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const button = screen.getByText('JSON-LD');

    await userEvent.click(button);
    fixture.detectChanges();

    const snackbar = await loader.getHarnessOrNull(MatSnackBarHarness);
    expect(snackbar).toBeDefined();
    expect(screen.queryByText(/File downloaded/)).toBeDefined();
  });

  it('shows the eui when user clicks on the Explore button', async () => {
    const { fixture } = await render(TissueOriginPredictionsComponent, { providers });

    const button = screen.getByText('Explore');

    await userEvent.click(button);
    fixture.detectChanges();

    await fixture.whenStable();

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
  });
});
