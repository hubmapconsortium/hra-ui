import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { CellPopulationPredictorComponent, SAMPLE_JSON_FILE } from './cell-population-predictor.component';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('CellPopulationPredictorComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideDesignSystemCommon()];

  it('should create', async () => {
    const result = render(CellPopulationPredictorComponent, { providers });
    await expect(result).resolves.toBeTruthy();
  });

  it('should set file when user clicks on upload button is called', async () => {
    const mockFile = new File([''], 'uploaded-file.json', { type: 'application/json' });
    const { fixture } = await render(CellPopulationPredictorComponent, { providers });

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockFile);
    fixture.detectChanges();

    const file = screen.getByText('uploaded-file.json');
    expect(file).toBeInTheDocument();
  });

  it('should use sample file when clicks on use sample button', async () => {
    const mockFile = new File([''], 'sample.json', { type: 'application/json' });

    const { fixture } = await render(CellPopulationPredictorComponent, {
      providers: [
        ...providers,
        { provide: SAMPLE_JSON_FILE, useValue: { value: { asReadonly: () => signal(mockFile) } } },
      ],
    });

    const useSampleButton = screen.getByText('Use Sample');
    await userEvent.click(useSampleButton);
    fixture.detectChanges();

    const file = screen.getByText('sample.json');
    expect(file).toBeInTheDocument();
  });

  it('should navigate to the result page when predict button is clicked', async () => {
    await render(CellPopulationPredictorComponent, { providers });

    const router = TestBed.inject(Router);
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const mockFile = new File([''], 'uploaded-file.json', { type: 'application/json' });
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockFile);

    const predictButton = screen.getByText('Predict');
    await userEvent.click(predictButton);

    expect(routerSpy).toHaveBeenCalled();
  });
});
