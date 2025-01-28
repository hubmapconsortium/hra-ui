import { Route } from '@angular/router';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import predictions from './data/predictions';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: 'us1/result',
    component: CellPopulationPredictionsComponent,
    data: { predictions: predictions },
  },
  {
    path: 'us1',
    component: CellPopulationPredictorComponent,
  },
];
