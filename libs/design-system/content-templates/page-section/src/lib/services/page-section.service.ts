import { computed, ElementRef, Injectable, Signal, signal } from '@angular/core';

export interface PageSection {
  tagline: Signal<string>;
  level: Signal<number>;
  anchor: Signal<string | undefined>;
  elementRef: Signal<ElementRef<Element>>;
}

export function getSectionElement(section: PageSection): Element {
  return section.elementRef().nativeElement;
}

@Injectable()
export class PageSectionService {
  private readonly _sections = signal<PageSection[]>([]);
  readonly sections = this._sections.asReadonly();
  readonly linkableSections = computed(() => this.filterLinkableSections(this._sections()));
  readonly sortedSections = computed(() => this.sortSectionsByDomPosition([...this.linkableSections()]));

  addSection(section: PageSection): void {
    this._sections.update((sections) => [...sections, section]);
  }

  removeSection(section: PageSection): void {
    this._sections.update((sections) => sections.filter((s) => s !== section));
  }

  private filterLinkableSections(sections: PageSection[]): PageSection[] {
    return sections.filter((section) => section.anchor());
  }

  private sortSectionsByDomPosition(sections: PageSection[]): PageSection[] {
    sections.sort((section1, section2) => {
      const el1 = getSectionElement(section1);
      const el2 = getSectionElement(section2);
      const position = el1.compareDocumentPosition(el2);
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    return sections;
  }
}
