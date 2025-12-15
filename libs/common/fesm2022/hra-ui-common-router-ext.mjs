import * as i0 from '@angular/core';
import { input, Directive, booleanAttribute, computed, inject, output, contentChildren, effect, makeEnvironmentProviders, NgModule } from '@angular/core';
import { stripLeadingHash, isAbsolute, stripTrailingSlash, injectAppUrlResolver, isUrlActive } from '@hra-ui/common/url';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { injectWindow } from '@hra-ui/common/injectors';
import { createNotifier } from 'ngxtension/create-notifier';
import { LocationStrategy } from '@angular/common';
import { getFeatureProviders } from '@hra-ui/common/util/providers';

/** Router token - tree shakable */
const ROUTER = createNoopInjectionToken('ROUTER');
/**
 * Inject the router.
 * Use instead of `inject(Router, { optional: true })` for better tree shaking.
 */
const injectRouter = ROUTER[0];
/** Provide the router */
const provideRouter = ROUTER[1];

/**
 * Test whether a mouse event is an auxiliary click
 *
 * @param event Click event
 * @returns true if the event is an auxiliary click, false otherwise
 */
function isAuxClick(event) {
    const { button, ctrlKey, shiftKey, altKey, metaKey } = event;
    return button !== 0 || ctrlKey || shiftKey || altKey || metaKey;
}

/**
 * Simpler version of `RouterLink` that only navigates to a different fragments.
 * Must be used on `<a>` or `<area>` elements.
 */
class FragmentLinkDirective {
    /** Url fragment (with or without a leading #) */
    fragment = input.required(...(ngDevMode ? [{ debugName: "fragment", alias: 'hraFragmentLink', transform: stripLeadingHash }] : [{ alias: 'hraFragmentLink', transform: stripLeadingHash }]));
    /** Reference to the router */
    router = injectRouter({ optional: true });
    /**
     * Perform a navigation in response to a click event
     *
     * @param event Click event
     * @returns true if the default handler should run, false otherwise
     */
    onClick(event) {
        const { fragment, router } = this;
        if (!router || (event instanceof MouseEvent && isAuxClick(event))) {
            return true;
        }
        router.navigate([], { fragment: fragment() });
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: FragmentLinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.15", type: FragmentLinkDirective, isStandalone: true, selector: "a[hraFragmentLink], area[hraFragmentLink]", inputs: { fragment: { classPropertyName: "fragment", publicName: "hraFragmentLink", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "click": "onClick($event)" }, properties: { "attr.href": "\"#\" + fragment()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: FragmentLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[hraFragmentLink], area[hraFragmentLink]',
                    host: {
                        '[attr.href]': '"#" + fragment()',
                        '(click)': 'onClick($event)',
                    },
                }]
        }], propDecorators: { fragment: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraFragmentLink", required: true }] }] } });

/**
 * Simpler version of `RouterLink`.
 * Only supports absolute urls and must be used on `<a>` or `<area>` elements.
 */
class LinkDirective {
    /** Full url */
    url = input.required(...(ngDevMode ? [{ debugName: "url", alias: 'hraLink' }] : [{ alias: 'hraLink' }]));
    /** Whether the link should open is a new tab/window */
    // eslint-disable-next-line @angular-eslint/no-input-rename -- Rule doesn't work for non-trivial selectors
    external = input(false, ...(ngDevMode ? [{ debugName: "external", alias: 'hraLinkExternal', transform: booleanAttribute }] : [{ alias: 'hraLinkExternal', transform: booleanAttribute }]));
    /** Resolved url tree */
    urlTree = computed(() => {
        const { router, resolve } = this;
        if (router && !this.external()) {
            const url = resolve(this.url());
            if (!isAbsolute(url)) {
                return router.parseUrl(stripTrailingSlash(url));
            }
        }
        return undefined;
    }, ...(ngDevMode ? [{ debugName: "urlTree" }] : []));
    /** Location strategy reference */
    locationStrategy = inject(LocationStrategy, { optional: true });
    /** Reference to the router (if available) */
    router = injectRouter({ optional: true });
    /** Url resolving function */
    resolve = injectAppUrlResolver();
    /** Resolved href value */
    href = computed(() => {
        const { locationStrategy, router } = this;
        const urlTree = this.urlTree();
        if (urlTree && locationStrategy && router) {
            return locationStrategy.prepareExternalUrl(router.serializeUrl(urlTree));
        }
        return this.url();
    }, ...(ngDevMode ? [{ debugName: "href" }] : []));
    /**
     * Perform a navigation in response to a click event
     *
     * @param event Click event
     * @returns true if the default handler should run, false otherwise
     */
    onClick(event) {
        const urlTree = this.urlTree();
        if (!urlTree || (event instanceof MouseEvent && isAuxClick(event))) {
            return true;
        }
        this.router?.navigateByUrl(urlTree);
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.15", type: LinkDirective, isStandalone: true, selector: "a[hraLink], area[hraLink]", inputs: { url: { classPropertyName: "url", publicName: "hraLink", isSignal: true, isRequired: true, transformFunction: null }, external: { classPropertyName: "external", publicName: "hraLinkExternal", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "onClick($event)" }, properties: { "attr.href": "href()", "attr.target": "external() ? \"_blank\" : null", "attr.rel": "external() ? \"noopener noreferrer\" : null" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[hraLink], area[hraLink]',
                    host: {
                        '[attr.href]': 'href()',
                        '[attr.target]': 'external() ? "_blank" : null',
                        '[attr.rel]': 'external() ? "noopener noreferrer" : null',
                        '(click)': 'onClick($event)',
                    },
                }]
        }], propDecorators: { url: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraLink", required: true }] }], external: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraLinkExternal", required: false }] }] } });

