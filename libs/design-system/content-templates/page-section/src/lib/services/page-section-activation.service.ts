import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { computed, effect, ElementRef, inject, Injectable, InjectionToken, ProviderToken, signal } from '@angular/core';
import { getSectionElement, PageSectionService } from './page-section.service';

export interface PageSectionActivationOptions {
  root?: string | ProviderToken<Element | ElementRef<Element>>;
  rootMargin?: string;
  threshold?: number | number[];
}

interface ObservedElementsDiff {
  added: Element[];
  removed: Element[];
}

export const PAGE_SECTION_ACTIVATION_OPTIONS = new InjectionToken<PageSectionActivationOptions>(
  'Page Section Activation Options',
);

const DEFAULT_ROOT_MARGIN = '0px 0px -80% 0px';

@Injectable()
export class PageSectionActivationService {
  private readonly options = inject(PAGE_SECTION_ACTIVATION_OPTIONS);
  private readonly sections = inject(PageSectionService).linkableSections;
  private readonly observedElements = new Set<Element>();
  private readonly activeElement = signal<Element | undefined>(undefined);
  private readonly observer = new IntersectionObserver(this.handleIntersection.bind(this), {
    root: this.resolveRootElement(),
    rootMargin: this.options.rootMargin ?? DEFAULT_ROOT_MARGIN,
    threshold: this.options.threshold,
  });

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

  private resolveRootElement(): Element | null | undefined {
    const { root } = this.options;
    if (typeof root === 'string') {
      const document = inject(DOCUMENT);
      return document.querySelector(root);
    } else if (root) {
      const el = inject(root, { optional: true });
      return coerceElement(el);
    }

    return undefined;
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.activeElement.set(entry.target);
        break;
      }
    }

    // TODO edge cases
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
