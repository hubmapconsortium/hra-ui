import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { CellPopulationPredictorComponent, SAMPLE_JSON_FILE } from './cell-population-predictor.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('CellPopulationPredictorComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should create', async () => {
    const result = render(CellPopulationPredictorComponent, {
      providers,
      imports: [MatIconTestingModule],
    });
    await expect(result).resolves.toBeTruthy();
  });

  it('should name each card heading with its option number', async () => {
    await render(CellPopulationPredictorComponent, {
      providers,
      imports: [MatIconTestingModule],
    });

    expect(screen.getByRole('heading', { level: 2, name: /^Option 1 ?: Upload$/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /^Option 2 ?: Create$/ })).toBeInTheDocument();
  });

  it('should set file when user clicks on upload button is called', async () => {
    const mockFile = new File([''], 'uploaded-file.json', { type: 'application/json' });
    const { fixture } = await render(CellPopulationPredictorComponent, {
      providers,
      imports: [MatIconTestingModule],
    });

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockFile);
    fixture.detectChanges();

    const file = screen.getByText('uploaded-file.json');
    expect(file).toBeInTheDocument();
  });

  it('should use the example file when clicks on use example button', async () => {
    const mockFile = new File([''], 'example.json', { type: 'application/json' });

    const { fixture } = await render(CellPopulationPredictorComponent, {
      providers: [
        ...providers,
        { provide: SAMPLE_JSON_FILE, useValue: { value: { asReadonly: () => signal(mockFile) } } },
      ],
      imports: [MatIconTestingModule],
    });

    const useExampleButton = screen.getByText('Use example');
    await userEvent.click(useExampleButton);
    fixture.detectChanges();

    const file = screen.getByText('example.json');
    expect(file).toBeInTheDocument();
  });

  it('should move focus to the delete button after loading a file, and back after deleting it', async () => {
    const mockFile = new File([''], 'example.json', { type: 'application/json' });

    await render(CellPopulationPredictorComponent, {
      providers: [
        ...providers,
        { provide: SAMPLE_JSON_FILE, useValue: { value: { asReadonly: () => signal(mockFile) } } },
      ],
      imports: [MatIconTestingModule],
    });
    const appRef = TestBed.inject(ApplicationRef);

    await userEvent.click(screen.getByRole('button', { name: 'Use example' }));
    appRef.tick();
    expect(screen.getByRole('button', { name: 'Delete example.json' })).toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: 'Delete example.json' }));
    appRef.tick();
    expect(screen.getByRole('button', { name: 'Use example' })).toHaveFocus();
  });

  it('should navigate to the result page when predict button is clicked', async () => {
    await render(CellPopulationPredictorComponent, {
      providers,
      imports: [MatIconTestingModule],
    });

    const router = TestBed.inject(Router);
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const mockFile = new File([''], 'uploaded-file.json', { type: 'application/json' });
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, mockFile);

    const predictButton = screen.getByText('Predict');
    await userEvent.click(predictButton);

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should link to the template in a new tab', async () => {
    await render(CellPopulationPredictorComponent, {
      providers,
      imports: [MatIconTestingModule],
    });

    const link = screen.getByRole('link', { name: 'View template for extraction sites, opens in a new tab' });
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/x-atlas-consortia/hra-apps/blob/main/applications/us1-spatial-to-cell/registration-data.json',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
