import * as i0 from '@angular/core';
import { InjectionToken, Signal, EnvironmentProviders } from '@angular/core';
import { Observable } from 'rxjs';
import * as i3 from 'ngx-scrollbar';
import { NgScrollbarOptions } from 'ngx-scrollbar';
import * as i2 from '@angular/cdk/scrolling';

/** Scroll overflow fade global styles component */
declare class ScrollOverflowFadeStylesComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollOverflowFadeStylesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScrollOverflowFadeStylesComponent, "hra-scroll-overflow-fade-styles", never, {}, {}, never, never, true, never>;
}
/**
 * Directive that can be used along ng-scrollbar to apply a gradient
 * to the top and bottom of the scroll area to indicate that there
 * is additional content available through scrolling.
 */
declare class ScrollOverflowFadeDirective {
    /**
     * Additional offset to the gradient elements.
     * Primarily useful when there are sticky headers on a table, etc.
     */
    readonly scrollOverflowFadeOffset: i0.InputSignalWithTransform<number, unknown>;
    /** Renderer instance */
    private readonly renderer;
    /** Nearest ng-scrollbar instance */
    private readonly scrollbar;
    /** Signal providing access to ScrollTimeline though browser builtin or polyfill */
    private readonly scrollTimeline;
    /**
     * Initializes the directive, adding the gradient elements to the scroll area.
     */
    constructor();
    /**
     * Creates and attaches a gradient element to a scroll area.
     *
     * @param viewport The scroll area viewport
     * @param placement Whether to place the gradient on top or bottom
     * @param scrollTimeline Reference to ScrollTimeline
     * @param keyframes Keyframes used to animate/move the gradient
     * @returns A cleanup function
     */
    private attachGradient;
    /**
     * Creates a new gradient element.
     *
     * @param placement Whether it will be placed on the top or bottom
     * @returns A new element
     */
    private createGradientElement;
    /**
     * Animates a gradient element using a scroll timeline.
     *
     * @param scrollTimeline Reference to ScrollTimeline
     * @param el Element to animate
     * @param source Scroll container element
     * @param keyframes Keyframe specification
     * @returns An animation
     */
    private animateGradient;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollOverflowFadeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ScrollOverflowFadeDirective, "[hraScrollOverflowFade]", never, { "scrollOverflowFadeOffset": { "alias": "scrollOverflowFadeOffset"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Basic signature of the ScrollTimeline constructor */
type ScrollTimelineFunc = new ({ source, axis }: {
    source: HTMLElement;
    axis: 'x' | 'y';
}) => AnimationTimeline;
/**
 * Interval between scroll timeline availability checks.
 * Primarily used to simplify testing.
 */
declare const SCROLL_TIMELINE_QUERY_INTERVAL: InjectionToken<Observable<number>>;
/**
 * Provides ScrollTimeline as a signal.
 * If not natively implemented it will try to wait for a polyfill
 * to provide the function.
 */
declare const SCROLL_TIMELINE: InjectionToken<Signal<ScrollTimelineFunc | null>>;

/** Scrolling configuration */
interface ScrollingOptions extends NgScrollbarOptions {
    /** Url to the scroll timeline polyfill script */
    polyfillUrl?: string;
}
/**
 * Provide scrolling functionality to an application.
 *
 * @param options Scrollbar options
 * @returns An environment provider
 */
declare function provideScrolling(options?: ScrollingOptions): EnvironmentProviders;
/** Module exporting ng-scrollbar and related scrolling utilities */
declare class ScrollingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ScrollingModule, never, [typeof ScrollOverflowFadeDirective, typeof i2.CdkScrollable], [typeof i3.NgScrollbarModule, typeof ScrollOverflowFadeDirective, typeof i2.CdkScrollable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ScrollingModule>;
}

export { SCROLL_TIMELINE, SCROLL_TIMELINE_QUERY_INTERVAL, ScrollOverflowFadeDirective, ScrollOverflowFadeStylesComponent, ScrollingModule, provideScrolling };
export type { ScrollTimelineFunc, ScrollingOptions };
