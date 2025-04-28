import { computed, ElementRef, Injectable, Signal, signal } from '@angular/core';

/** Page section instance */
export interface PageSection {
  /** Section label */
  tagline: Signal<string>;
  /** Section <hx> level */
  level: Signal<number>;
  /** Section anchor */
  anchor: Signal<string | undefined>;
  /** Section element */
  elementRef: Signal<ElementRef<Element>>;
}

/**
 * Helper for getting a page section's html element
 *
 * @param section A page section
 * @returns The section element
 */
export function getSectionElement(section: PageSection): Element {
  return section.elementRef().nativeElement;
}

/** Service that tracks all page sections on a page */
@Injectable()
export class PageSectionService {
  /** All sections (mutable signal) */
  private readonly _sections = signal<PageSection[]>([]);
  /** All sections */
  readonly sections = this._sections.asReadonly();
  /** All sections that have an anchor id */
  readonly linkableSections = computed(() => this.filterLinkableSections(this._sections()));
  /** All sections with an anchor id sorted in dom order */
  readonly sortedSections = computed(() => this.sortSectionsByDomPosition(this.linkableSections()));

  /**
   * Adds a section to be tracked
   *
   * @param section New section
   */
  addSection(section: PageSection): void {
    this._sections.update((sections) => [...sections, section]);
  }

  /**
   * Removes a section and stops tracking changes to it
   *
   * @param section Existing section
   */
  removeSection(section: PageSection): void {
    this._sections.update((sections) => sections.filter((s) => s !== section));
  }

  /**
   * Filters sections that have an anchor id
   *
   * @param sections All sections
   * @returns Sections with an anchor id
   */
  private filterLinkableSections(sections: PageSection[]): PageSection[] {
    return sections.filter((section) => section.anchor());
  }

  /**
   * Sorts sections by the order in the dom.
   *
   * @param sections Unsorted sections
   * @returns Sorted sections
   */
  private sortSectionsByDomPosition(sections: PageSection[]): PageSection[] {
    sections = [...sections];
    sections.sort((section1, section2) => {
      const el1 = getSectionElement(section1);
      const el2 = getSectionElement(section2);
      const position = el1.compareDocumentPosition(el2);
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    return sections;
  }
}
