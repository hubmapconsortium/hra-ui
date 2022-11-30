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

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'ccf-overview-data', component: OverviewDataComponent },
  { path: 'ccf-anatomical-structures', component: CcfTablePageComponent },
  { path: 'ccf-2d-ftu', component: TwoDimRefPageComponent },
  { path: 'ccf-overview-tools', component: OverviewToolsComponent },
  { path: 'ccf-ontology', component: CcfOntologyComponent },
  { path: 'ccf-asctb-reporter', component: CcfReporterPageComponent },
  {
    path: 'ccf-exploration-user-interface',
    component: CcfExplorationUserInterfaceComponent,
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
  },
  {
    path: 'ccf-cell-population-graphs',
    component: CellPopulationGraphsComponent,
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
  { path: 'ccf-about', component: AboutComponent },
  {
    path: 'ccf-overview-training-outreach',
    component: OverviewTrainingOutreachComponent,
  },
  { path: 'ccf-omaps', component: OmapsComponent },
  { path: 'ccf-3d-reference-library', component: ThreeDimRefPageComponent },
  { path: 'ccf-asctb-azimuth', component: CcfAsctbAzimuthComponent },
  { path: 'ccf-hra-usage-metrics', component: HraUsageMetricsComponent },
  {
    path: 'ccf-tissue-info-page/:organ',
    component: TissueInfoPageComponent,
    resolve: {
      data: TissueInfoResolverService,
    },
  },
  { path: 'ccf-hra-sop', component: HraSopComponent },
  { path: 'ccf-kaggle-twentyone', component: KaggleTwentyoneComponent },
  { path: 'ccf-kaggle-two', component: KaggleTwoComponent },
  {
    path: 'ccf-hra-editorial-board',
    component: HraEditorialBoardComponent,
    data: {
      contentFile: 'hra-editorial-board.content',
    },
    resolve: {
      hraEditorialBoard: HraEditorialBoardResolver,
    },
  },
  { path: 'ccf-organ-vr-gallery', component: CcfOrganVrGalleryComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
