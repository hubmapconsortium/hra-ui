import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import {
  LandingPageInDepthComponent,
  LandingPageIntroComponent,
  MetricItem,
  MetricsComponent,
} from '@hra-ui/components/molecules';
import { ResourceIds } from '@hra-ui/state';

/** Component for LandingPageContent Behavior */
@Component({
  selector: 'ftu-landing-page-content',
  standalone: true,
  imports: [CommonModule, LandingPageIntroComponent, MetricsComponent, LandingPageInDepthComponent],
  templateUrl: './landing-page-content.component.html',
  styleUrls: ['./landing-page-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageContentComponent {
  /** select snapshot for Landing Page title */
  landingPageIntroTitle = selectQuerySnapshot(ResourceRegistrySelectors.markdown, ResourceIds.LandingPageTitle);
  /** select snapshot for landing page intro description */
  landingPageIntroDescription = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageDescription
  );
  /** select snapshot for landing page intro partners */
  landingPageIntroPartners = selectQuerySnapshot(ResourceRegistrySelectors.markdown, ResourceIds.LandingPagePartners);
  /** select snapshot for landing page intro more text */
  landingPageIntroMoreText = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageIntroMoreText
  );
  /** select snapshot for landing page intro img */
  landingPageIntroImg = selectQuerySnapshot(ResourceRegistrySelectors.url, ResourceIds.LandingPageIntroImg);
  /** select snapshot for metrics */
  metrics = selectQuerySnapshot(ResourceRegistrySelectors.query, ResourceIds.Metrics);
  /** select snapshot for metrics title */
  metricsTitle = selectQuerySnapshot(ResourceRegistrySelectors.text, ResourceIds.MetricsTitle);
  /** select snapshot for metrics logo */
  metricsLogo = selectQuerySnapshot(ResourceRegistrySelectors.url, ResourceIds.MetricsLogo);
  /** select snapshot for landing page depth title */
  landingPageDepthTitle = selectQuerySnapshot(ResourceRegistrySelectors.markdown, ResourceIds.LandingPageDepthTitle);
  /** select snapshot for landing page depth description */
  landingPageDepthDescription = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageDepthDescription
  );
  /** select snapshot forlanding page depth more text */
  landingPageDepthMoreText = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageDepthMoreText
  );
  /** select snapshot for landing page depth img */
  landingPageDepthImg = selectQuerySnapshot(ResourceRegistrySelectors.url, ResourceIds.LandingPageDepthImg);

  get metricItems(): MetricItem[] {
    const items = this.metrics()?.['metrics'] ?? [];
    return items as MetricItem[];
  }

  /** Function to explore FTU when moreClick event is emitted */
  exploreFTU(): void {
    //TODO
  }
}
