import * as _hra_ui_common_types_hra_ui_common_analytics_events from '@hra-ui/common/types/hra-ui-common-analytics-events';
import * as _angular_core from '@angular/core';
import { Signal } from '@angular/core';
import { ConsentCategories } from '@hra-ui/common/analytics';

/** Options for screen size notice */
interface ScreenSizeNoticeOptions {
    /** Minimum screen width to not display the screen size notice */
    width: number;
    /** Minimum screen height to not display the screen size notice. Leave it out to check the width only. */
    height?: number;
    /**
     * Local storage key that remembers a dismissed notice. Defaults to the key all HRA apps share,
     * so a notice dismissed in one app stays dismissed in the others.
     */
    storageKey?: string;
}
/** Monitors screen size and opens/closes screen size notice dialog as needed */
declare function initializeScreenSizeNoticeMonitor(options: ScreenSizeNoticeOptions, disabled?: Signal<boolean>): void;

/** Base application options */
interface BaseApplicationOptions {
    /** Whether to show/hide the privacy preferences popups by default */
    analytics?: boolean;
    /** Screen size notice width and height */
    screenSizeNotice?: ScreenSizeNoticeOptions;
}
/**
 * Base component for all application
 */
declare abstract class BaseApplicationComponent {
    /** Asset base url */
    readonly assetHref: _angular_core.InputSignal<string | undefined>;
    /** Page base url */
    readonly pageHref: _angular_core.InputSignal<string | undefined>;
    /** Whether analytics is enabled/disabled or the specific analytics settings */
    readonly analytics: _angular_core.InputSignalWithTransform<boolean | Partial<Record<_hra_ui_common_types_hra_ui_common_analytics_events.EventCategory, boolean>> | undefined, unknown>;
    /** Whether to disable the screen size notice popup */
    readonly disableScreenSizeNotice: _angular_core.InputSignalWithTransform<boolean, any>;
    /** Emits when the user changes their consent settings */
    readonly consentChange: _angular_core.OutputEmitterRef<ConsentCategories>;
    /** Initialize the application component */
    constructor(options?: BaseApplicationOptions);
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BaseApplicationComponent, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BaseApplicationComponent, never, never, { "assetHref": { "alias": "assetHref"; "required": false; "isSignal": true; }; "pageHref": { "alias": "pageHref"; "required": false; "isSignal": true; }; "analytics": { "alias": "analytics"; "required": false; "isSignal": true; }; "disableScreenSizeNotice": { "alias": "disableScreenSizeNotice"; "required": false; "isSignal": true; }; }, { "consentChange": "consentChange"; }, never, never, true, never>;
}

export { BaseApplicationComponent, initializeScreenSizeNoticeMonitor };
export type { BaseApplicationOptions };
