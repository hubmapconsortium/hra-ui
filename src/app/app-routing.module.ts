import { CcfTablePageComponent } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewDataComponent } from './pages/overview-data/overview-data.component';
import { TwoDimRefPageComponent } from './pages/two-dim-ref-page/two-dim-ref-page.component';
import { CcfOntologyComponent } from './pages/ccf-ontology/ccf-ontology.component';
import { OverviewToolsComponent } from './pages/overview-tools/overview-tools.component';
import { CellPopulationGraphsComponent } from './pages/cell-population-graphs/cell-population-graphs.component';
import { HraApiComponent } from './pages/hra-api/hra-api.component';
import { AboutComponent } from './pages/about/about.component';
import { OverviewTrainingOutreachComponent } from './pages/overview-training-outreach/overview-training-outreach.component';
import { TissueInfoPageComponent } from './pages/tissue-info-page/tissue-info-page.component';
import { TissueInfoResolverService } from './services/tissue-info/tissue-info-resolver.service';
import { HraSopComponent } from './pages/hra-sop/hra-sop.component';
import { OmapsComponent } from './pages/omaps/omaps.component';
import { ThreeDimRefPageComponent } from './pages/three-dim-ref-page/three-dim-ref-page.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'ccf-overview-data', component: OverviewDataComponent },
  { path: 'ccf-anatomical-structures', component: CcfTablePageComponent },
  { path: 'ccf-2d-reference-library', component: TwoDimRefPageComponent },
  { path: 'ccf-overview-tools', component: OverviewToolsComponent },
  { path: 'ccf-ontology', component: CcfOntologyComponent },
  { path: 'ccf-cell-population-graphs', component: CellPopulationGraphsComponent },
  { path: 'ccf-hra-api', component: HraApiComponent },
  { path: 'ccf-about', component: AboutComponent },
  { path: 'ccf-overview-training-outreach', component: OverviewTrainingOutreachComponent },
  { path: 'ccf-omaps', component: OmapsComponent },
  { path: 'ccf-3d-reference-library', component: ThreeDimRefPageComponent },
  {
    path: 'ccf-tissue-info-page/:organ', component: TissueInfoPageComponent,
    resolve: {
      data: TissueInfoResolverService
    }
  },
  { path: 'ccf-hra-sop', component: HraSopComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
