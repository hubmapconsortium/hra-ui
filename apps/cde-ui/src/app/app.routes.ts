import { Routes } from '@angular/router';
import { getDefaultAssetsHref } from '@hra-ui/common';
import { VisualCard } from './components/visual-card/visual-card.component';
import { CreateVisualizationPageComponent } from './pages/create-visualization-page/create-visualization-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { VisualizationPageComponent } from './pages/visualization/visualization.component';
import {
  visualizationDataCanActivate,
  visualizationDataResolver,
} from './services/visualization-data-service/visualization-data.service';
import { exampleDataResolver } from './shared/resolvers/example-data/example-data.resolver';
import { jsonFileResolver } from './shared/resolvers/json-file/json-file.resolver';
import { organsResolver } from './shared/resolvers/organs/organs.resolver';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';

/** Landing page cards json file url */
const LANDING_PAGE_CARDS_URL = getDefaultAssetsHref() + 'assets/data/landing-page/cards.json';
/** Example data index json file url */
const EXAMPLE_DATA_INDEX_URL = getDefaultAssetsHref() + 'assets/data/examples/index.json';

/**
 * App routes
 */
export const ROUTES: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    data: {
      isLanding: true,
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Cell Distance Explorer' },
      ] satisfies BreadcrumbItem[],
    },
    resolve: {
      cards: jsonFileResolver<VisualCard[]>(LANDING_PAGE_CARDS_URL, { cache: true }),
    },
  },
  {
    path: 'create',
    component: CreateVisualizationPageComponent,
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Cell Distance Explorer', route: '/' },
        { name: 'Create Visualization' },
      ] satisfies BreadcrumbItem[],
    },
    resolve: {
      organs: organsResolver(),
    },
  },
  {
    path: 'example/:index',
    component: VisualizationPageComponent,
    data: {
      header: false,
    },
    resolve: {
      data: exampleDataResolver(EXAMPLE_DATA_INDEX_URL),
    },
  },
  {
    path: 'visualize',
    component: VisualizationPageComponent,
    canActivate: [visualizationDataCanActivate()],
    data: {
      isCustomVisualization: true,
      header: false,
    },
    resolve: {
      data: visualizationDataResolver(),
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
