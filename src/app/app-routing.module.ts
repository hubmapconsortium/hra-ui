import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  {
    path: '**',
    component: PageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
