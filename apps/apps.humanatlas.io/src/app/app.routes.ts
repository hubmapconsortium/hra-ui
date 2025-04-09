import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { TissueOriginPredictionsComponent } from './pages/us2/tissue-origin-predictions/tissue-origin-predictions.component';
import { TissueOriginPredictorComponent } from './pages/us2/tissue-origin-predictor/tissue-origin-predictor.component';
import { WebComponentsComponent } from './pages/us6/web-components.component';
import { resolveInfo } from './resolvers/info.resolver';
import { createPredictionsResolver } from './resolvers/predictions.resolver';
import {
  CellPopulationPredictionData,
  HraPopPredictionsService,
  TissuePredictionData,
} from './services/hra-pop-predictions/hra-pop-predictions.service';
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
    path: 'us1',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CellPopulationPredictorComponent,
      },
      {
        path: 'result',
        component: CellPopulationPredictionsComponent,
        resolve: {
          data: resolveInfo<CellPopulationPredictionData>,
          predictions: createPredictionsResolver('/us1', (data: CellPopulationPredictionData) =>
            inject(HraPopPredictionsService).getCellPopulationPredictions(data),
          ),
        },
      },
    ],
  },
  {
    path: 'us2',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TissueOriginPredictorComponent,
      },
      {
        path: 'result',
        component: TissueOriginPredictionsComponent,
        resolve: {
          data: resolveInfo<TissuePredictionData>,
          predictions: createPredictionsResolver('/us2', (data: TissuePredictionData) =>
            inject(HraPopPredictionsService).getTissuePredictions(data),
          ),
        },
      },
    ],
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
