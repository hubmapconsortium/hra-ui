import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

interface HraUsageMetrics {
  hraUsageHeading: PageHeaderItems[];
  hubmapMetricsData: PageDataItems[];
  trainingMaterials: PageDataItems[];
  gtexMetrics: PageDataItems[];
  softwareData: PageDataItems[];
  licenses: PageDataItems[];
  hraMetrics: PageDataItems[];
}

@Component({
  selector: 'usage-metrics',
  templateUrl: './hra-usage-metrics.component.html',
  styleUrls: ['./hra-usage-metrics.component.scss']
})
export class HraUsageMetricsComponent {
  constructor (private readonly route: ActivatedRoute) {}
  
  data = this.route.snapshot.data['content'] as HraUsageMetrics;
  hraUsageHeading = this.data.hraUsageHeading;
  hubmapMetricsData = this.data.hubmapMetricsData;
  trainingMaterials = this.data.trainingMaterials;
  gtexMetrics = this.data.gtexMetrics;
  softwareData = this.data.softwareData;
  licenses = this.data.licenses;
}
