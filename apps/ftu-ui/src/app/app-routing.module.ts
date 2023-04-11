import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Route, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FtuPageComponent } from './pages/ftu-page/ftu-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@Injectable({
  providedIn: 'root',
})
export class FtuResolver implements Resolve<unknown> {
  resolve(route: ActivatedRouteSnapshot): Observable<unknown> {
    const id = route.queryParamMap.get('id');
    const uberon = route.queryParamMap.get('uberon');

    if (!id || !uberon) {
      return of({ error: 'Missing required params' });
    }

    return of({ id, uberon });
  }
}

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingPageComponent,
  },
  {
    path: 'ftu',
    resolve: {
      ftuData: FtuResolver,
    },
    loadComponent: () => FtuPageComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
