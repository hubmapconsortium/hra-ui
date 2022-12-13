import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';

@Component({
  selector: 'usage-metrics',
  templateUrl: './hra-usage-metrics.component.html',
  styleUrls: ['./hra-usage-metrics.component.scss']
})
export class HraUsageMetricsComponent {
  hraUsageHeading: PageHeaderItems[]
  hubmapMetricsData: PageDataItems[]
  trainingMaterials: PageDataItems[]
  


  constructor (private route: ActivatedRoute){
    const data = route.snapshot.data['hraUsageMetrics']
    this.hraUsageHeading = data.hraUsageHeading
    this.hubmapMetricsData = data.hubmapGteMetricsData
    this.trainingMaterials = data.trainingMaterials
    
  }
}