import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CarouselItem } from '../carousel.schema';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

@Component({
  selector: 'hra-carousel-content',
  imports: [CommonModule, RouterModule, MatIconModule, ButtonsModule, AssetUrlPipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  readonly item = input.required<CarouselItem>();

  getLink(item: CarouselItem): string {
    const link = item.link;
    return 'url' in link ? link.url : link.route;
  }

  getLinkType(item: CarouselItem): string {
    const link = item.link;
    return 'url' in link ? 'url' : 'route';
  }
}
