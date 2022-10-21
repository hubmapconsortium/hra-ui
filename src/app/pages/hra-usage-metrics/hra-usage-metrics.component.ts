import { Component } from '@angular/core';
import { hraUsageHeading, hubmapGteMetricsData, trainingMaterials } from './hra-usage-metrics.content';

@Component({
  selector: 'ccf-hra-usage-metrics',
  templateUrl: './hra-usage-metrics.component.html',
  styleUrls: ['./hra-usage-metrics.component.scss']
})
export class HraUsageMetricsComponent {
  hraUsageHeading = hraUsageHeading
  hubmapMetricsData = hubmapGteMetricsData
  trainingMaterials = trainingMaterials

}
