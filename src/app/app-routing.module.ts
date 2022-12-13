import { CcfTablePageComponent } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewDataComponent } from './pages/overview-data/overview-data.component';
import { TwoDimRefPageComponent } from './pages/two-dim-ref-page/two-dim-ref-page.component';
import { CcfOntologyComponent } from './pages/ccf-ontology/ccf-ontology.component';
import { OverviewToolsComponent } from './pages/overview-tools/overview-tools.component';
import { CcfReporterPageComponent } from './pages/ccf-asctb-reporter-page/ccf-asctb-reporter-page.component';
import { CcfExplorationUserInterfaceComponent } from './pages/ccf-exploration-user-interface/ccf-exploration-user-interface.component';
import { HraMillitomeComponent } from './pages/hra-millitome/hra-millitome.component';
import { RegistrationUserInterfaceComponent } from './pages/registration-user-interface/registration-user-interface.component';
import { CellPopulationGraphsComponent } from './pages/cell-population-graphs/cell-population-graphs.component';
import { HraApiComponent } from './pages/hra-api/hra-api.component';
import { AboutComponent } from './pages/about/about.component';
import { OverviewTrainingOutreachComponent } from './pages/overview-training-outreach/overview-training-outreach.component';
import { TissueInfoPageComponent } from './pages/tissue-info-page/tissue-info-page.component';
import { TissueInfoResolverService } from './services/tissue-info/tissue-info-resolver.service';
import { HraSopComponent } from './pages/hra-sop/hra-sop.component';
import { OmapsComponent } from './pages/omaps/omaps.component';
import { ThreeDimRefPageComponent } from './pages/three-dim-ref-page/three-dim-ref-page.component';
import { CcfAsctbAzimuthComponent } from './pages/ccf-asctb-azimuth/ccf-asctb-azimuth.component';
import { HraUsageMetricsComponent } from './pages/hra-usage-metrics/hra-usage-metrics.component';
import { KaggleTwentyoneComponent } from './pages/kaggle-twentyone/kaggle-twentyone.component';
import { KaggleTwoComponent } from './pages/kaggle-two/kaggle-two.component';
import { HraEditorialBoardComponent } from './pages/hra-editorial-board/hra-editorial-board.component';
import { CcfOrganVrGalleryComponent } from './pages/ccf-organ-vr-gallery/ccf-organ-vr-gallery.component';
import { HraApiResolver } from './pages/hra-api/hra-api-resolver.service';
import { HraEditorialBoardResolver } from './pages/hra-editorial-board/hra-editorial-board-resolver.service';
import { HraMillitomeResolver } from './pages/hra-millitome/hra-millitome-resolver.service';
import { OverviewDataResolver } from './pages/overview-data/overview-data-resolver.service';
import { OmapFaqComponent } from './pages/omap-faq/omap-faq.component';
import { TwoDimensionResolver } from './pages/two-dim-ref-page/two-dim-resolver.service';
import { HraSopResolver } from './pages/hra-sop/hra-sop-resolver.service';
import { HraUsageMetricsResolver } from './pages/hra-usage-metrics/hra-usage-metrics-resolver.service';
import { LandingPageResolver } from './pages/landing-page/landing-page-resolver.service';
import { KaggleTwentyoneResolver } from './pages/kaggle-twentyone/kaggle-twentyone-resolver.service';
import { KaggleTwoResolver } from './pages/kaggle-two/kaggle-two-resolver.service';
import { OmapsResolver } from './pages/omaps/omaps-resolver.service';
import { OverviewDataResolver } from './pages/overview-data/overview-data-resolver.service';
import { OverviewToolsResolver } from './pages/overview-tools/overview-tools-resovler.service';
import { OverviewTrainingOutreachResolver } from './pages/overview-training-outreach/overview-training-outreach-resolver.service';
import { RegistrationUserInterfaceResolver } from './pages/registration-user-interface/registration-user-interface-resolver.service';
import { AboutResolver } from './pages/about/about-resolver.service';
import { CcfAsctbAzimuthResolver } from './pages/ccf-asctb-azimuth/ccf-asctb-azimuth-resolver.service';
import { CcfReporterPageResolver } from './pages/ccf-asctb-reporter-page/ccf-asctb-reporter-page-resolver.service';
import { CcfTablePageResolver } from './pages/ccf-asctb-table-page/ccf-asctb-table-page-resolver.service';
import { CcfExplorationUserInterfaceResolver } from './pages/ccf-exploration-user-interface/ccf-exploration-user-interace-resolver.service';
import { CcfOntologyResolver } from './pages/ccf-ontology/ccf-ontology-resolver.service';
import { CcfOrganVrGalleryResolver } from './pages/ccf-organ-vr-gallery/ccf-organ-vr-gallery-resolver.service';
import { CellPopulationGraphsResolver } from './pages/cell-population-graphs/cell-population-graphs-resolver.service';
import { TwoDimRefPageResolver } from './pages/two-dim-ref-page/two-dim-ref-page-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    data: { contentFile: 'landing-page.content' },
    resolve: { landingPage: LandingPageResolver },
  },
  {
    path: 'ccf-overview-data',
    component: OverviewDataComponent,
    data: { contentFile: 'overview-data.content' },
    resolve: {
      overViewData: OverviewDataResolver,
    },
  },
  {
    path: 'ccf-anatomical-structures',
    component: CcfTablePageComponent,
    data: {
      contentFile: 'ccf-anatomical-structures.content',
    },
    resolve: {
      ccfTablePage: CcfTablePageResolver,
    },
  },
  {
    path: 'ccf-2d-ftu',
    component: TwoDimRefPageComponent,
    data: {
      contentFile: 'ccf-2d-ftu.content',
    },
    resolve: {
      twoDimRefPage: TwoDimRefPageResolver,
    },
  },
  {
    path: 'ccf-overview-tools',
    component: OverviewToolsComponent,
    data: { contentFile: 'overview-tools.content' },
    resolve: {
      overviewTools: OverviewToolsResolver,
    },
  },
  {
    path: 'ccf-ontology',
    component: CcfOntologyComponent,
    data: {
      contentFile: 'ccf-ontology.content',
    },
    resolve: {
      ccfOntology: CcfOntologyResolver,
    },
  },
  {
    path: 'ccf-asctb-reporter',
    component: CcfReporterPageComponent,
    data: {
      contentFile: 'ccf-asctb-reporter.content',
    },
    resolve: {
      ccfReporterPage: CcfReporterPageResolver,
    },
  },
  {
    path: 'ccf-exploration-user-interface',
    component: CcfExplorationUserInterfaceComponent,
    data: {
      contentFile: 'ccf-exploration-user-interface.content',
    },
    resolve: {
      ccfExplorationUserInterface: CcfExplorationUserInterfaceResolver,
    },
  },
  {
    path: 'ccf-hra-millitome',
    component: HraMillitomeComponent,
    data: {
      contentFile: 'hra-millitome.content',
    },
    resolve: {
      hraMillitome: HraMillitomeResolver,
    },
  },
  {
    path: 'ccf-registration-user-interface',
    component: RegistrationUserInterfaceComponent,
    data: {
      contentFile: 'registrationUserInterface.content',
    },
    resolve: {
      registrationUserInterface: RegistrationUserInterfaceResolver,
    },
  },
  {
    path: 'ccf-cell-population-graphs',
    component: CellPopulationGraphsComponent,
    data: {
      contentFile: 'ccf-cell-population-graphs.content',
    },
    resolve: {
      cellPopulationGraphs: CellPopulationGraphsResolver,
    },
  },
  {
    path: 'ccf-hra-api',
    component: HraApiComponent,
    data: {
      contentFile: 'hra-api.content',
    },
    resolve: {
      hraInfo: HraApiResolver,
    },
  },
  {
    path: 'ccf-about',
    component: AboutComponent,
    data: { contentFile: 'about.content' },
    resolve: { about: AboutResolver },
  },
  {
    path: 'ccf-overview-training-outreach',
    component: OverviewTrainingOutreachComponent,
    data: {
      contentFile: 'overviewTrainingOutreach.content',
    },
    resolve: {
      overviewTrainingOutreach: OverviewTrainingOutreachResolver,
    },
  },
  {
    path: 'ccf-omaps',
    component: OmapsComponent,
    data: { contentFile: 'omaps.content' },
    resolve: { omaps: OmapsResolver },
  },
  { path: 'ccf-3d-reference-library', component: ThreeDimRefPageComponent },
  {
    path: 'ccf-asctb-azimuth',
    component: CcfAsctbAzimuthComponent,
    data: {
      contentFile: 'ccfAsctbAzimuth.content',
    },
    resolve: { ccfAsctbAzimuth: CcfAsctbAzimuthResolver },
  },
  {
    path: 'ccf-hra-usage-metrics',
    component: HraUsageMetricsComponent,
    data: {
      contentFile: 'hra-usage-metrics.content',
    },
    resolve: {
      hraUsageMetrics: HraUsageMetricsResolver,
    },
  },
  {
    path: 'ccf-tissue-info-page/:organ',
    component: TissueInfoPageComponent,
    resolve: {
      data: TissueInfoResolverService,
    },
  },
  {
    path: 'ccf-hra-sop',
    component: HraSopComponent,
    data: {
      contentFile: 'hra-sop.content',
    },
    resolve: {
      hraSop: HraSopResolver,
    },
  },
  {
    path: 'ccf-kaggle-twentyone',
    component: KaggleTwentyoneComponent,
    data: {
      contentFile: 'kaggle-twentyone.content',
    },
    resolve: {
      kaggleTwentyOne: KaggleTwentyoneResolver,
    },
  },
  {
    path: 'ccf-kaggle-two',
    component: KaggleTwoComponent,
    data: {
      contentFile: 'kaggle-two.content',
    },
    resolve: {
      kaggleTwo: KaggleTwoResolver,
    },
  },
  {
    path: 'ccf-organ-vr-gallery',
    component: CcfOrganVrGalleryComponent,
    data: {
      contentFile: 'ccf-organ-vr-gallery.content',
    },
    resolve: {
      ccfOrganVrGallery: CcfOrganVrGalleryResolver,
    },
  },
  {
    path: 'editorial-board',
    component: HraEditorialBoardComponent,
    data: {
      contentFile: 'hra-editorial-board.content',
    },
    resolve: {
      hraEditorialBoard: HraEditorialBoardResolver,
    },
  },
  { path: 'omap-faq', component: OmapFaqComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingPageComponent,
    data: { contentFile: 'landing-page.content' },
    resolve: { landingPage: LandingPageResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
