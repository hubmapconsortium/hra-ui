import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { getSectionElement, PageSectionService } from './page-section.service';

interface ObservedElementsDiff {
  added: Element[];
  removed: Element[];
}

@Injectable()
export class PageSectionActivationService {
  private readonly sections = inject(PageSectionService).linkableSections;
  private readonly activeElement = signal<Element | undefined>(undefined);
  private readonly observer = new IntersectionObserver(this.handleIntersection.bind(this), {
    // TODO
  });
  private readonly observedElements = new Set<Element>();

  readonly activeSection = computed(() => {
    const element = this.activeElement();
    if (!element) {
      return undefined;
    }

    const sections = this.sections();
    return sections.find((s) => getSectionElement(s) === element);
  });

  constructor() {
    effect(() => {
      const elements = this.sections().map(getSectionElement);
      const diff = this.diffObservedElements(elements);
      this.applyObservedElementsDiff(diff);
    });
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.activeElement.set(entry.target);
        break; // ??
      }
    }
  }

  private diffObservedElements(elements: Element[]): ObservedElementsDiff {
    const observedElements = this.observedElements;
    const newElements = new Set(elements);
    const added: Element[] = [];
    const removed: Element[] = [];

    for (const el of newElements) {
      if (!observedElements.has(el)) {
        added.push(el);
      }
    }

    for (const el of observedElements) {
      if (!newElements.has(el)) {
        removed.push(el);
      }
    }

    return { added, removed };
  }

  private applyObservedElementsDiff(diff: ObservedElementsDiff): void {
    const { observer, observedElements } = this;
    const { added, removed } = diff;

    for (const el of removed) {
      observer.unobserve(el);
      observedElements.delete(el);
    }

    for (const el of added) {
      observer.observe(el);
      observedElements.add(el);
    }
  }
}
