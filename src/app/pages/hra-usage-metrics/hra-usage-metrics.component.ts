import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';


@Component({
  selector: 'usage-metrics',
  templateUrl: './hra-usage-metrics.component.html',
  styleUrls: ['./hra-usage-metrics.component.scss']
})
export class HraUsageMetricsComponent {
  hraUsageHeading: PageHeaderItems[];
  hubmapMetricsData: PageDataItems[];
  trainingMaterials: PageDataItems[];
  gtexMetrics: PageDataItems[];
  softwareData: PageDataItems[];
  licenses: PageDataItems[];
  hraMetrics: PageDataItems[];

  constructor (route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.hraUsageHeading = data.hraUsageHeading;
    this.hubmapMetricsData = data.hubmapGteMetricsData;
    this.trainingMaterials = data.trainingMaterials;
    this.gtexMetrics = data.gtexMetrics;
    this.softwareData = data.softwareData;
    this.licenses = data.licenses;
  }
}
