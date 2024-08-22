import { computed, Directive, input } from '@angular/core';

/** Input options for tree size */
export type TreeSize = 'small' | 'medium' | 'large';

const ICON_SIZES: Record<TreeSize, number> = {
  small: 1.25,
  medium: 1.5,
  large: 1.5,
};

const FONT_SIZES: Record<TreeSize, number> = {
  small: 0.75,
  medium: 0.875,
  large: 1,
};

const NODE_HEIGHTS: Record<TreeSize, number> = {
  small: 1.5,
  medium: 1.75,
  large: 2,
};

const PADDING: Record<TreeSize, number> = {
  small: 2,
  medium: 2.25,
  large: 2.5,
};

const NODE_PADDINGS: Record<TreeSize, number> = {
  small: 0.25,
  medium: 0.25,
  large: 0.5,
};

/**
 * Directive for trees
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
    '[style.--node-padding-left.rem]': 'nodePaddingLeft()',
  },
})
export class TreeSizeDirective {
  /** Size of tree to use */
  readonly size = input.required<TreeSize>({ alias: 'hraTreeSize' });

  /** Gets font size of tree in rem */
  protected readonly fontSize = computed(() => FONT_SIZES[this.size()]);

  protected readonly nodeHeight = computed(() => NODE_HEIGHTS[this.size()]);

  protected readonly iconSize = computed(() => ICON_SIZES[this.size()]);

  protected readonly padding = computed(() => PADDING[this.size()]);

  protected readonly nodePaddingLeft = computed(() => NODE_PADDINGS[this.size()]);
}
