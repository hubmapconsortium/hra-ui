import { CommonModule, DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { signal, computed, Injectable, input, numberAttribute, viewChild, ElementRef, inject, DestroyRef, ChangeDetectionStrategy, Component, InjectionToken, effect } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { PageLabelComponent } from '@hra-ui/design-system/content-templates/page-label';
import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import { z } from 'zod';
import { coerceElement } from '@angular/cdk/coercion';
import { INTERSECTION_OBSERVER } from '@hra-ui/common';

/**
 * Helper for getting a page section's html element
 *
 * @param section A page section
 * @returns The section element
 */
function getSectionElement(section) {
    return section.elementRef().nativeElement;
}
/** Service that tracks all page sections on a page */
class PageSectionService {
    /** All sections (mutable signal) */
    _sections = signal([], ...(ngDevMode ? [{ debugName: "_sections" }] : []));
    /** All sections */
    sections = this._sections.asReadonly();
    /** All sections that have an anchor id */
    linkableSections = computed(() => this.filterLinkableSections(this._sections()), ...(ngDevMode ? [{ debugName: "linkableSections" }] : []));
    /** All sections with an anchor id sorted in dom order */
    sortedSections = computed(() => this.sortSectionsByDomPosition(this.linkableSections()), ...(ngDevMode ? [{ debugName: "sortedSections" }] : []));
    /**
     * Adds a section to be tracked
     *
     * @param section New section
     */
    addSection(section) {
        this._sections.update((sections) => [...sections, section]);
    }
    /**
     * Removes a section and stops tracking changes to it
     *
     * @param section Existing section
     */
    removeSection(section) {
        this._sections.update((sections) => sections.filter((s) => s !== section));
    }
    /**
     * Filters sections that have an anchor id
     *
     * @param sections All sections
     * @returns Sections with an anchor id
     */
    filterLinkableSections(sections) {
        return sections.filter((section) => section.anchor());
    }
    /**
     * Sorts sections by the order in the dom.
     *
     * @param sections Unsorted sections
     * @returns Sorted sections
     */
    sortSectionsByDomPosition(sections) {
        sections = [...sections];
        sections.sort((section1, section2) => {
            const el1 = getSectionElement(section1);
            const el2 = getSectionElement(section2);
            const position = el1.compareDocumentPosition(el2);
            return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });
        return sections;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionService, decorators: [{
            type: Injectable
        }] });

/**
 * A labeled section of the page
 */
class PageSectionComponent {
    /** Title for the section */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Level of <hx> element to use for the header */
    level = input(1, ...(ngDevMode ? [{ debugName: "level", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Icons to display as part of the label */
    icons = input(...(ngDevMode ? [undefined, { debugName: "icons" }] : []));
    /** Anchor id for the section */
    anchor = input(...(ngDevMode ? [undefined, { debugName: "anchor" }] : []));
    /** Reference to the section element */
    elementRef = viewChild.required('section', { read: ElementRef });
    /** Registers this section with the PageSectionService if available */
    constructor() {
        const destroyRef = inject(DestroyRef);
        const pageSectionService = inject(PageSectionService, { optional: true });
        if (pageSectionService) {
            pageSectionService.addSection(this);
            destroyRef.onDestroy(() => pageSectionService.removeSection(this));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.3", type: PageSectionComponent, isStandalone: true, selector: "hra-page-section", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: false, transformFunction: null }, icons: { classPropertyName: "icons", publicName: "icons", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "elementRef", first: true, predicate: ["section"], descendants: true, read: ElementRef, isSignal: true }], ngImport: i0, template: "<section [attr.id]=\"anchor() || null\" #section>\n  <hra-page-label class=\"header\" [tagline]=\"tagline()\" [level]=\"level()\" [icons]=\"icons()\" [anchor]=\"anchor()\" />\n\n  <div class=\"content\">\n    <ng-content />\n  </div>\n</section>\n", styles: [":host{display:block}:host .content{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary);margin-top:1rem;display:flex;flex-direction:column;gap:1.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: PageLabelComponent, selector: "hra-page-label", inputs: ["tagline", "level", "icons", "anchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-page-section', imports: [CommonModule, MatDividerModule, PageLabelComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section [attr.id]=\"anchor() || null\" #section>\n  <hra-page-label class=\"header\" [tagline]=\"tagline()\" [level]=\"level()\" [icons]=\"icons()\" [anchor]=\"anchor()\" />\n\n  <div class=\"content\">\n    <ng-content />\n  </div>\n</section>\n", styles: [":host{display:block}:host .content{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary);margin-top:1rem;display:flex;flex-direction:column;gap:1.5rem}\n"] }]
        }], ctorParameters: () => [] });

/** Schema structure of a Page Section */
const PageSectionSchema = ContentTemplateSchema.extend({
    component: z.literal('PageSection'),
    tagline: z.string(),
    level: z.number().int().gte(1).lte(6).optional(),
    icons: IconListSchema.optional(),
    anchor: z.string().optional(),
    content: ProjectedContentTemplateSchema,
});

/** PageSection content template definition */
const PageSectionDef = {
    component: PageSectionComponent,
    spec: PageSectionSchema,
    projectedProperties: {
        '*': 'content',
    },
};

/** Token used to provide service options */
const PAGE_SECTION_ACTIVATION_OPTIONS = new InjectionToken('Page Section Activation Options');
/** Default root margin */
const DEFAULT_ROOT_MARGIN = '0px 0px -80% 0px';
/** Service that tracks the currently active section */
class PageSectionActivationService {
    /** Creation options */
    options = inject(PAGE_SECTION_ACTIVATION_OPTIONS);
    /** All sections with an anchor id */
    sections = inject(PageSectionService).linkableSections;
    /** Set of elements that are currently observer */
    observedElements = new Set();
    /** Currently active element */
    activeElement = signal(undefined, ...(ngDevMode ? [{ debugName: "activeElement" }] : []));
    /** Section intersection observer */
    observer = this.createObserver();
    /** Currently active section */
    activeSection = computed(() => {
        const element = this.activeElement();
        if (!element) {
            return undefined;
        }
        const sections = this.sections();
        return sections.find((s) => getSectionElement(s) === element);
    }, ...(ngDevMode ? [{ debugName: "activeSection" }] : []));
    /** Watches for changes to the sections */
    constructor() {
        effect(() => {
            const elements = this.sections().map(getSectionElement);
            const diff = this.diffObservedElements(elements);
            this.applyObservedElementsDiff(diff);
        });
    }
    /**
     * Activates a specific section
     *
     * @param section Section to set as the active section
     */
    activate(section) {
        this.activeElement.set(getSectionElement(section));
    }
    /**
     * Creates the intersection observer used to determine when a section is active
     *
     * @returns An intersection observer or undefined if not available
     */
    createObserver() {
        const IntersectionObserver = inject(INTERSECTION_OBSERVER);
        if (!IntersectionObserver) {
            return undefined;
        }
        const { rootMargin = DEFAULT_ROOT_MARGIN, threshold } = this.options;
        return new IntersectionObserver(this.handleIntersection.bind(this), {
            root: this.resolveRootElement(),
            rootMargin,
            threshold,
        });
    }
    /**
     * Resolves the root element from the user options
     *
     * @returns The resolved root element or null/undefined
     */
    resolveRootElement() {
        const { root } = this.options;
        if (typeof root === 'string') {
            const document = inject(DOCUMENT);
            return document.querySelector(root);
        }
        else if (root) {
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
    handleIntersection(entries) {
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
    diffObservedElements(elements) {
        const observedElements = this.observedElements;
        const newElements = new Set(elements);
        const added = [];
        const removed = [];
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
    applyObservedElementsDiff(diff) {
        const { observer, observedElements } = this;
        const { added, removed } = diff;
        for (const el of removed) {
            observer?.unobserve(el);
            observedElements.delete(el);
        }
        for (const el of added) {
            observer?.observe(el);
            observedElements.add(el);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionActivationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionActivationService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: PageSectionActivationService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

/**
 * Provides the services required for page section tracking.
 * Should be provided inside a component - not in root!
 *
 * @param options Page section activation options
 * @returns Component providers
 */
function providePageSectionNavigation(options = {}) {
    return [
        {
            provide: PAGE_SECTION_ACTIVATION_OPTIONS,
            useValue: options,
        },
        PageSectionService,
        PageSectionActivationService,
    ];
}

/**
 * Generated bundle index. Do not edit.
 */

export { PageSectionActivationService, PageSectionComponent, PageSectionDef, PageSectionSchema, PageSectionService, providePageSectionNavigation };
//# sourceMappingURL=hra-ui-design-system-content-templates-page-section.mjs.map
