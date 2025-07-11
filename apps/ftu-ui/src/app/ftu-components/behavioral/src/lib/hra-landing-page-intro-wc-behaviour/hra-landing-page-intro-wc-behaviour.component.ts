import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HraLandingPageIntroWcComponent } from '@hra-ui/components/molecules';
import { ResourceRegistrySelectors as RRS } from '@hra-ui/cdk/state';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceIds as RIds } from '@hra-ui/state';

/** Component for LandingPage Intro Behaviour: Web component */
@Component({
  selector: 'ftu-wc-intro',
  imports: [CommonModule, HraLandingPageIntroWcComponent],
  templateUrl: './hra-landing-page-intro-wc-behaviour.component.html',
  styleUrls: ['./hra-landing-page-intro-wc-behaviour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraLandingPageIntroWcBehaviourComponent {
  /** select snapshot for Landing Page title */
  readonly landingPageIntroTitle = selectQuerySnapshot(RRS.anyText, RIds.LandingPageTitle);
  /** select snapshot for landing page intro description */
  readonly landingPageIntroDescription = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDescription);
  /** select snapshot for landing page intro partners */
  readonly landingPageIntroReadMore = selectQuerySnapshot(RRS.markdown, RIds.LandingPageIntroReadMore);
  /** select snapshot for landing page intro partners */
  readonly landingPageIntroPartners = selectQuerySnapshot(RRS.markdown, RIds.LandingPagePartners);
}
