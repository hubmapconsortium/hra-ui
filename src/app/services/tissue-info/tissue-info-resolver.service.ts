import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { TissueTableInfo } from '../../components/tissue-info-table/tissue-info-table';
import { tissueData } from '../../pages/tissue-info-page/tissue-info-page.content';

@Injectable({
  providedIn: 'root'
})
export class TissueInfoResolverService implements Resolve<TissueTableInfo> {

  constructor(private readonly router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<TissueTableInfo> {
    const name = route.paramMap.get('organ')?.toLowerCase();
    const data = tissueData.find(data => data.tissueName?.toLowerCase() === name);

    if (data) {
      return of(data);
    } else {
      this.router.navigateByUrl('/');
      return EMPTY;
    }
  }
}
