import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageInDepthComponent, LandingPageIntroComponent, MetricsComponent } from '@hra-ui/components/molecules';
import { ResourceRegistryActions, ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
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
  loadYaml = dispatch(ResourceRegistryActions.LoadFromYaml);
  landingPageIntroTitle = selectQuerySnapshot(ResourceRegistrySelectors.markdown, ResourceIds.LandingPageTitle);
  landingPageIntroDescription = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageDescription
  );
  landingPageIntroPartners = selectQuerySnapshot(ResourceRegistrySelectors.markdown, ResourceIds.LandingPagePartners);
  landingPageIntroMoreText = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageIntroMoreText
  );
  landingPageIntroImg = selectQuerySnapshot(ResourceRegistrySelectors.url, ResourceIds.LandingPageIntroImg);
  metricsTitle = selectQuerySnapshot(ResourceRegistrySelectors.text, ResourceIds.MetricsTitle);
  metricsLogo = selectQuerySnapshot(ResourceRegistrySelectors.url, ResourceIds.MetricsLogo);
  landingPageDepthTitle = selectQuerySnapshot(ResourceRegistrySelectors.markdown, ResourceIds.LandingPageDepthTitle);
  landingPageDepthDescription = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageDepthDescription
  );
  landingPageDepthMoreText = selectQuerySnapshot(
    ResourceRegistrySelectors.markdown,
    ResourceIds.LandingPageDepthMoreText
  );
  landingPageDepthImg = selectQuerySnapshot(ResourceRegistrySelectors.url, ResourceIds.LandingPageDepthImg);
  /** Function to explore FTU when moreClick event is emitted */
  exploreFTU(): void {
    //TODO
  }

  constructor() {
    this.loadYaml('assets/landing-page-content.yml');
  }
}
