import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TissueOriginService, UserSelectionService } from '../services/tissue-origin.service';
import { TissueOriginPredictorComponent } from './tissue-origin-predictor.component';
import { Router } from '@angular/router';
import { IdLabelPair } from '@hra-api/ng-client';

describe('TissueOriginPredictorComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should create', async () => {
    const result = render(TissueOriginPredictorComponent, { providers });
    await expect(result).resolves.toBeTruthy();
  });

  it('should set file when onFileSelected is called', async () => {
    const mockCSVFile = new File([''], 'sample.csv', { type: 'text/csv' });
    await render(TissueOriginPredictorComponent, { providers });

    const tissueOriginService = TestBed.inject(TissueOriginService);
    const setFile = jest.spyOn(tissueOriginService, 'setFile');

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockCSVFile);
    expect(setFile).toHaveBeenCalledWith(mockCSVFile);
  });

  it('should use sample file when onUseSampleClicked is called', async () => {
    const mockFile = new File([''], 'mock.csv', { type: 'text/plain' });

    await render(TissueOriginPredictorComponent, { providers });

    const tissueOriginService = TestBed.inject(TissueOriginService);
    const setSampleFile = jest.spyOn(tissueOriginService, 'setSampleFile').mockResolvedValue();
    const getFile = jest.spyOn(tissueOriginService, 'getFile').mockReturnValue(mockFile);

    const useSampleButton = screen.getByText('Use Sample');
    await userEvent.click(useSampleButton);

    expect(setSampleFile).toHaveBeenCalled();
    expect(getFile).toHaveBeenCalled();
  });

  it('should update the user selected organ and tool when predict button is clicked', async () => {
    const { fixture } = await render(TissueOriginPredictorComponent, { providers });
    const component = fixture.componentInstance;

    const mockOrgans: IdLabelPair[] = [{ id: '1', label: 'Heart' }];
    const mockTools: IdLabelPair[] = [{ id: '1', label: 'Azimuth' }];

    const router = TestBed.inject(Router);
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const userSelectionService = TestBed.inject(UserSelectionService);
    const updateSelectionSpy = jest.spyOn(userSelectionService, 'updateSelection');

    Object.defineProperty(component, 'supportedOrgans', {
      value: () => mockOrgans,
    });

    Object.defineProperty(component, 'supportedTools', {
      value: () => mockTools,
    });

    Object.defineProperty(component, 'file', {
      value: () => new File([''], 'sample.csv', { type: 'text/csv' }),
    });

    await fixture.whenStable();
    fixture.detectChanges();

    // Organ Dropdown
    const organDropdown = screen.getByLabelText('Organ');
    await userEvent.click(organDropdown);

    const organOption = await screen.findByRole('option', { name: /Heart/i });
    await userEvent.click(organOption);

    const selectedOrganOption = await screen.findByText(/Heart/i);
    expect(selectedOrganOption).toBeTruthy();

    // Tool Dropdown
    const toolDropdown = screen.getByLabelText('Annotation Tool');
    await userEvent.click(toolDropdown);

    const toolOption = await screen.findByRole('option', { name: /Azimuth/i });
    await userEvent.click(toolOption);

    const selectedToolOption = await screen.findByText(/Azimuth/i);
    expect(selectedToolOption).toBeTruthy();

    // clicking predict button
    const predictButton = screen.getByText('Predict');
    await userEvent.click(predictButton);

    expect(updateSelectionSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
});
