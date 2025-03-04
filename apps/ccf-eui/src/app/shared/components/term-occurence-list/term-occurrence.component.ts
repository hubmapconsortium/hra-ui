import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';

import { TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/**
 * Component for a dropdown menu
 */
@Component({
  selector: 'ccf-term-occurrence-list',
  templateUrl: './term-occurrence.component.html',
  styleUrls: ['./term-occurrence.component.scss'],
  imports: [
    MatTooltipModule,
    MatIconModule,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    ScrollingModule,
    ScrollOverflowFadeDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermOccurrenceListComponent {
  @HostBinding('class') readonly className = 'ccf-term-occurrence-list';

  /**
   * Array that contains the terms and their counts
   */
  readonly termList = input<TermResult[]>([]);

  /**
   * Holds title for section
   */
  readonly title = input.required<string>();

  /**
   * Text to be included in the tool tip
   */
  readonly toolTipText = input.required<string>();
}
