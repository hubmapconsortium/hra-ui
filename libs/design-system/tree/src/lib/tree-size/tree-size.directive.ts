import { computed, Directive, input } from '@angular/core';

/** Input options for each tree size */
export type TreeSize = 'small' | 'medium' | 'large';

/** Icon sizes for each tree size*/
const ICON_SIZES: Record<TreeSize, number> = {
  small: 1.25,
  medium: 1.5,
  large: 1.5,
};

/** Font sizes for each tree size */
const FONT_SIZES: Record<TreeSize, number> = {
  small: 0.75,
  medium: 0.875,
  large: 1,
};

/** Node heights for each tree size */
const NODE_HEIGHTS: Record<TreeSize, number> = {
  small: 1.5,
  medium: 1.75,
  large: 2,
};

/** Padding indents for each tree size */
const PADDING: Record<TreeSize, number> = {
  small: 2,
  medium: 2.25,
  large: 2.5,
};

/** Left padding on leaf nodes for each tree size */
const LEAF_PADDINGS: Record<TreeSize, number> = {
  small: 0.25,
  medium: 0.25,
  large: 0.5,
};

/**
 * Directive for hra tree component size
 */
@Directive({
  selector: '[hraTreeSize]',
  standalone: true,
  host: {
    '[style.--mat-tree-node-text-size.rem]': 'fontSize()',
    '[style.--mat-tree-node-min-height.rem]': 'nodeHeight()',
    '[style.--mdc-icon-button-state-layer-size.rem]': 'nodeHeight()',
    '[style.--mdc-icon-button-icon-size.rem]': 'iconSize()',
    '[style.--nest-padding.rem]': 'padding()',
    '[style.--leaf-padding-left.rem]': 'leafPaddingLeft()',
  },
})
export class TreeSizeDirective {
  /** Size of tree to use */
  readonly size = input.required<TreeSize>({ alias: 'hraTreeSize' });

  /** Gets font size of tree in rem */
  protected readonly iconSize = computed(() => ICON_SIZES[this.size()]);

  /** Gets font size of tree in rem */
  protected readonly fontSize = computed(() => FONT_SIZES[this.size()]);

  /** Node heights */
  protected readonly nodeHeight = computed(() => NODE_HEIGHTS[this.size()]);

  /** Padding indents */
  protected readonly padding = computed(() => PADDING[this.size()]);

  /** Left padding on leaf nodes */
  protected readonly leafPaddingLeft = computed(() => LEAF_PADDINGS[this.size()]);
}
