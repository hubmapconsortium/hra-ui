import { CcfTablePageComponent } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewDataComponent } from './pages/overview-data/overview-data.component';
import { TwoDimRefPageComponent } from './pages/two-dim-ref-page/two-dim-ref-page.component';
import { CcfOntologyComponent } from './pages/ccf-ontology/ccf-ontology.component';
import { OverviewToolsComponent } from './pages/overview-tools/overview-tools.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'ccf-overview-data', component: OverviewDataComponent },
  { path: 'ccf-anatomical-structures', component: CcfTablePageComponent },
  { path: 'ccf-2d-reference-library', component: TwoDimRefPageComponent },
  { path: 'ccf-overview-tools', component: OverviewToolsComponent },
  { path: 'ccf-ontology', component: CcfOntologyComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
