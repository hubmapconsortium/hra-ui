import * as i0 from '@angular/core';
import { input, Directive, booleanAttribute, computed, makeEnvironmentProviders, inject, NgModule } from '@angular/core';
import { stripLeadingHash, injectAppUrlResolver, isAbsolute, stripTrailingSlash } from '@hra-ui/common/url';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';
import { Router } from '@angular/router';
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
        if (!router || isAuxClick(event)) {
            return true;
        }
        router.navigate([], { fragment: fragment() });
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FragmentLinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.7", type: FragmentLinkDirective, isStandalone: true, selector: "a[hraFragmentLink], area[hraFragmentLink]", inputs: { fragment: { classPropertyName: "fragment", publicName: "hraFragmentLink", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "click": "onClick($event)" }, properties: { "attr.href": "\"#\" + fragment()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FragmentLinkDirective, decorators: [{
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
    /** Reference to the router (if available) */
    router = injectRouter({ optional: true });
    /** Url resolving function */
    resolve = injectAppUrlResolver();
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
    /**
     * Perform a navigation in response to a click event
     *
     * @param event Click event
     * @returns true if the default handler should run, false otherwise
     */
    onClick(event) {
        const urlTree = this.urlTree();
        if (!urlTree || isAuxClick(event)) {
            return true;
        }
        this.router?.navigateByUrl(urlTree);
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: LinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.7", type: LinkDirective, isStandalone: true, selector: "a[hraLink], area[hraLink]", inputs: { url: { classPropertyName: "url", publicName: "hraLink", isSignal: true, isRequired: true, transformFunction: null }, external: { classPropertyName: "external", publicName: "hraLinkExternal", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "onClick($event)" }, properties: { "attr.href": "url()", "attr.target": "external() ? \"_blank\" : null", "attr.rel": "external() ? \"noopener noreferrer\" : null" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: LinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[hraLink], area[hraLink]',
                    host: {
                        '[attr.href]': 'url()',
                        '[attr.target]': 'external() ? "_blank" : null',
                        '[attr.rel]': 'external() ? "noopener noreferrer" : null',
                        '(click)': 'onClick($event)',
                    },
                }]
        }], propDecorators: { url: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraLink", required: true }] }], external: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraLinkExternal", required: false }] }] } });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: RouterExtModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: RouterExtModule, imports: [LinkDirective, FragmentLinkDirective], exports: [LinkDirective, FragmentLinkDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: RouterExtModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: RouterExtModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [LinkDirective, FragmentLinkDirective],
                    exports: [LinkDirective, FragmentLinkDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FragmentLinkDirective, LinkDirective, RouterExtModule, injectRouter, provideRouterExt };
//# sourceMappingURL=hra-ui-common-router-ext.mjs.map
