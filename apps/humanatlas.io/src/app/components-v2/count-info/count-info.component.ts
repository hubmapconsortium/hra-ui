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
    icon: 'diversity_3',
  },
  {
    count: '250+',
    label: 'experts',
    icon: 'school',
  },
  {
    count: '1,000+',
    label: 'publications',
    icon: 'docs',
  },
  {
    count: '71',
    label: 'organs',
    icon: 'neurology',
  },
  {
    count: '4,694',
    label: 'anatomical structures',
    icon: 'favorite',
  },
  {
    count: '1,288',
    label: 'cell types',
    iconSrc: 'assets/images/cell-types.svg',
  },
  {
    count: '2,018',
    label: 'biomarkers',
    icon: 'add_location',
  },
  {
    count: '23',
    label: 'organ mapping antibody panels',
    icon: 'map',
  },
  {
    count: '22',
    label: 'functional tissue units',
    icon: 'layers',
  },
];

export interface CardInfo {
  label: string;
  count: string;
  icon?: string;
  iconSrc?: string;
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
}
