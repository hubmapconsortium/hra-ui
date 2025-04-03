import { Route } from '@angular/router';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import { resolvePredictions } from './pages/us1/services/predictions.service';
import { WebComponentsComponent } from './pages/us6/web-components.component';
import { ApiComponent } from './pages/api/api.component';
import { serverIdResolver } from './resolvers/server-id/server-id-resolver.resolver';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';

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
    path: 'api',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ApiComponent,
        data: {
          serverId: 'prod',
        },
      },
      {
        path: ':serverId',
        component: ApiComponent,
        resolve: {
          serverId: serverIdResolver,
        },
      },
    ],
    data: {
      crumbs: [{ name: 'Apps', route: '/' }, { name: 'API' }] satisfies BreadcrumbItem[],
    },
  },
];
