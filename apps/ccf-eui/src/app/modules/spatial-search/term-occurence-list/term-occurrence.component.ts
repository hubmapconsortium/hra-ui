import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

import { TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';

/**
 * Term occurrence list in spatial search UI
 */
@Component({
  selector: 'ccf-term-occurrence-list',
  templateUrl: './term-occurrence.component.html',
  styleUrls: ['./term-occurrence.component.scss'],
  imports: [
    MatIconModule,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    MicroTooltipDirective,
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
