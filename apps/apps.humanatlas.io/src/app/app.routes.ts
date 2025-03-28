import { Route } from '@angular/router';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import { resolvePredictions } from './pages/us1/services/predictions.service';
import { WebComponentsComponent } from './pages/us6/web-components.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
  },
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
];
