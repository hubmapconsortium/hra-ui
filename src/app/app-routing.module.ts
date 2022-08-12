import { CcfTablePageComponent } from './pages/ccf-table-page/ccf-table-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewDataComponent } from './pages/overview-data/overview-data.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'ccf-overview-data', component: OverviewDataComponent },
  { path: 'ccf-table-page', component: CcfTablePageComponent },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
