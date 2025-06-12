import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { fireEvent, getByRole, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CellPopulationPredictionsComponent } from './cell-population-predictions.component';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { CellSummaryRow } from '@hra-api/ng-client';

const MOCK_PREDICTIONS: CellSummaryRow[] = [
  {
    tool: 'azimuth',
    modality: 'sc_transcriptomics',
    cell_id: 'http://purl.obolibrary.org/obo/CL_0000113',
    cell_label: 'Cycling Mononuclear Phagocyte',
    count: 7.63,
    percentage: 50,
  },
];

describe('CellPopulationPredictionsComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should create', async () => {
    const result = render(CellPopulationPredictionsComponent, { providers });
    await expect(result).resolves.toBeTruthy();
  });

  it('should show confirmation alert when user clicks on the delete button', async () => {
    const windowConfirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    await render(CellPopulationPredictionsComponent, { providers });

    const router = TestBed.inject(Router);
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    const deleteFileElement = screen.getByTestId('delete-file-button');
    const deleteButton = getByRole(deleteFileElement, 'button');
    await userEvent.click(deleteButton);

    expect(windowConfirmSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should show confirmation alert when user tries to reload the page', async () => {
    const { fixture } = await render(CellPopulationPredictionsComponent, { providers });

    const event = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    const spy = jest.spyOn(event, 'preventDefault');
    fireEvent(window, event);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
  });

  it('downaloads CSV file when user clicks on download CSV button', async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');

    const { fixture } = await render(CellPopulationPredictionsComponent, {
      providers,
      inputs: { predictions: MOCK_PREDICTIONS },
    });
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const menu = await loader.getHarness(MatMenuHarness.with({ selector: '.predictions-table-menu-trigger' }));

    await menu.clickItem({ text: /CSV/i });
    const snackbar = await loader.getHarnessOrNull(MatSnackBarHarness);

    expect(snackbar).toBeDefined();
    expect(screen.queryByText(/File downloaded/)).toBeDefined();
  });
});
