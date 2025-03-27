import { Route } from '@angular/router';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import { TissueOriginPredictorComponent } from './pages/us2/tissue-origin-predictor/tissue-origin-predictor.component';
import { resolvePredictions } from './pages/us1/services/predictions.service';
import { TissueOriginPredictionsComponent } from './pages/us2/tissue-origin-predictions/tissue-origin-predictions.component';
import { resolveTissueOriginPredictions } from './pages/us2/services/tissue-origin.service';
import { WebComponentsComponent } from './pages/us6/web-components.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: 'us6',
    component: WebComponentsComponent,
  },

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
    path: 'us2/result',
    component: TissueOriginPredictionsComponent,
    resolve: {
      predictions: resolveTissueOriginPredictions,
    },
  },
  {
    path: 'us2',
    component: TissueOriginPredictorComponent,
  },
];
