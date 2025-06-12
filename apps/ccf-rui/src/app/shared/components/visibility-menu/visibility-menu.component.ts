import { CdkScrollable, ConnectedPosition, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { OpacitySliderModule } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VisibilityItem } from '../../../core/models/visibility-item';

/** Slider overlay position */
const SLIDER_OVERLAY_POSITION: ConnectedPosition[] = [
  {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8,
  },
];

/**
 * Menu for displaying visibility options
 */
@Component({
  selector: 'ccf-visibility-menu',
  imports: [CommonModule, MatIconModule, MatRippleModule, OverlayModule, OpacitySliderModule, PlainTooltipDirective],
  templateUrl: './visibility-menu.component.html',
  styleUrls: ['./visibility-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [CdkScrollable],
})
export class VisibilityMenuComponent {
  /**
   * Items to be displayed in the visibility menu
   */
  readonly items = model.required<VisibilityItem[]>();

  /**
   * The currently selected item
   */
  readonly selection = model<VisibilityItem | undefined>(undefined);

  /** Overlay service */
  protected readonly overlay = inject(Overlay);
  /** Overlay position */
  protected readonly overlayPosition = SLIDER_OVERLAY_POSITION;

  /** Analytics */
  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * Toggles visibility of an item; opacity is reverted to the previous value if visibility toggled back on
   *
   * @param item Menu item
   */
  toggleVisibility(item: VisibilityItem): void {
    const selection = this.selection();
    item = { ...item, visible: !item.visible };
    if (selection && item.id === selection.id) {
      this.selection.set(item);
    }

    this.ga.event('visibility_toggled', 'visibility_menu', '' + item.id, +item.visible);
    this.updateOpacity(item.opacity);
  }

  /**
   * Updates opacity of the currently selected item (if one is selected) and emits the new items
   *
   * @param value Updated opacity value
   */
  updateOpacity(value: number | undefined): void {
    const selection = this.selection();
    if (!selection) {
      return;
    }
    const updatedSelection = { ...selection, opacity: value, visible: value ? value > 0 : false };
    this.selection.set(updatedSelection);
    if (updatedSelection.id === 'all') {
      this.setAllOpacity(updatedSelection.opacity as number);
    } else {
      this.items.update((items) => items.map((item) => (item.id === updatedSelection.id ? updatedSelection : item)));
      this.ga.event('opacity_update', 'visibility_menu', '' + updatedSelection.id, updatedSelection.opacity);
    }
  }

  /**
   * Resets item to opacity 20 and visible
   */
  resetItem(): void {
    const selection = this.selection();
    if (selection) {
      const updatedSelection = { ...selection, opacity: 20, visible: true };
      this.selection.set(updatedSelection);
      if (selection.id === 'all') {
        this.setAllOpacity(updatedSelection.opacity);
      } else {
        this.items.update((items) => items.map((item) => (item.id === updatedSelection.id ? updatedSelection : item)));
        this.ga.event('item_reset', 'visibility_menu', '' + updatedSelection.id);
      }
    }
  }

  /**
   * Sets all items to the same opacity and makes them visible
   *
   * @param value Updated opacity value
   */
  setAllOpacity(value: number): void {
    this.items.update((items) => items.map((i) => ({ ...i, opacity: value, visible: true })));
    this.ga.event('all_items_opacity_update', 'visibility_menu', undefined, value);
  }
}
