import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { AboutComponent } from './pages/about/about.component';
import { CcfAsctbAzimuthComponent } from './pages/ccf-asctb-azimuth/ccf-asctb-azimuth.component';
import { CcfReporterPageComponent } from './pages/ccf-asctb-reporter-page/ccf-asctb-reporter-page.component';
import { CcfTablePageComponent } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.component';
import { CcfExplorationUserInterfaceComponent } from './pages/ccf-exploration-user-interface/ccf-exploration-user-interface.component';
import { CcfOntologyComponent } from './pages/ccf-ontology/ccf-ontology.component';
import { CcfOrganVrGalleryComponent } from './pages/ccf-organ-vr-gallery/ccf-organ-vr-gallery.component';
import { CellPopulationGraphsComponent } from './pages/cell-population-graphs/cell-population-graphs.component';
import { FourthReleaseNotesComponent } from './pages/fourth-release-notes/fourth-release-notes.component';
import { HraApiComponent } from './pages/hra-api/hra-api.component';
import { HraEditorialBoardComponent } from './pages/hra-editorial-board/hra-editorial-board.component';
import { HraMillitomeComponent } from './pages/hra-millitome/hra-millitome.component';
import { HraSopComponent } from './pages/hra-sop/hra-sop.component';
import { HraUsageMetricsComponent } from './pages/hra-usage-metrics/hra-usage-metrics.component';
import { KaggleTwentyoneComponent } from './pages/kaggle-twentyone/kaggle-twentyone.component';
import { KaggleTwoComponent } from './pages/kaggle-two/kaggle-two.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OmapFaqComponent } from './pages/omap-faq/omap-faq.component';
import { OmapsComponent } from './pages/omaps/omaps.component';
import { OverviewDataComponent } from './pages/overview-data/overview-data.component';
import { OverviewToolsComponent } from './pages/overview-tools/overview-tools.component';
import { OverviewTrainingOutreachComponent } from './pages/overview-training-outreach/overview-training-outreach.component';
import { RegistrationUserInterfaceComponent } from './pages/registration-user-interface/registration-user-interface.component';
import { ThreeDimRefPageComponent } from './pages/three-dim-ref-page/three-dim-ref-page.component';
import { TissueInfoPageComponent } from './pages/tissue-info-page/tissue-info-page.component';
import { TwoDimRefPageComponent } from './pages/two-dim-ref-page/two-dim-ref-page.component';
import { VccfComponent } from './pages/vccf/vccf.component';
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
    component: TwoDimRefPageComponent,
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
    component: ThreeDimRefPageComponent,
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
  {
    path: 'usage-metrics',
    component: PageComponent,
    data: {
      contentFile: 'hra-usage-metrics.content',
    },
    resolve: { content: ContentResolver },
  },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
