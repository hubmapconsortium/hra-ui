import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CcfAsctbAzimuthComponent } from './pages/ccf-asctb-azimuth/ccf-asctb-azimuth.component';
import { CcfReporterPageComponent } from './pages/ccf-asctb-reporter-page/ccf-asctb-reporter-page.component';
import { CcfTablePageComponent } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.component';
import { CcfExplorationUserInterfaceComponent } from './pages/ccf-exploration-user-interface/ccf-exploration-user-interface.component';
import { CcfOntologyComponent } from './pages/ccf-ontology/ccf-ontology.component';
import { CcfOrganVrGalleryComponent } from './pages/ccf-organ-vr-gallery/ccf-organ-vr-gallery.component';
import { CellPopulationGraphsComponent } from './pages/cell-population-graphs/cell-population-graphs.component';
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
import { ThreeDimRefPageResolver } from './pages/three-dim-ref-page/three-dim-ref-page-resolver.service';
import { ThreeDimRefPageComponent } from './pages/three-dim-ref-page/three-dim-ref-page.component';
import { TissueInfoPageComponent } from './pages/tissue-info-page/tissue-info-page.component';
import { TwoDimRefPageComponent } from './pages/two-dim-ref-page/two-dim-ref-page.component';
import { ContentResolver } from './services/content-resolver/conent-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    data: { contentFile: 'landing-page.content' },
    resolve: { landingPage: ContentResolver },
  },
  {
    path: 'overview-data',
    component: OverviewDataComponent,
    data: { contentFile: 'overview-data.content' },
    resolve: {
      overViewData: ContentResolver,
    },
  },
  {
    path: 'asctb-tables',
    component: CcfTablePageComponent,
    data: {
      contentFile: 'ccf-anatomical-structures.content',
    },
    resolve: {
      ccfTablePage: ContentResolver,
    },
  },
  {
    path: 'ccf-2d-ftu',
    component: TwoDimRefPageComponent,
    data: {
      contentFile: 'ccf-2d-ftu.content',
    },
    resolve: {
      twoDimRefPage: ContentResolver,
    },
  },
  {
    path: 'overview-tools',
    component: OverviewToolsComponent,
    data: { contentFile: 'overview-tools.content' },
    resolve: {
      overviewTools: ContentResolver,
    },
  },
  {
    path: 'ccf-ontology',
    component: CcfOntologyComponent,
    data: {
      contentFile: 'ccf-ontology.content',
    },
    resolve: {
      ccfOntology: ContentResolver,
    },
  },
  {
    path: 'asctb-reporter',
    component: CcfReporterPageComponent,
    data: {
      contentFile: 'ccf-asctb-reporter.content',
    },
    resolve: {
      ccfReporterPage: ContentResolver,
    },
  },
  {
    path: 'exploration-user-interface',
    component: CcfExplorationUserInterfaceComponent,
    data: {
      contentFile: 'ccf-exploration-user-interface.content',
    },
    resolve: {
      ccfExplorationUserInterface: ContentResolver,
    },
  },
  {
    path: 'hra-millitome',
    component: HraMillitomeComponent,
    data: {
      contentFile: 'hra-millitome.content',
    },
    resolve: {
      hraMillitome: ContentResolver,
    },
  },
  {
    path: 'registration-user-interface',
    component: RegistrationUserInterfaceComponent,
    data: {
      contentFile: 'registrationUserInterface.content',
    },
    resolve: {
      registrationUserInterface: ContentResolver,
    },
  },
  {
    path: 'cell-population-graphs',
    component: CellPopulationGraphsComponent,
    data: {
      contentFile: 'ccf-cell-population-graphs.content',
    },
    resolve: {
      cellPopulationGraphs: ContentResolver,
    },
  },
  {
    path: 'hra-api',
    component: HraApiComponent,
    data: {
      contentFile: 'hra-api.content',
    },
    resolve: {
      hraInfo: ContentResolver,
    },
  },
  {
    path: 'about-mc-iu',
    component: AboutComponent,
    data: { contentFile: 'about.content' },
    resolve: { about: ContentResolver },
  },
  {
    path: 'overview-training-outreach',
    component: OverviewTrainingOutreachComponent,
    data: {
      contentFile: 'overviewTrainingOutreach.content',
    },
    resolve: {
      overviewTrainingOutreach: ContentResolver,
    },
  },
  {
    path: 'omap',
    component: OmapsComponent,
    data: { contentFile: 'omaps.content' },
    resolve: { omaps: ContentResolver },
  },
  { path: '3d-reference-library', component: ThreeDimRefPageComponent,
  data:{
    contentFile: 'three-dim-ref-page.content'
  },
resolve:{
  threeDim: ThreeDimRefPageResolver
} },
  {
    path: 'asctb-azimuth',
    component: CcfAsctbAzimuthComponent,
    data: {
      contentFile: 'ccfAsctbAzimuth.content',
    },
    resolve: { ccfAsctbAzimuth: ContentResolver },
  },
  {
    path: 'usage-metrics',
    component: HraUsageMetricsComponent,
    data: {
      contentFile: 'hra-usage-metrics.content',
    },
    resolve: {
      hraUsageMetrics: ContentResolver,
    },
  },
  {
    path: 'ccf-tissue-info-page/:organ',
    component: TissueInfoPageComponent,
    resolve: {
      data: ContentResolver,
    },
  },
  {
    path: 'standard-operating-procedures',
    component: HraSopComponent,
    data: {
      contentFile: 'hra-sop.content',
    },
    resolve: {
      hraSop: ContentResolver,
    },
  },
  {
    path: 'kaggle-one',
    component: KaggleTwentyoneComponent,
    data: {
      contentFile: 'kaggle-twentyone.content',
    },
    resolve: {
      kaggleTwentyOne: ContentResolver,
    },
  },
  {
    path: 'kaggle-two',
    component: KaggleTwoComponent,
    data: {
      contentFile: 'kaggle-two.content',
    },
    resolve: {
      kaggleTwo: ContentResolver,
    },
  },
  {
    path: 'organ-vr-gallery',
    component: CcfOrganVrGalleryComponent,
    data: {
      contentFile: 'ccf-organ-vr-gallery.content',
    },
    resolve: {
      ccfOrganVrGallery: ContentResolver,
    },
  },
  {
    path: 'editorial-board',
    component: HraEditorialBoardComponent,
    data: {
      contentFile: 'hra-editorial-board.content',
    },
    resolve: {
      hraEditorialBoard: ContentResolver,
    },
  },
  { path: 'omap-faq', component: OmapFaqComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingPageComponent,
    data: { contentFile: 'landing-page.content' },
    resolve: { landingPage: ContentResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
