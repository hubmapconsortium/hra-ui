import * as i0 from '@angular/core';
import { InjectionToken, inject, PLATFORM_ID, signal, ChangeDetectionStrategy, ViewEncapsulation, Component, input, numberAttribute, Renderer2, effect, Directive, makeEnvironmentProviders, NgModule } from '@angular/core';
import { registerStyleComponents, provideStyleComponents } from '@hra-ui/cdk/styling';
import { NG_SCROLLBAR, provideScrollbarPolyfill, provideScrollbarOptions, NgScrollbarModule } from 'ngx-scrollbar';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, takeWhile, ignoreElements, endWith, map } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';
import { joinWithSlash } from '@hra-ui/common/url';

/**
 * Interval between scroll timeline availability checks.
 * Primarily used to simplify testing.
 */
const SCROLL_TIMELINE_QUERY_INTERVAL = new InjectionToken('SCROLL_TIMELINE_QUERY_INTERVAL', {
    providedIn: 'root',
    factory: () => interval(100),
});
/**
 * Provides ScrollTimeline as a signal.
 * If not natively implemented it will try to wait for a polyfill
 * to provide the function.
 */
const SCROLL_TIMELINE = new InjectionToken('SCROLL_TIMELINE', {
    providedIn: 'root',
    factory: () => {
        const window = inject(DOCUMENT).defaultView;
        if (!isPlatformBrowser(inject(PLATFORM_ID)) || !window) {
            return signal(null);
        }
        const isAvailable = () => 'ScrollTimeline' in window && typeof window.ScrollTimeline === 'function';
        if (isAvailable()) {
            return signal(window['ScrollTimeline']);
        }
        const scrollTimeline$ = inject(SCROLL_TIMELINE_QUERY_INTERVAL).pipe(takeWhile(() => !isAvailable()), ignoreElements(), endWith(null), map(() => window.ScrollTimeline));
        return toSignal(scrollTimeline$, { initialValue: null });
    },
});

/** Keyframes for the top gradient */
const GRADIENT_TOP_KEYFRAMES = [
    {
        top: 'var(--_hra-scroll-overflow-fade-gradient-top-start)',
        opacity: 0,
    },
    {
        offset: 0.02,
        opacity: 1,
    },
    {
        top: 'var(--_hra-scroll-overflow-fade-gradient-top-end)',
    },
];
/** Keyframes for the bottom gradient */
const GRADIENT_BOTTOM_KEYFRAMES = [
    {
        top: 'var(--_hra-scroll-overflow-fade-gradient-bottom-start)',
    },
    {
        offset: 0.98,
        opacity: 1,
    },
    {
        top: 'var(--_hra-scroll-overflow-fade-gradient-bottom-end)',
        opacity: 0,
    },
];
/** Scroll overflow fade global styles component */
class ScrollOverflowFadeStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollOverflowFadeStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.9", type: ScrollOverflowFadeStylesComponent, isStandalone: true, selector: "hra-scroll-overflow-fade-styles", ngImport: i0, template: '', isInline: true, styles: [".hra-scroll-overflow-fade-gradient-top,.hra-scroll-overflow-fade-gradient-bottom{--_hra-scroll-overflow-fade-height: var(--hra-scroll-overflow-fade-height, 32px);--_hra-scroll-overflow-fade-color: var(--hra-scroll-overflow-fade-color, #ffffff);display:block;position:absolute;pointer-events:none;z-index:99;left:0;right:0;width:100%;height:var(--_hra-scroll-overflow-fade-height)}.hra-scroll-overflow-fade-gradient-top{--_hra-scroll-overflow-fade-gradient-top-start: var(--hra-scroll-overflow-fade-offset);--_hra-scroll-overflow-fade-gradient-top-end: calc( (var(--content-height) - var(--viewport-height)) * 1px + 2 * var(--hra-scroll-overflow-fade-offset) - 1px );top:calc(-1 * var(--_hra-scroll-overflow-fade-height));background:linear-gradient(to bottom,var(--_hra-scroll-overflow-fade-color),transparent)}.hra-scroll-overflow-fade-gradient-bottom{--_hra-scroll-overflow-fade-gradient-bottom-start: calc( var(--viewport-height) * 1px - var(--_hra-scroll-overflow-fade-height) );--_hra-scroll-overflow-fade-gradient-bottom-end: calc( var(--content-height) * 1px - var(--_hra-scroll-overflow-fade-height) + var(--hra-scroll-overflow-fade-offset) );top:100%;background:linear-gradient(to top,var(--_hra-scroll-overflow-fade-color),transparent)}ng-scrollbar[isVerticallyScrollable=false] .hra-scroll-overflow-fade-gradient-top,ng-scrollbar[isVerticallyScrollable=false] .hra-scroll-overflow-fade-gradient-bottom{display:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollOverflowFadeStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-scroll-overflow-fade-styles', template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".hra-scroll-overflow-fade-gradient-top,.hra-scroll-overflow-fade-gradient-bottom{--_hra-scroll-overflow-fade-height: var(--hra-scroll-overflow-fade-height, 32px);--_hra-scroll-overflow-fade-color: var(--hra-scroll-overflow-fade-color, #ffffff);display:block;position:absolute;pointer-events:none;z-index:99;left:0;right:0;width:100%;height:var(--_hra-scroll-overflow-fade-height)}.hra-scroll-overflow-fade-gradient-top{--_hra-scroll-overflow-fade-gradient-top-start: var(--hra-scroll-overflow-fade-offset);--_hra-scroll-overflow-fade-gradient-top-end: calc( (var(--content-height) - var(--viewport-height)) * 1px + 2 * var(--hra-scroll-overflow-fade-offset) - 1px );top:calc(-1 * var(--_hra-scroll-overflow-fade-height));background:linear-gradient(to bottom,var(--_hra-scroll-overflow-fade-color),transparent)}.hra-scroll-overflow-fade-gradient-bottom{--_hra-scroll-overflow-fade-gradient-bottom-start: calc( var(--viewport-height) * 1px - var(--_hra-scroll-overflow-fade-height) );--_hra-scroll-overflow-fade-gradient-bottom-end: calc( var(--content-height) * 1px - var(--_hra-scroll-overflow-fade-height) + var(--hra-scroll-overflow-fade-offset) );top:100%;background:linear-gradient(to top,var(--_hra-scroll-overflow-fade-color),transparent)}ng-scrollbar[isVerticallyScrollable=false] .hra-scroll-overflow-fade-gradient-top,ng-scrollbar[isVerticallyScrollable=false] .hra-scroll-overflow-fade-gradient-bottom{display:none}\n"] }]
        }] });