/** Default match options */
const DEFAULT_MATCH_OPTIONS = {
    paths: 'subset',
    queryParams: 'subset',
    fragment: 'ignored',
    matrixParams: 'ignored',
};
/**
 * Apply classes when a connected link directive becomes active as determined by `Router#isActive`
 */
class LinkActiveDirective {
    /** Classes to apply when active */
    classes = input('', ...(ngDevMode ? [{ debugName: "classes", alias: 'hraLinkActive' }] : [{ alias: 'hraLinkActive' }]));
    /** Options controlling how matching is performed */
    options = input(DEFAULT_MATCH_OPTIONS, ...(ngDevMode ? [{ debugName: "options", alias: 'hraLinkActiveOptions' }] : [{ alias: 'hraLinkActiveOptions' }]));
    /** Emits when the active state changes */
    isActiveChange = output();
    /** Whether this link is currently active */
    isActive = computed(() => {
        this.routeChanges.listen();
        return this.hasActiveLinks();
    }, ...(ngDevMode ? [{ debugName: "isActive" }] : []));
    /** Associated link directive if placed on the same element */
    link = inject(LinkDirective, { optional: true });
    /** Child link directives if this is placed on a parent element */
    sublinks = contentChildren(LinkDirective, ...(ngDevMode ? [{ debugName: "sublinks", descendants: true }] : [{ descendants: true }]));
    /** All links */
    links = computed(() => (this.link ? [this.link, ...this.sublinks()] : this.sublinks()), ...(ngDevMode ? [{ debugName: "links" }] : []));
    /** Reference to the window object */
    window = injectWindow();
    /** Reference to the router if available */
    router = injectRouter({ optional: true });
    /** Notifier used to update computed signals on route changes */
    routeChanges = createNotifier();
    /** Initialize the directive */
    constructor() {
        this.router?.events.pipe(takeUntilDestroyed()).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.routeChanges.notify();
            }
        });
        let isFirstChange = true;
        effect(() => {
            const isActive = this.isActive();
            const skipEmit = isFirstChange && !isActive;
            isFirstChange = false;
            if (!skipEmit) {
                this.isActiveChange.emit(isActive);
            }
        });
    }
    /**
     * Check whether any connected link is currently active.
     *
     * @returns true if any connected link is active, false otherwise
     */
    hasActiveLinks() {
        const { router, window: { location }, } = this;
        const links = this.links();
        const options = this.options();
        if (!router) {
            return links.some((link) => isUrlActive(link.url(), location.href, options));
        }
        return links.some((link) => {
            const urlTree = link.urlTree();
            if (!urlTree) {
                return false;
            }
            return router.isActive(urlTree, options);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkActiveDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.15", type: LinkActiveDirective, isStandalone: true, selector: "[hraLinkActive]", inputs: { classes: { classPropertyName: "classes", publicName: "hraLinkActive", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "hraLinkActiveOptions", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { isActiveChange: "isActiveChange" }, host: { properties: { "class": "isActive() ? classes() : null" } }, queries: [{ propertyName: "sublinks", predicate: LinkDirective, descendants: true, isSignal: true }], exportAs: ["hraLinkActive"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: LinkActiveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraLinkActive]',
                    host: {
                        '[class]': 'isActive() ? classes() : null',
                    },
                    exportAs: 'hraLinkActive',
                }]
        }], ctorParameters: () => [], propDecorators: { classes: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraLinkActive", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraLinkActiveOptions", required: false }] }], isActiveChange: [{ type: i0.Output, args: ["isActiveChange"] }], sublinks: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => LinkDirective), { ...{ descendants: true }, isSignal: true }] }] } });

/**
 * Provide additional router features.
 * Must be used along side of `provideRouter`.
 *
 * @param features Router extension features
 * @returns Environment providers
 */
function provideRouterExt(...features) {
    return makeEnvironmentProviders([provideRouter(() => inject(Router)), ...features.flatMap(getFeatureProviders)]);
}

class RouterExtModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: RouterExtModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: RouterExtModule, imports: [LinkActiveDirective, LinkDirective, FragmentLinkDirective], exports: [LinkActiveDirective, LinkDirective, FragmentLinkDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: RouterExtModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: RouterExtModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [LinkActiveDirective, LinkDirective, FragmentLinkDirective],
                    exports: [LinkActiveDirective, LinkDirective, FragmentLinkDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FragmentLinkDirective, LinkActiveDirective, LinkDirective, RouterExtModule, injectRouter, provideRouterExt };
//# sourceMappingURL=hra-ui-common-router-ext.mjs.map
