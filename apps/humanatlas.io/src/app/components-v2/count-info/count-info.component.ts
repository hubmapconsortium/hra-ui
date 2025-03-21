import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { InlineSVGModule } from 'ng-inline-svg-2';

/** Test cards (will replace) */
const testCards: CardInfo[] = [
  {
    count: '17',
    label: 'consortia',
    icon: { matIcon: 'diversity_3' },
  },
  {
    count: '250+',
    label: 'experts',
    icon: { matIcon: 'school' },
  },
  {
    count: '1,000+',
    label: 'publications',
    icon: { matIcon: 'docs' },
  },
  {
    count: '71',
    label: 'organs',
    icon: { matIcon: 'neurology' },
  },
  {
    count: '4,694',
    label: 'anatomical structures',
    icon: { matIcon: 'favorite' },
  },
  {
    count: '1,288',
    label: 'cell types',
    icon: { url: 'assets/images/cell-types.svg' },
  },
  {
    count: '2,018',
    label: 'biomarkers',
    icon: { matIcon: 'add_location' },
  },
  {
    count: '23',
    label: 'organ mapping antibody panels',
    icon: { matIcon: 'map' },
  },
  {
    count: '22',
    label: 'functional tissue units',
    icon: { matIcon: 'layers' },
  },
];

/**
 * Card info data containing metric name, count, and icon info
 */
export interface CardInfo {
  /** Metric name */
  label: string;
  /** Count for metric */
  count: string;
  /** Returns mat icon name or icon asset url */
  icon: { matIcon: string } | { url: string };
}

/**
 * Displays metrics for the human reference atlas
 */
@Component({
  selector: 'hra-count-info',
  imports: [CommonModule, MatCardModule, InlineSVGModule, MatIconModule, AssetUrlPipe],
  templateUrl: './count-info.component.html',
  styleUrl: './count-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountInfoComponent {
  /** List of card info to display */
  readonly countInfoList = input<CardInfo[]>(testCards);

  /**
   * Gives icon type in card
   * @param card Card info
   * @returns Icon type
   */
  iconType(card: CardInfo): string {
    return 'matIcon' in card.icon ? 'matIcon' : 'url';
  }

  /**
   * Gets icon from card
   * @param card Card info
   * @returns Icon as material icon name or icon url
   */
  getIcon(card: CardInfo): string {
    return 'matIcon' in card.icon ? card.icon.matIcon : card.icon.url;
  }
}
