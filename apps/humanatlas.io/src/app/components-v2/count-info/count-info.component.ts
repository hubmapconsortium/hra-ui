import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule } from 'ng-inline-svg-2';

const testCards: CardInfo[] = [
  {
    count: '17',
    label: 'consortia',
    link: { icon: 'diversity_3' },
  },
  {
    count: '250+',
    label: 'experts',
    link: { icon: 'school' },
  },
  {
    count: '1,000+',
    label: 'publications',
    link: { icon: 'docs' },
  },
  {
    count: '71',
    label: 'organs',
    link: { icon: 'neurology' },
  },
  {
    count: '4,694',
    label: 'anatomical structures',
    link: { icon: 'favorite' },
  },
  {
    count: '1,288',
    label: 'cell types',
    link: { iconSrc: 'assets/images/cell-types.svg' },
  },
  {
    count: '2,018',
    label: 'biomarkers',
    link: { icon: 'add_location' },
  },
  {
    count: '23',
    label: 'organ mapping antibody panels',
    link: { icon: 'map' },
  },
  {
    count: '22',
    label: 'functional tissue units',
    link: { icon: 'layers' },
  },
];

export interface CardInfo {
  label: string;
  count: string;
  link: { icon: string } | { iconSrc: string };
}

@Component({
  selector: 'hra-count-info',
  imports: [CommonModule, MatCardModule, InlineSVGModule, MatIconModule, AssetUrlPipe],
  templateUrl: './count-info.component.html',
  styleUrl: './count-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountInfoComponent {
  readonly countInfoList = input<CardInfo[]>(testCards);

  linkType(card: CardInfo): string {
    return 'icon' in card.link ? 'icon' : 'iconSrc';
  }

  getLink(card: CardInfo): string {
    return 'icon' in card.link ? card.link.icon : card.link.iconSrc;
  }
}
