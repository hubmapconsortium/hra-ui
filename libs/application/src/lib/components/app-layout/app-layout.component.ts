import { ChangeDetectionStrategy, Component, effect, input, model } from '@angular/core';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { ContentPageData, ContentPageComponent } from '@hra-ui/design-system/content-templates/content-page';
import { HraCommonModule } from '@hra-ui/common';

@Component({
  selector: 'hra-app-layout',
  imports: [HraCommonModule, NavigationModule, ContentPageComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  readonly data = input.required<ContentPageData>();

  readonly showFooter = model<boolean>(true);
  readonly showNavigation = model<boolean>(true);
  readonly showToc = model<boolean>(true);

  constructor() {
    effect(() => {
      if (this.showFooter() === undefined) {
        this.showFooter.set(true);
      }
      if (this.showNavigation() === undefined) {
        this.showNavigation.set(true);
      }
      if (this.showToc() === undefined) {
        this.showToc.set(true);
      }
    });
  }
}
