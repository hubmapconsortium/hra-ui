import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TissueOriginPredictionsComponent } from './tissue-origin-predictions.component';

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

    const snackbarService = TestBed.inject(SnackbarService);
    const snackbarSpy = jest.spyOn(snackbarService, 'open');

    const menuButton = screen.getByTestId('anatomical-menu');
    await userEvent.click(menuButton);
    fixture.detectChanges();

    const downloadAnatomicalButton = screen.getByTestId('download-anatomical-csv-button');
    await userEvent.click(downloadAnatomicalButton);
    fixture.detectChanges();

    expect(snackbarSpy).toHaveBeenCalled();

    const snackbar = screen.getByTestId('snackbar');
    expect(snackbar.textContent).toBe('File downloaded');
  });

  it('downloads CSV file when user clicks on download CSV button for Similar Datasets table', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(TissueOriginPredictionsComponent, { providers });

    const snackbarService = TestBed.inject(SnackbarService);
    const snackbarSpy = jest.spyOn(snackbarService, 'open');

    const menuButton = screen.getByTestId('similar-datasets-menu');
    await userEvent.click(menuButton);
    fixture.detectChanges();

    const downloadAnatomicalButton = screen.getByTestId('download-similar-dataset-csv-button');
    await userEvent.click(downloadAnatomicalButton);
    fixture.detectChanges();

    expect(snackbarSpy).toHaveBeenCalled();

    const snackbar = screen.getByTestId('snackbar');
    expect(snackbar.textContent).toBe('File downloaded');
  });

  it('downloads JSON file when user clicks on download JSON-LD button', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(TissueOriginPredictionsComponent, { providers });

    const snackbarService = TestBed.inject(SnackbarService);
    const snackbarSpy = jest.spyOn(snackbarService, 'open');

    const downloadJsonButton = screen.getByTestId('download-json-button');
    await userEvent.click(downloadJsonButton);
    fixture.detectChanges();

    expect(snackbarSpy).toHaveBeenCalled();

    const snackbar = screen.getByTestId('snackbar');
    expect(snackbar.textContent).toBe('File downloaded');
  });
});
