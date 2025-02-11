import { render } from '@testing-library/angular';
import { CellPopulationPredictionsComponent } from './cell-population-predictions.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CellPopulationPredictionsComponent', () => {
  it('TODO', async () => {
    await render(CellPopulationPredictionsComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    //
  });
});
