import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { assetUrl } from '@hra-ui/common/url';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { VisualCard } from './components/visual-card/visual-card.component';
import { CreateVisualizationPageComponent } from './pages/create-visualization-page/create-visualization-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { StudyPageComponent } from './pages/study-page/study-page.component';
import { VisualizationPageComponent } from './pages/visualization/visualization.component';
import { StudyDataSchema } from './schemas/study.schema';
import {
  visualizationDataCanActivate,
  visualizationDataResolver,
} from './services/visualization-data-service/visualization-data.service';
import { exampleDataResolver } from './shared/resolvers/example-data/example-data.resolver';
import { jsonFileResolver } from './shared/resolvers/json-file/json-file.resolver';
import { organsResolver } from './shared/resolvers/organs/organs.resolver';
import { studyDatasetResolver } from './shared/resolvers/study-dataset/study-dataset.resolver';

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
    path: 'gallery',
    component: ContentPageComponent,
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Cell Distance Explorer', route: '/' },
        { name: 'Gallery' },
      ] satisfies BreadcrumbItem[],
    },
    resolve: {
      data: createYamlSpecResolver('assets/content/gallery/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'example/:index',
    component: VisualizationPageComponent,
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Cell Distance Explorer', route: '/' },
      ] satisfies BreadcrumbItem[],
    },
    resolve: {
      data: exampleDataResolver(EXAMPLE_DATA_INDEX_URL),
    },
  },
  {
    path: 'gallery/:studyName',
    resolve: {
      galleryData: createYamlSpecResolver('assets/data/gallery/data.yaml', StudyDataSchema),
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: StudyPageComponent,
      },
      {
        path: ':datasetId',
        component: VisualizationPageComponent,
        resolve: {
          data: studyDatasetResolver(),
        },
      },
    ],
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Cell Distance Explorer', route: '/' },
        { name: 'Spatial Omics Gallery' },
      ] satisfies BreadcrumbItem[],
    },
  },
  {
    path: 'visualize',
    component: VisualizationPageComponent,
    canActivate: [visualizationDataCanActivate()],
    data: {
      isCustomVisualization: true,
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Cell Distance Explorer', route: '/' },
      ] satisfies BreadcrumbItem[],
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
