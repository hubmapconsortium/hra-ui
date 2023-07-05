import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PageComponent,
  //   pathMatch: 'full',
  //   data: { contentFile: 'landing-page' },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'overview-data',
  //   component: PageComponent,
  //   data: { contentFile: 'overview-data' },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'asctb-tables',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'asctb-tables',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: '2d-ftu-illustrations',
  //   component: PageComponent,
  //   data: {
  //     contentFile: '2d-ftu-illustrations',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'overview-tools',
  //   component: PageComponent,
  //   data: { contentFile: 'overview-tools' },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'ccf-ontology',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'ccf-ontology',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'asctb-reporter',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'asctb-reporter',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'exploration-user-interface',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'exploration-user-interface',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'millitome',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'millitome',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'registration-user-interface',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'registration-user-interface',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'cell-population-graphs',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'cell-population-graphs',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'api',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'api',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'team',
  //   component: PageComponent,
  //   data: { contentFile: 'team' },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'overview-training-outreach',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'overview-training-outreach',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'omap',
  //   component: PageComponent,
  //   data: { contentFile: 'omap' },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: '3d-reference-library',
  //   component: PageComponent,
  //   data: {
  //     contentFile: '3d-reference-library',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'asctb-azimuth',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'asctb-azimuth',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // // {
  // //   path: 'usage-metrics',
  // //   component: PageComponent,
  // //   data: {
  // //     contentFile: 'hra-usage-metrics.content',
  // //   },
  // //   resolve: { content: ContentResolver },
  // // },
  // {
  //   path: 'ccf-tissue-info-page/:organ',
  //   component: TissueInfoPageComponent,
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'standard-operating-procedures',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'standard-operating-procedures',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'kaggle-one',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'kaggle-one',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'kaggle-two',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'kaggle-two',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'organ-gallery-in-vr',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'organ-gallery-in-vr',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'editorial-board',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'editorial-board',
  //   },
  //   resolve: { content: ContentResolver },
  // },
  // {
  //   path: 'faq/omap',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'omap-faq.content'
  //   },
  //   resolve: { content: ContentResolver }
  // },
  // {
  //   path: 'release-notes/v1.3', component: FourthReleaseNotesComponent,
  //   data: {
  //     contentFile: 'fourth-release-notes.content'
  //   },
  //   resolve: {
  //     content: ContentResolver
  //   }
  // },
  // {
  //   path: 'vccf', component: PageComponent,
  //   data: {
  //     contentFile: 'vccf'
  //   },
  //   resolve: { content: ContentResolver }
  // },
  // {
  //   path: 'release-notes/v1.4',
  //   component: PageComponent,
  //   data: {
  //     contentFile: 'fifth-release-notes.content'
  //   },
  //   resolve: { content: ContentResolver }
  // },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '**',
    // pathMatch: 'full',
    component: PageComponent,
    // data: { contentFile: 'landing-page' },
    // resolve: { content: ContentResolver },
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
