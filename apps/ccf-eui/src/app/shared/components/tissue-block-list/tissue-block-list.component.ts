import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TissueBlock } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
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
    MatTooltipModule,
    ButtonsModule,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    MatExpansionModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueBlockListComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-tissue-block-list';

  /** Tissue blocks to be displayed */
  readonly tissueBlocks = input<TissueBlock[]>([]);
}
