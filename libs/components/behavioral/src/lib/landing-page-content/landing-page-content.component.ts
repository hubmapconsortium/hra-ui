import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageIntroComponent } from '@hra-ui/components/molecules';
import { LANDING_PAGE_CONTENT } from '../../resources/landing-page-content';

/** Component for LandingPageContent Behavior */
@Component({
  selector: 'ftu-landing-page-content',
  standalone: true,
  imports: [CommonModule, LandingPageIntroComponent],
  templateUrl: './landing-page-content.component.html',
  styleUrls: ['./landing-page-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageContentComponent {
  /** Introduction Data for landing-page-intro component */
  introData = LANDING_PAGE_CONTENT.introData;

  /** Function to explore FTU when moreClick event is emitted */
  exploreFTU(): void {
    //TODO
  }
}
