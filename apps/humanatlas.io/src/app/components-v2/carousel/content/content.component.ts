import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { CarouselItem } from '../carousel.schema';

/**
 * Contains the content for a slide in the carousel component
 */
@Component({
  selector: 'hra-carousel-content',
  imports: [HraCommonModule, RouterModule, MatIconModule, ButtonsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  /** Item to display in the carousel */
  readonly item = input.required<CarouselItem>();

  /**
   * Returns the url or route from a carousel item
   * @param item Carousel item
   * @returns Url or route
   */
  getLink(item: CarouselItem): string {
    const link = item.link;
    return 'url' in link ? link.url : link.route;
  }

  /**
   * Gets link type from a carousel item
   * @param item Carousel item
   * @returns Link type (url or route)
   */
  getLinkType(item: CarouselItem): string {
    const link = item.link;
    return 'url' in link ? 'url' : 'route';
  }
}
