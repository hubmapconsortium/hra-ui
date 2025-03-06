import { Route } from '@angular/router';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import { TissueOriginPredictorComponent } from './pages/us2/tissue-origin-predictor/tissue-origin-predictor.component';
import { resolvePredictions } from './pages/us1/services/predictions.service';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: 'us1/result',
    component: CellPopulationPredictionsComponent,
    resolve: {
      predictions: resolvePredictions,
    },
  },
  {
    path: 'us1',
    component: CellPopulationPredictorComponent,
  },
  {
    path: 'us2',
    component: TissueOriginPredictorComponent,
  },
];
