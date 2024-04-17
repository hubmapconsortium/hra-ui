import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { TissueTableInfo } from '../../components/tissue-info-table/tissue-info-table';
import { tissueData } from '../../pages/tissue-info-page/tissue-info-page.content';

/** Service for displaying correct tissue info page */
@Injectable({
  providedIn: 'root',
})
export class TissueInfoResolverService {
  /** Initializes the Router */
  constructor(private readonly router: Router) {}

  /** Redirects to the tissue info page if valid organ */
  resolve(route: ActivatedRouteSnapshot): Observable<TissueTableInfo> {
    const name = route.paramMap.get('organ')?.toLowerCase();
    const data = tissueData.find((data) => data.tissueName?.toLowerCase() === name);

    if (data) {
      return of(data);
    } else {
      this.router.navigateByUrl('/');
      return EMPTY;
    }
  }
}
