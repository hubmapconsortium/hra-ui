import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { fireEvent, getByRole, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CellPopulationPredictionsComponent } from './cell-population-predictions.component';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

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
});
