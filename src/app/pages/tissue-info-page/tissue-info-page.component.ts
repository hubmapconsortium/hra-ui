import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TissueTableInfo } from 'src/app/components/tissue-info-table/tissue-info-table';
import { descriptionData, tissueData } from './tissue-info-page.contents';

@Component({
  selector: 'ccf-tissue-info-page',
  templateUrl: './tissue-info-page.component.html',
  styleUrls: ['./tissue-info-page.component.scss']
})
export class TissueInfoPageComponent {
  descriptionData = descriptionData
  tissueData=tissueData

  readonly data: TissueTableInfo;

  constructor(route: ActivatedRoute) {
    this.data = route.snapshot.data['data'];
  }

  // Resolver service
  // constructor(private readonly router: Router) { }
  
  // resolve(route: ActivatedRouteSnapshot): TissueTableInfo | void {
  //   const organName = route.paramMap.get('organ')?.toLowerCase();
  //   const data = tissueData.find(data => data.tissueName?.toLowerCase() === organName);

  //   return data || void (this.router.navigateByUrl('/'))
  // }
}
