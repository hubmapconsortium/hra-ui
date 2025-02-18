import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { PredictionsService } from '../services/predictions.service';
import { CellPopulationPredictorComponent } from './cell-population-predictor.component';

describe('CellPopulationPredictorComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should create', async () => {
    const result = render(CellPopulationPredictorComponent, { providers });
    await expect(result).resolves.toBeTruthy();
  });

  it('should set file when onFileSelected is called', async () => {
    const mockFile = new File([''], 'sample.json', { type: 'application/json' });
    await render(CellPopulationPredictorComponent, { providers });

    const predictionsService = TestBed.inject(PredictionsService);
    const setFile = jest.spyOn(predictionsService, 'setFile');

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockFile);
    expect(setFile).toHaveBeenCalledWith(mockFile);
  });

  it('should use sample file when onUseSampleClicked is called', async () => {
    await render(CellPopulationPredictorComponent, { providers });

    const predictionsService = TestBed.inject(PredictionsService);
    const setSampleFile = jest.spyOn(predictionsService, 'setSampleFile');

    const useSampleButton = screen.getByTestId('use-sample-button');
    await userEvent.click(useSampleButton);

    expect(setSampleFile).toHaveBeenCalled();
  });
});
