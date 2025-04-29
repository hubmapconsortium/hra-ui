import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { computed, effect, ElementRef, inject, Injectable, InjectionToken, ProviderToken, signal } from '@angular/core';
import { getSectionElement, PageSectionService } from './page-section.service';

/** Options to customize the PageSectionActivationService */
export interface PageSectionActivationOptions {
  /** Root element either as a css selector or a provider token */
  root?: string | ProviderToken<Element | ElementRef<Element>>;
  /** Root margin used when creating an IntersectionObserver */
  rootMargin?: string;
  /** Threshold used when creating an IntersectionObserver */
  threshold?: number | number[];
}

/** Result of diffing currently observed elements with a new set */
interface ObservedElementsDiff {
  /** Added elements */
  added: Element[];
  /** Removed elements */
  removed: Element[];
}

/** Token used to provide service options */
export const PAGE_SECTION_ACTIVATION_OPTIONS = new InjectionToken<PageSectionActivationOptions>(
  'Page Section Activation Options',
);

/** Default root margin */
const DEFAULT_ROOT_MARGIN = '0px 0px -80% 0px';

/** Service that tracks the currently active section */
@Injectable()
export class PageSectionActivationService {
  /** Creation options */
  private readonly options = inject(PAGE_SECTION_ACTIVATION_OPTIONS);
  /** All sections with an anchor id */
  private readonly sections = inject(PageSectionService).linkableSections;
  /** Set of elements that are currently observer */
  private readonly observedElements = new Set<Element>();
  /** Currently active element */
  private readonly activeElement = signal<Element | undefined>(undefined);
  /** Section intersection observer */
  private readonly observer = new IntersectionObserver(this.handleIntersection.bind(this), {
    root: this.resolveRootElement(),
    rootMargin: this.options.rootMargin ?? DEFAULT_ROOT_MARGIN,
    threshold: this.options.threshold,
  });

  /** Currently active section */
  readonly activeSection = computed(() => {
    const element = this.activeElement();
    if (!element) {
      return undefined;
    }

    const sections = this.sections();
    return sections.find((s) => getSectionElement(s) === element);
  });

  /** Watches for changes to the sections */
  constructor() {
    effect(() => {
      const elements = this.sections().map(getSectionElement);
      const diff = this.diffObservedElements(elements);
      this.applyObservedElementsDiff(diff);
    });
  }

  /**
   * Resolves the root element from the user options
   *
   * @returns The resolved root element or null/undefined
   */
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

  /**
   * Handles an update to intersections for page sections
   *
   * @param entries Intersection entries
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.activeElement.set(entry.target);
        break;
      }
    }

    // TODO edge cases
  }

  /**
   * Creates a diff between the current set of observed elements and
   * a list of new elements
   *
   * @param elements New elements
   * @returns A diff
   */
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

  /**
   * Applies an element diff. Unobserves removed elements and observes newly added ones
   * while also updating the current set of observed elements.
   *
   * @param diff Element diff
   */
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
