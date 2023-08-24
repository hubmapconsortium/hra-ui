import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { selectSnapshot } from '@hra-ui/cdk/injectors';
import {
  BiomarkerDetailsWcComponent,
  HeaderBehaviorComponent,
  HraLandingPageIntroWcBehaviourComponent,
  TissueLibraryBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { ScreenModeSelectors } from '@hra-ui/state';

@Component({
  selector: 'hra-root',
  imports: [
    HeaderBehaviorComponent,
    TissueLibraryBehaviorComponent,
    HraLandingPageIntroWcBehaviourComponent,
    BiomarkerDetailsWcComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
  title = 'ftu-ui-small-wc';

  readonly isFullscreen = selectSnapshot(ScreenModeSelectors.isFullScreen);
}
