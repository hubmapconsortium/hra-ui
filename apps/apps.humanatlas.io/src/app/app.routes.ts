import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { ApiComponent } from './pages/api/api.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CellPopulationPredictionsComponent } from './pages/us1/cell-population-predictions/cell-population-predictions.component';
import { CellPopulationPredictorComponent } from './pages/us1/cell-population-predictor/cell-population-predictor.component';
import { TissueOriginPredictionsComponent } from './pages/us2/tissue-origin-predictions/tissue-origin-predictions.component';
import { TissueOriginPredictorComponent } from './pages/us2/tissue-origin-predictor/tissue-origin-predictor.component';
import { WebComponentsComponent } from './pages/us6/web-components.component';
import { resolveInfo } from './resolvers/info.resolver';
import { createPredictionsResolver } from './resolvers/predictions.resolver';
import { serverIdResolver } from './resolvers/server-id/server-id-resolver.resolver';
import {
  CellPopulationPredictionData,
  HraPopPredictionsService,
  TissuePredictionData,
} from './services/hra-pop-predictions/hra-pop-predictions.service';
import { HraPopValidationComponent } from './pages/hra-pop-validation/hra-pop-validation.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    data: {
      crumbs: [{ name: 'Apps' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://docs.humanatlas.io/apps',
    },
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
    data: {
      crumbs: [{ name: 'Apps', route: '/' }, { name: 'User Story 1' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://humanatlas.io/user-story/1',
    },
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
    data: {
      crumbs: [{ name: 'Apps', route: '/' }, { name: 'User Story 2' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://humanatlas.io/user-story/2',
    },
  },
  {
    path: 'us6',
    component: WebComponentsComponent,
    data: {
      crumbs: [{ name: 'Apps', route: '/' }, { name: 'User Story 6' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://humanatlas.io/user-story/6',
    },
  },
  {
    path: 'hra-pop-validation',
    component: HraPopValidationComponent,
    data: {
      crumbs: [{ name: 'Apps', route: '/' }, { name: 'HRApop Validation' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://humanatlas.io/hra-pop-validation',
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
      helpUrl: 'https://humanatlas.io/api',
    },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '500',
    component: ServerErrorPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