/**
 * Directive that can be used along ng-scrollbar to apply a gradient
 * to the top and bottom of the scroll area to indicate that there
 * is additional content available through scrolling.
 */
class ScrollOverflowFadeDirective {
    /**
     * Additional offset to the gradient elements.
     * Primarily useful when there are sticky headers on a table, etc.
     */
    scrollOverflowFadeOffset = input(0, ...(ngDevMode ? [{ debugName: "scrollOverflowFadeOffset", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Renderer instance */
    renderer = inject(Renderer2);
    /** Nearest ng-scrollbar instance */
    scrollbar = inject(NG_SCROLLBAR);
    /** Signal providing access to ScrollTimeline though browser builtin or polyfill */
    scrollTimeline = inject(SCROLL_TIMELINE);
    /**
     * Initializes the directive, adding the gradient elements to the scroll area.
     */
    constructor() {
        registerStyleComponents([ScrollOverflowFadeStylesComponent]);
        effect((onCleanup) => {
            const scrollTimeline = this.scrollTimeline();
            if (!this.scrollbar.viewport.initialized() || !scrollTimeline) {
                return;
            }
            const viewport = this.scrollbar.viewport.nativeElement;
            const cleanupFns = [
                this.attachGradient(viewport, 'top', scrollTimeline, GRADIENT_TOP_KEYFRAMES),
                this.attachGradient(viewport, 'bottom', scrollTimeline, GRADIENT_BOTTOM_KEYFRAMES),
            ];
            onCleanup(() => cleanupFns.forEach((fn) => fn()));
        });
    }
    /**
     * Creates and attaches a gradient element to a scroll area.
     *
     * @param viewport The scroll area viewport
     * @param placement Whether to place the gradient on top or bottom
     * @param scrollTimeline Reference to ScrollTimeline
     * @param keyframes Keyframes used to animate/move the gradient
     * @returns A cleanup function
     */
    attachGradient(viewport, placement, scrollTimeline, keyframes) {
        const el = this.createGradientElement(placement);
        this.renderer.appendChild(viewport, el);
        const animation = this.animateGradient(scrollTimeline, el, viewport, keyframes);
        return () => {
            el.remove();
            animation.cancel();
        };
    }
    /**
     * Creates a new gradient element.
     *
     * @param placement Whether it will be placed on the top or bottom
     * @returns A new element
     */
    createGradientElement(placement) {
        const el = this.renderer.createElement('div');
        this.renderer.addClass(el, `hra-scroll-overflow-fade-gradient-${placement}`);
        return el;
    }
    /**
     * Animates a gradient element using a scroll timeline.
     *
     * @param scrollTimeline Reference to ScrollTimeline
     * @param el Element to animate
     * @param source Scroll container element
     * @param keyframes Keyframe specification
     * @returns An animation
     */
    animateGradient(scrollTimeline, el, source, keyframes) {
        return el.animate(keyframes, {
            fill: 'both',
            easing: 'linear',
            timeline: new scrollTimeline({ source, axis: 'y' }),
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollOverflowFadeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.9", type: ScrollOverflowFadeDirective, isStandalone: true, selector: "[hraScrollOverflowFade]", inputs: { scrollOverflowFadeOffset: { classPropertyName: "scrollOverflowFadeOffset", publicName: "scrollOverflowFadeOffset", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "style.--hra-scroll-overflow-fade-offset.px": "scrollOverflowFadeOffset()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollOverflowFadeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraScrollOverflowFade]',
                    host: {
                        '[style.--hra-scroll-overflow-fade-offset.px]': 'scrollOverflowFadeOffset()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { scrollOverflowFadeOffset: [{ type: i0.Input, args: [{ isSignal: true, alias: "scrollOverflowFadeOffset", required: false }] }] } });

/** ng-scrollbar global styles component */
class ScrollbarStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollbarStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.9", type: ScrollbarStylesComponent, isStandalone: true, selector: "hra-scrollbar-styles", ngImport: i0, template: '', isInline: true, styles: [".hra-app{--scrollbar-thumb-color: rgb(from var(--mat-sys-primary) r g b / .72);--scrollbar-border-radius: 1rem;--scrollbar-thickness: 8}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollbarStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-scrollbar-styles', template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".hra-app{--scrollbar-thumb-color: rgb(from var(--mat-sys-primary) r g b / .72);--scrollbar-border-radius: 1rem;--scrollbar-thickness: 8}\n"] }]
        }] });

/** Default scroll timeline polyfill url */
const DEFAULT_POLYFILL_URL = 'assets/polyfills/scroll-timeline-polyfill.js';
/**
 * Provide scrolling functionality to an application.
 *
 * @param options Scrollbar options
 * @returns An environment provider
 */
function provideScrolling(options) {
    const metaUrl = getImportMetaUrl();
    const href = /^https?:/.test(metaUrl) ? new URL('./', metaUrl).toString() : '';
    // TODO: Find a better way to resolve the polyfill url
    const polyfillUrl = joinWithSlash(href, options?.polyfillUrl ?? DEFAULT_POLYFILL_URL);
    return makeEnvironmentProviders([
        provideStyleComponents(ScrollbarStylesComponent),
        provideScrollbarPolyfill(polyfillUrl),
        provideScrollbarOptions({
            visibility: 'hover',
            appearance: 'compact',
            trackClass: 'hra-scrollbar-track',
            thumbClass: 'hra-scrollbar-thumb',
            ...options,
        }),
    ]);
}
/** Module exporting ng-scrollbar and related scrolling utilities */
class ScrollingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: ScrollingModule, imports: [ScrollOverflowFadeDirective, CdkScrollable], exports: [NgScrollbarModule, ScrollOverflowFadeDirective, CdkScrollable] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollingModule, imports: [NgScrollbarModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ScrollingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ScrollOverflowFadeDirective, CdkScrollable],
                    exports: [NgScrollbarModule, ScrollOverflowFadeDirective, CdkScrollable],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { SCROLL_TIMELINE, SCROLL_TIMELINE_QUERY_INTERVAL, ScrollOverflowFadeDirective, ScrollOverflowFadeStylesComponent, ScrollingModule, provideScrolling };
//# sourceMappingURL=hra-ui-design-system-scrolling.mjs.map
