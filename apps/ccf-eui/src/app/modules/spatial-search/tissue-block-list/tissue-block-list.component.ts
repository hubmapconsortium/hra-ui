import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TissueBlock } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/**
 * Tissue block list in spatial search UI
 */
@Component({
  selector: 'ccf-tissue-block-list',
  templateUrl: './tissue-block-list.component.html',
  styleUrls: ['./tissue-block-list.component.scss'],
  imports: [
    MatIconModule,
    PlainTooltipDirective,
    ButtonsModule,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    MatExpansionModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueBlockListComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-tissue-block-list';

  /** Tissue blocks to be displayed */
  readonly tissueBlocks = input<TissueBlock[]>([]);

  /**
   * Holds title for section
   */
  readonly title = input.required<string>();

  /**
   * Text to be included in the tool tip
   */
  readonly toolTipText = input.required<string>();
}
