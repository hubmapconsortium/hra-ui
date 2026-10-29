import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { NavigationRailModule } from '@hra-ui/design-system/navigation-rail';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { PANEL_IDS, PanelId } from '../../models/panels';
import { ThemePreference } from '../../services/theme-switch/theme-switch.service';
import { TOOLBAR_CONTENT, ToolbarSheet } from './toolbar.content';

/** Counter to keep track of distinct instances */
let idCounter = 0;

/**
 * Vertical toolbar with the visualization's app-wide actions: panels, display options, resets, downloads,
 * the embedding guide, the theme menu, the About sheet and help links
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
  /** Panels hidden from the Panels menu */
  readonly hiddenPanels = model<PanelId[]>([]);

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

  /** Whether the toolbar shows the Theme menu */
  readonly showThemeMenu = input(false);

  /** Theme menu choice */
  readonly themePreference = model<ThemePreference>('system');

  /** Emits when Reset view is clicked */
  readonly resetViewClick = output<void>();

  /** Emits when Restore deleted cells is clicked */
  readonly restoreDeletedCellsClick = output<void>();

  /** Emits when Reset colors is clicked */
  readonly resetColorsClick = output<void>();

  /** Emits when Reset everything is clicked */
  readonly resetEverythingClick = output<void>();

  /** Text content */
  protected readonly content = TOOLBAR_CONTENT;

  /** Prefix of the ids that tie menu items to their labels and supporting text */
  protected readonly idPrefix = `cde-toolbar-${idCounter++}`;

  /** Shows or hides a panel */
  protected togglePanel(id: PanelId): void {
    const hidden = this.hiddenPanels();
    this.hiddenPanels.set(
      hidden.includes(id)
        ? hidden.filter((panel) => panel !== id)
        : PANEL_IDS.filter((panel) => panel === id || hidden.includes(panel)),
    );
  }

  /** Icon of the Theme item, showing the current choice */
  protected readonly themeIcon = computed(
    () => this.content.theme.options.find((option) => option.id === this.themePreference())?.icon ?? 'brightness_4',
  );
}
