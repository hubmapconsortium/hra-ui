import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DocsComponent } from './modules/docs/docs.component';
import { RootComponent } from './modules/root/root.component';

export const appRoutes: Route[] = [
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
