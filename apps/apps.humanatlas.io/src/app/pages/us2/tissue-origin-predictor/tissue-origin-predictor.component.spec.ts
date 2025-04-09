import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SAMPLE_FILE, TissueOriginPredictorComponent } from './tissue-origin-predictor.component';
import { Router } from '@angular/router';
import { provideDesignSystemCommon } from '@hra-ui/design-system';

describe('TissueOriginPredictorComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideDesignSystemCommon()];

  it('should create', async () => {
    const result = render(TissueOriginPredictorComponent, { providers });
    await expect(result).resolves.toBeTruthy();
  });

  it('should use user uploaded file when user clicks on the Upload File', async () => {
    const mockCSVFile = new File([''], 'uploaded-file.csv', { type: 'text/csv' });

    const { fixture } = await render(TissueOriginPredictorComponent, { providers });

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockCSVFile);
    fixture.detectChanges();

    const file = screen.getByText('uploaded-file.csv');
    expect(file).toBeInTheDocument();
  });

  it('should use sample file when user clicks on the Use Sample button', async () => {
    const mockFile = new File([''], 'sample.csv', { type: 'text/plain' });

    const { fixture } = await render(TissueOriginPredictorComponent, {
      providers: [...providers, { provide: SAMPLE_FILE, useValue: { value: { asReadonly: () => signal(mockFile) } } }],
    });

    TestBed.inject(SAMPLE_FILE);

    const useSampleButton = screen.getByText('Use Sample');
    await userEvent.click(useSampleButton);
    fixture.detectChanges();

    const file = screen.getByText('sample.csv');
    expect(file).toBeInTheDocument();
  });

  it('should navigate to the result page when user clicks on the Predict button', async () => {
    await render(TissueOriginPredictorComponent, { providers });

    const router = TestBed.inject(Router);
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const mockCSVFile = new File([''], 'uploaded-file.csv', { type: 'text/csv' });
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockCSVFile);

    const predictButton = screen.getByText('Predict');
    await userEvent.click(predictButton);

    expect(routerSpy).toHaveBeenCalled();
  });
});
