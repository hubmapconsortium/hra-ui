import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './modules/root/root.component';
import { DocsComponent } from './modules/docs/docs.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'vis',
    component: RootComponent,
  },
  {
    path: 'playground',
    component: RootComponent,
  },
  {
    path: 'vis/:sheet/:version/:playground',
    component: RootComponent,
  },
  {
    path: 'docs',
    component: DocsComponent,
  },
  {
    path: 'docs/:id',
    component: DocsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
