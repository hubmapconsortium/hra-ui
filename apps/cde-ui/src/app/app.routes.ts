import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { assetUrl } from '@hra-ui/common/url';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { VisualCard } from './components/visual-card/visual-card.component';
import { CreateVisualizationPageComponent } from './pages/create-visualization-page/create-visualization-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { StudyPageComponent } from './pages/study-page/study-page.component';
import { VisualizationPageComponent } from './pages/visualization/visualization.component';
import { StudiesSchema } from './schemas/studies/studies.schema';
import {
  visualizationDataCanActivate,
  visualizationDataResolver,
} from './services/visualization-data-service/visualization-data.service';
import { createCrumbsResolver, CRUMBS_DATA_KEY } from './shared/resolvers/crumbs.resolver';
import {
  createExampleResolver,
  EXAMPLE_INDEX_PARAM,
  EXAMPLES_DATA_KEY,
  getExampleCrumbs,
} from './shared/resolvers/example.resolver';
import { jsonFileResolver } from './shared/resolvers/json-file/json-file.resolver';
import { organsResolver } from './shared/resolvers/organs.resolver';
import {
  createStudyDatasetVisualizationResolver,
  createStudyResolver,
  DATASET_ID_PARAM,
  getStudyCrumbs,
  getStudyDatasetCrumbs,
  STUDIES_DATA_KEY,
  STUDY_DATA_KEY,
  STUDY_ID_PARAM,
} from './shared/resolvers/study.resolver';

/** Landing page cards json file url token */
const LANDING_PAGE_CARDS_URL = new InjectionToken('LANDING_PAGE_CARDS_URL', {
  providedIn: 'root',
  factory: () => assetUrl('assets/data/landing-page/cards.json')(),
});

/** Example data index json file url token */
const EXAMPLE_DATA_INDEX_URL = new InjectionToken('EXAMPLE_DATA_INDEX_URL', {
  providedIn: 'root',
  factory: () => assetUrl('assets/data/examples/index.json')(),
});

/**
 * App routes
 */
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      [CRUMBS_DATA_KEY]: createCrumbsResolver(),
      cards: jsonFileResolver<VisualCard[]>(LANDING_PAGE_CARDS_URL, { cache: true }),
    },
  },
  {
    path: 'create',
    component: CreateVisualizationPageComponent,
    resolve: {
      [CRUMBS_DATA_KEY]: createCrumbsResolver([{ name: 'Create Visualization', route: '/create' }]),
      organs: organsResolver(),
    },
  },
  {
    path: 'gallery',
    resolve: {
      [CRUMBS_DATA_KEY]: createCrumbsResolver([{ name: 'Spatial Omics Gallery', route: '/gallery' }]),
      [STUDIES_DATA_KEY]: createYamlSpecResolver('assets/data/gallery/studies.yaml', StudiesSchema),
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContentPageComponent,
        resolve: {
          data: createYamlSpecResolver('assets/content/gallery/data.yaml', ContentPageDataSchema),
        },
      },
      {
        path: `:${STUDY_ID_PARAM}`,
        resolve: {
          [STUDY_DATA_KEY]: createStudyResolver(),
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudyPageComponent,
            resolve: {
              [CRUMBS_DATA_KEY]: createCrumbsResolver(getStudyCrumbs),
            },
          },
          {
            path: `:${DATASET_ID_PARAM}`,
            component: VisualizationPageComponent,
            resolve: {
              [CRUMBS_DATA_KEY]: createCrumbsResolver(getStudyDatasetCrumbs),
              data: createStudyDatasetVisualizationResolver(),
            },
          },
        ],
      },
    ],
  },
  {
    path: 'example',
    resolve: {
      [EXAMPLES_DATA_KEY]: jsonFileResolver<Record<string, unknown>[]>(EXAMPLE_DATA_INDEX_URL, { cache: true }),
    },
    children: [
      {
        path: `:${EXAMPLE_INDEX_PARAM}`,
        component: VisualizationPageComponent,
        resolve: {
          [CRUMBS_DATA_KEY]: createCrumbsResolver(getExampleCrumbs),
          data: createExampleResolver(),
        },
      },
    ],
  },
  {
    path: 'visualize',
    component: VisualizationPageComponent,
    canActivate: [visualizationDataCanActivate()],
    data: {
      isCustomVisualization: true,
    },
    resolve: {
      [CRUMBS_DATA_KEY]: createCrumbsResolver([{ name: 'Custom Visualization', route: '/visualize' }]),
      data: visualizationDataResolver(),
    },
  },

  // Error paths
  {
    path: '500',
    component: ServerErrorPageComponent,
    data: {
      isErrorPage: true,
    },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {
      isErrorPage: true,
    },
  },
];
