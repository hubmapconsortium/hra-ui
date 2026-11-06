import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { NavigationRailModule } from '@hra-ui/design-system/navigation-rail';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { TOOLBAR_CONTENT, ToolbarSheet } from './toolbar.content';

/**
 * Vertical toolbar with the visualization's app-wide actions: display options, resets, downloads,
 * the embedding guide, the About sheet and help links
 */
@Component({
  selector: 'cde-toolbar',
  imports: [
    HraCommonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    NavigationRailModule,
    PlainTooltipDirective,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  /** Whether the distance visualization shows cell links */
  readonly cellLinks = model(true);

  /** Whether the cell types table shows the cell link columns */
  readonly cellLinkData = model(true);

  /** Whether the metadata panel shows every field, including empty ones */
  readonly allMetadata = model(false);

  /** Whether the metadata has fields that only show with all metadata */
  readonly hasHiddenMetadata = input(false);

  /** Whether any cells were deleted from the distance visualization */
  readonly hasDeletedCells = input(false);

  /** Sheet that's open in the drawer, if any. The Downloads and Info items open their sheets */
  readonly openSheet = model<ToolbarSheet>();

  /** Emits when Reset view is clicked */
  readonly resetViewClick = output<void>();

  /** Emits when Restore deleted cells is clicked */
  readonly restoreDeletedCellsClick = output<void>();

  /** Emits when Reset colors is clicked */
  readonly resetColorsClick = output<void>();

  /** Text content */
  protected readonly content = TOOLBAR_CONTENT;
}
