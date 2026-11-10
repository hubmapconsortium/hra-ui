import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SAMPLE_FILE, TissueOriginPredictorComponent } from './tissue-origin-predictor.component';
import { Router } from '@angular/router';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideAssetHref } from '@hra-ui/common/url';

describe('TissueOriginPredictorComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideAssetHref('http://localhost/')];
  const imports = [MatIconTestingModule];

  it('should create', async () => {
    const result = render(TissueOriginPredictorComponent, {
      imports,
      providers,
    });
    await expect(result).resolves.toBeTruthy();
  });

  it('should use user uploaded file when user clicks on the Upload CSV button', async () => {
    const mockCSVFile = new File([''], 'uploaded-file.csv', { type: 'text/csv' });

    const { fixture } = await render(TissueOriginPredictorComponent, { imports, providers });

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockCSVFile);
    fixture.detectChanges();

    const file = screen.getByText('uploaded-file.csv');
    expect(file).toBeInTheDocument();
  });

  it('should use the example file when user clicks on the Use example button', async () => {
    const mockFile = new File([''], 'example.csv', { type: 'text/plain' });

    const { fixture } = await render(TissueOriginPredictorComponent, {
      imports,
      providers: [...providers, { provide: SAMPLE_FILE, useValue: { value: { asReadonly: () => signal(mockFile) } } }],
    });

    TestBed.inject(SAMPLE_FILE);

    const useExampleButton = screen.getByText('Use example');
    await userEvent.click(useExampleButton);
    fixture.detectChanges();

    const file = screen.getByText('example.csv');
    expect(file).toBeInTheDocument();
  });

  it('should move focus to the delete button after loading a file, and back after deleting it', async () => {
    const mockFile = new File([''], 'example.csv', { type: 'text/plain' });

    await render(TissueOriginPredictorComponent, {
      imports,
      providers: [...providers, { provide: SAMPLE_FILE, useValue: { value: { asReadonly: () => signal(mockFile) } } }],
    });
    const appRef = TestBed.inject(ApplicationRef);

    await userEvent.click(screen.getByRole('button', { name: 'Use example' }));
    appRef.tick();
    expect(screen.getByRole('button', { name: 'Delete example.csv' })).toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: 'Delete example.csv' }));
    appRef.tick();
    expect(screen.getByRole('button', { name: 'Use example' })).toHaveFocus();
  });

  it('should navigate to the result page when user clicks on the Predict button', async () => {
    await render(TissueOriginPredictorComponent, { imports, providers });

    const router = TestBed.inject(Router);
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const mockCSVFile = new File([''], 'uploaded-file.csv', { type: 'text/csv' });
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockCSVFile);

    const predictButton = screen.getByText('Predict');
    await userEvent.click(predictButton);

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should link to the template in a new tab', async () => {
    await render(TissueOriginPredictorComponent, { imports, providers });

    const link = screen.getByRole('link', { name: 'View template for cell populations, opens in a new tab' });
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/x-atlas-consortia/hra-apps/blob/main/applications/us2-cell-to-spatial/heart-cell-summary.csv',
    );
    expect(link).toHaveAttribute('target', '_blank');
  });
});
