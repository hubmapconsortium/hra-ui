import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { assertInInjectionContext, inject, booleanAttribute, effect, signal, input, output, computed, Directive } from '@angular/core';
import { ConsentService } from '@hra-ui/common/analytics';
import { injectAssetHref, injectPageHref } from '@hra-ui/common/url';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { EventCategory } from '@hra-ui/common/analytics/events';
import * as z from 'zod';
import { watchBreakpoints } from '@hra-ui/cdk/breakpoints';
import { DialogService } from '@hra-ui/design-system/dialog';
import store from 'store2';

/** Analytics input type without json preprocessing */
const BaseAnalyticsInput = z.union([
    z.undefined(),
    z.boolean(),
    z.stringbool({ truthy: ['true', 'enable', 'enabled'], falsy: ['false', 'disable', 'disabled'] }),
    z.partialRecord(z.enum(EventCategory), z.boolean()),
]);
/** Analytics input type */
const AnalyticsInput = z
    .preprocess((value) => {
    try {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
    }
    catch {
        // Intentionally empty
    }
    return value;
}, BaseAnalyticsInput)
    .catch(undefined);

/** Screen size notice storage key */
const SCREEN_SIZE_NOTICE_STORAGE_KEY = '__hra-screen-size-notice-dismissed';
/** Monitors screen size and opens/closes screen size notice dialog as needed */
function initializeScreenSizeNoticeMonitor(options, disabled = signal(false)) {
    assertInInjectionContext(initializeScreenSizeNoticeMonitor);
    const { width, height, storageKey = SCREEN_SIZE_NOTICE_STORAGE_KEY } = options;
    const queries = height === undefined ? [`(width < ${width}px)`] : [`(width < ${width}px)`, `(height < ${height}px)`];
    const message = height === undefined
        ? `This page is optimized for Chrome or Firefox on screens at least ${width}px wide.`
        : `This website is optimized for Chrome or Firefox on a minimum resolution of ${width}x${height}.`;
    const breakpoints = watchBreakpoints(queries);
    const dialogService = inject(DialogService);
    const dismissed = booleanAttribute(store.local.get(storageKey));
    let activeNotice;
    if (!dismissed) {
        const ref = effect(() => {
            if (!disabled() && breakpoints().matchesAny()) {
                if (!activeNotice) {
                    activeNotice = dialogService.openNotice('Heads up!', message);
                    activeNotice.afterClosed().subscribe((value) => {
                        if (value !== 'program') {
                            store.local.set(storageKey, true);
                            ref.destroy();
                        }
                    });
                }
            }
            else {
                activeNotice?.close('program');
                activeNotice = undefined;
            }
        }, ...(ngDevMode ? [{ debugName: "ref" }] : /* istanbul ignore next */ []));
    }
}

/**
 * Base component for all application
 */
class BaseApplicationComponent {
    /** Asset base url */
    assetHref = input(...(ngDevMode ? [undefined, { debugName: "assetHref" }] : /* istanbul ignore next */ []));
    /** Page base url */
    pageHref = input(...(ngDevMode ? [undefined, { debugName: "pageHref" }] : /* istanbul ignore next */ []));
    /** Whether analytics is enabled/disabled or the specific analytics settings */
    analytics = input(undefined, { ...(ngDevMode ? { debugName: "analytics" } : /* istanbul ignore next */ {}), transform: AnalyticsInput.parse });
    /** Whether to disable the screen size notice popup */
    disableScreenSizeNotice = input(false, { ...(ngDevMode ? { debugName: "disableScreenSizeNotice" } : /* istanbul ignore next */ {}), transform: coerceBooleanProperty });
    /** Emits when the user changes their consent settings */
    consentChange = output();
    /** Initialize the application component */
    constructor(options = {}) {
        // Setup hrefs
        const assetHref = injectAssetHref();
        effect(() => {
            const href = this.assetHref();
            if (href !== undefined) {
                assetHref.set(href);
            }
        });
        const pageHref = injectPageHref();
        effect(() => {
            const href = this.pageHref();
            if (href !== undefined) {
                pageHref.set(href);
            }
        });
        // Setup analytics
        const consent = inject(ConsentService);
        const privacyPreferences = inject(PrivacyPreferencesService);
        const analyticsWithDefault = computed(() => this.analytics() ?? options.analytics ?? true, ...(ngDevMode ? [{ debugName: "analyticsWithDefault" }] : /* istanbul ignore next */ []));
        effect(() => {
            const analytics = analyticsWithDefault();
            if (analytics === true) {
                privacyPreferences.launch();
            }
            else if (analytics) {
                consent.updateCategories(analytics);
            }
        });
        effect(() => {
            if (analyticsWithDefault() === true) {
                this.consentChange.emit(consent.categories());
            }
        });
        // Enable screen size notice
        if (options.screenSizeNotice) {
            initializeScreenSizeNoticeMonitor(options.screenSizeNotice, this.disableScreenSizeNotice);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.26", ngImport: i0, type: BaseApplicationComponent, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.2.26", type: BaseApplicationComponent, isStandalone: true, inputs: { assetHref: { classPropertyName: "assetHref", publicName: "assetHref", isSignal: true, isRequired: false, transformFunction: null }, pageHref: { classPropertyName: "pageHref", publicName: "pageHref", isSignal: true, isRequired: false, transformFunction: null }, analytics: { classPropertyName: "analytics", publicName: "analytics", isSignal: true, isRequired: false, transformFunction: null }, disableScreenSizeNotice: { classPropertyName: "disableScreenSizeNotice", publicName: "disableScreenSizeNotice", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { consentChange: "consentChange" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.26", ngImport: i0, type: BaseApplicationComponent, decorators: [{
            type: Directive,
            args: [{}]
        }], ctorParameters: () => [{ type: undefined }], propDecorators: { assetHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "assetHref", required: false }] }], pageHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "pageHref", required: false }] }], analytics: [{ type: i0.Input, args: [{ isSignal: true, alias: "analytics", required: false }] }], disableScreenSizeNotice: [{ type: i0.Input, args: [{ isSignal: true, alias: "disableScreenSizeNotice", required: false }] }], consentChange: [{ type: i0.Output, args: ["consentChange"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BaseApplicationComponent, initializeScreenSizeNoticeMonitor };
//# sourceMappingURL=hra-ui-application.mjs.map
