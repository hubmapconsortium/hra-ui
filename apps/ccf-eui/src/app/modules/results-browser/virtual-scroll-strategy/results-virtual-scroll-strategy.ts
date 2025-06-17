import { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { afterNextRender, inject, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { ListResult } from '../../../core/models/list-result';

/** Padding between items */
const ITEM_PADDING_HEIGHT = 8;
/** Inner padding for items*/
const ITEM_INNER_PADDING_HEIGHT = 4;
/** Default height for collapsed items*/
const COLLAPSED_ITEM_HEIGHT = 48;
/** Default height for expanded items */
const EXPANDED_ITEM_HEIGHT = 62;
/** Height for dataset items */
const DATASET_ITEM_HEIGHT = 58;
/** Number of datasets per row for height calculation */
const DATASETS_PER_ROW = 4;
/** Gap between dataset rows */
const DATASET_ROW_GAP = 16;
/** Height for section items */
const SECTION_ITEM_HEIGHT = 44;
/** Adjustment for approximate height calculations */
const APPROXIMATE_HEIGHT_ADJUSTMENT = 100;
/** Extra items to render above the viewport */
const EXTRA_ITEMS_ABOVE = 5;
/** Extra items to render below the viewport */
const EXTRA_ITEMS_BELOW = 20;

/**
 * Injectable virtual scroll strategy for results browser
 */
@Injectable()
export class ResultsVirtualScrollStrategy implements VirtualScrollStrategy {
  /** Scrolled index change Subject */
  private readonly scrolledIndexChange_ = new Subject<number>();
  /** Emits when the index of the first element visible in the viewport changes */
  readonly scrolledIndexChange = this.scrolledIndexChange_.asObservable();

  /** Injector */
  private readonly injector = inject(Injector);
  /** Viewport variable */
  private viewport_?: CdkVirtualScrollViewport;
  /** List items */
  private items: ListResult[] = [];
  /** Cache of item heights */
  private readonly cachedHeights = new Map<string, number>();
  /** Set of item ids that have not had heights set */
  private readonly pendingHeightItemIds = new Set<string>();

  /**
   * Attaches virtual scroll strategy to the viewport
   * @param viewport Virtual scroll viewport
   */
  attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport_ = viewport;
    this.onDataLengthChanged();
  }

  /**
   * Detaches virtual scroll strategy from the viewport
   */
  detach(): void {
    this.viewport_ = undefined;
    this.cachedHeights.clear();
  }

  /**
   * Updates rendered range on scroll
   */
  onContentScrolled(): void {
    if (this.viewport_) {
      this.updateRenderedRange();
    }
  }

  /**
   * When length of data changes, update the total content size and update rendered range
   */
  onDataLengthChanged(): void {
    const viewport = this.viewport_;
    if (viewport) {
      viewport.setTotalContentSize(this.getTotalHeight());
      this.updateRenderedRange();
    }
  }

  /**
   * Unused method, required by the VirtualScrollStrategy interface
   */
  onContentRendered(): void {
    /* no-op */
  }

  /**
   * Unused method, required by the VirtualScrollStrategy interface
   */
  onRenderedOffsetChanged(): void {
    /* no-op */
  }

  /**
   * Unused method, required by the VirtualScrollStrategy interface
   */
  scrollToIndex(): void {
    /* no-op */
  }

  /**
   * Sets items and updates the viewport size
   * @param items Items in list
   */
  setItems(items: ListResult[]): void {
    this.items = items;
    this.viewport_?.checkViewportSize();
  }

  /**
   * Calculates and returns item height
   * @param item List item
   * @returns item height
   */
  private getItemHeight(item: ListResult): number {
    if (!item.expanded) {
      return COLLAPSED_ITEM_HEIGHT + ITEM_PADDING_HEIGHT;
    }

    const id = item.tissueBlock['@id'];
    let height = this.cachedHeights.get(id);
    if (height === undefined) {
      height = this.approximateHeight(item) + ITEM_PADDING_HEIGHT;
      this.pendingHeightItemIds.add(id);
    }

    return height;
  }

  /**
   * Approximates height of an item based on its datasets and sections
   * @param item List item
   * @returns Approximate height of the item
   */
  private approximateHeight(item: ListResult): number {
    const numDatasets = item.tissueBlock.datasets?.length ?? 0;
    const numSections = item.tissueBlock.sections?.length ?? 0;
    let height = EXPANDED_ITEM_HEIGHT + APPROXIMATE_HEIGHT_ADJUSTMENT;

    if (numDatasets > 0) {
      const perDatasetHeight = DATASET_ITEM_HEIGHT + DATASET_ROW_GAP + ITEM_INNER_PADDING_HEIGHT;
      height += perDatasetHeight * Math.ceil(numDatasets / DATASETS_PER_ROW);
    }
    if (numSections > 0) {
      const perSectionHeight = SECTION_ITEM_HEIGHT + DATASET_ITEM_HEIGHT + ITEM_INNER_PADDING_HEIGHT;
      height += perSectionHeight * numSections;
    }
    return height;
  }

  /**
   * Calculate and return height of an item by its id
   * @param id Item id
   * @returns Bounding client rectangle height of the item or default collapsed height if not found
   */
  private getCalculatedHeight(id: string): number {
    const el = this.viewport_?.elementRef.nativeElement.querySelector(`[data-item-id="${id}"]`);
    return el?.getBoundingClientRect().height ?? COLLAPSED_ITEM_HEIGHT;
  }

  /**
   * Gets total height of all items in the list
   * @param items Optional list of items to calculate height for, defaults to the current items
   * @returns Total height of all items in pixels
   */
  private getTotalHeight(items: ListResult[] = this.items): number {
    return items.reduce((total, item) => total + this.getItemHeight(item), 0);
  }

  /**
   * Calculates the offset in pixels for a given index
   * @param index Index of the item
   * @returns Offset in pixels for the item at the given index
   */
  private getOffsetForIndex(index: number): number {
    return this.getTotalHeight(this.items.slice(0, index));
  }

  /**
   * Calculates the index of the item that corresponds to a given scroll offset
   * @param offset Scroll offset in pixels
   * @returns Index of the item at the given offset
   */
  private getIndexForOffset(offset: number): number {
    let currentOffset = 0;
    for (let index = 0; index < this.items.length; index++) {
      const itemHeight = this.getItemHeight(this.items[index]);
      if (currentOffset + itemHeight > offset) {
        return index;
      }
      currentOffset += itemHeight;
    }

    return 0;
  }

  /**
   * Calculates the number of items that fit in the viewport starting from a given index
   * @param startIndex Index to start counting from
   * @returns Number of items that fit in the viewport
   */
  private getItemsInViewport(startIndex: number): number {
    if (!this.viewport_) {
      return 0;
    }

    const viewportHeight = this.viewport_.getViewportSize();
    let currentHeight = 0;

    for (let index = startIndex; index < this.items.length; index++) {
      const itemHeight = this.getItemHeight(this.items[index]);
      currentHeight += itemHeight;
      if (currentHeight > viewportHeight) {
        return index - startIndex + 1;
      }
    }

    return 0;
  }

  /**
   * Updates the rendered range based on the current scroll position
   */
  private updateRenderedRange(): void {
    const viewport = this.viewport_;
    if (!viewport) {
      return;
    }

    const scrollOffset = viewport.measureScrollOffset();
    const scrollIndex = this.getIndexForOffset(scrollOffset);
    const length = viewport.getDataLength();
    const start = Math.max(0, scrollIndex - EXTRA_ITEMS_ABOVE);
    const end = Math.min(length, scrollIndex + this.getItemsInViewport(scrollIndex) + EXTRA_ITEMS_BELOW);

    viewport.setRenderedRange({ start, end });
    viewport.setRenderedContentOffset(this.getOffsetForIndex(start));
    this.scrolledIndexChange_.next(scrollIndex);
    afterNextRender({ read: () => this.updatePendingHeights() }, { injector: this.injector });
  }

  /**
   * Updates item heights that have not been calculated yet
   */
  private updatePendingHeights(): void {
    if (!this.viewport_ || this.pendingHeightItemIds.size === 0) {
      return;
    }

    for (const id of this.pendingHeightItemIds) {
      const height = this.getCalculatedHeight(id);
      this.cachedHeights.set(id, height + ITEM_PADDING_HEIGHT);
    }

    this.pendingHeightItemIds.clear();
    this.viewport_.setTotalContentSize(this.getTotalHeight());
  }
}
