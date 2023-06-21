import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { FourthReleaseNotesComponent } from './pages/fourth-release-notes/fourth-release-notes.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TissueInfoPageComponent } from './pages/tissue-info-page/tissue-info-page.component';
import { ContentResolver } from './services/content-resolver/conent-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    pathMatch: 'full',
    data: { contentFile: 'landing-page.content' },
    resolve: { content: ContentResolver },
  },
  {
    path: 'overview-data',
    component: PageComponent,
    data: { contentFile: 'overview-data.content' },
    resolve: { content: ContentResolver },
  },
  {
    path: 'asctb-tables',
    component: PageComponent,
    data: {
      contentFile: 'ccf-anatomical-structures.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: '2d-ftu-illustrations',
    component: PageComponent,
    data: {
      contentFile: 'ccf-2d-ftu.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'overview-tools',
    component: PageComponent,
    data: { contentFile: 'overview-tools.content' },
    resolve: { content: ContentResolver },
  },
  {
    path: 'ccf-ontology',
    component: PageComponent,
    data: {
      contentFile: 'ccf-ontology.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'asctb-reporter',
    component: PageComponent,
    data: {
      contentFile: 'ccf-asctb-reporter.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'exploration-user-interface',
    component: PageComponent,
    data: {
      contentFile: 'ccf-exploration-user-interface.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'hra-millitome',
    component: PageComponent,
    data: {
      contentFile: 'hra-millitome.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'registration-user-interface',
    component: PageComponent,
    data: {
      contentFile: 'registrationUserInterface.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'cell-population-graphs',
    component: PageComponent,
    data: {
      contentFile: 'ccf-cell-population-graphs.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'api',
    component: PageComponent,
    data: {
      contentFile: 'hra-api.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'team',
    component: PageComponent,
    data: { contentFile: 'about.content' },
    resolve: { content: ContentResolver },
  },
  {
    path: 'overview-training-outreach',
    component: PageComponent,
    data: {
      contentFile: 'overviewTrainingOutreach.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'omap',
    component: PageComponent,
    data: { contentFile: 'omaps.content' },
    resolve: { content: ContentResolver },
  },
  {
    path: '3d-reference-library',
    component: PageComponent,
    data: {
      contentFile: 'three-dim-ref-page.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'asctb-azimuth',
    component: PageComponent,
    data: {
      contentFile: 'ccfAsctbAzimuth.content',
    },
    resolve: { content: ContentResolver },
  },
  // {
  //   path: 'usage-metrics',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'hra-usage-metrics.content',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  {
    path: 'ccf-tissue-info-page/:organ',
    component: TissueInfoPageComponent,
    resolve: { content: ContentResolver },
  },
  {
    path: 'standard-operating-procedures',
    component: PageComponent,
    data: {
      contentFile: 'hra-sop.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'kaggle-one',
    component: PageComponent,
    data: {
      contentFile: 'kaggle-twentyone.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'kaggle-two',
    component: PageComponent,
    data: {
      contentFile: 'kaggle-two.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'hra-organ-gallery-in-vr',
    component: PageComponent,
    data: {
      contentFile: 'ccf-organ-vr-gallery.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'editorial-board',
    component: PageComponent,
    data: {
      contentFile: 'hra-editorial-board.content',
    },
    resolve: { content: ContentResolver },
  },
  {
    path: 'faq/omap',
    component: PageComponent,
    data: {
      contentFile: 'omap-faq.content'
    },
    resolve: { content: ContentResolver }
  },
  {
    path: 'release-notes/v1.3', component: FourthReleaseNotesComponent,
    data: {
      contentFile: 'fourth-release-notes.content'
    },
    resolve: {
      content: ContentResolver
    }
  },
  {
    path: 'vccf', component: PageComponent,
    data: {
      contentFile: 'vccf.content'
    },
    resolve: { content: ContentResolver }
  },
  {
    path: 'release-notes/v1.4',
    component: PageComponent,
    data: {
      contentFile: 'fifth-release-notes.content'
    },
    resolve: { content: ContentResolver }
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingPageComponent,
    data: { contentFile: 'landing-page.content' },
    resolve: { content: ContentResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
