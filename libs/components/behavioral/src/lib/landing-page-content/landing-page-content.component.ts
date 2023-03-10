import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageInDepthComponent, LandingPageIntroComponent, MetricsComponent } from '@hra-ui/components/molecules';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { selectSnapshot } from '@hra-ui/cdk/injectors';

/** Component for LandingPageContent Behavior */
@Component({
  selector: 'ftu-landing-page-content',
  standalone: true,
  imports: [CommonModule, LandingPageIntroComponent, MetricsComponent, LandingPageInDepthComponent],
  templateUrl: './landing-page-content.component.html',
  styleUrls: ['./landing-page-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageContentComponent implements OnInit {
  private readonly markdown = selectSnapshot(ResourceRegistrySelectors.markdown)();
  introData = JSON.parse(this.markdown(0) as string);
  metrics = JSON.parse(this.markdown(1) as string);
  landingPageDepth = JSON.parse(this.markdown(2) as string);
  /** Function to explore FTU when moreClick event is emitted */
  exploreFTU(): void {
    //TODO
  }

  ngOnInit(): void {
    console.log(this.introData);
  }
}
