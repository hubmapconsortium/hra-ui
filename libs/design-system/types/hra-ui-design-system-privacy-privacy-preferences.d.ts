import * as _angular_core from '@angular/core';
import { ConsentCategories } from '@hra-ui/common/analytics';

/** Tab identifiers */
type PrivacyPreferencesTab = 'consent' | 'manage';
/** Interface of data passed to the Privacy Preferences Modal */
interface PrivacyPreferencesData {
    /** Categories */
    categories: ConsentCategories;
    /**
     * Privacy preferences tab
     */
    tab?: PrivacyPreferencesTab;
}
/** Result type returned when the Privacy Preferences Modal is closed */
type PrivacyPreferencesResult = 'allow-all' | 'allow-necessary' | 'dismiss' | ConsentCategories;
/**
 * Privacy Preferences Modal Component
 */
declare class PrivacyPreferencesComponent {
    /** Injected data */
    protected readonly data: PrivacyPreferencesData;
    /** Tab index */
    protected readonly tabIndex: _angular_core.WritableSignal<number>;
    /** Categories */
    protected readonly categories: _angular_core.WritableSignal<ConsentCategories>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PrivacyPreferencesComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PrivacyPreferencesComponent, "hra-privacy-preferences", never, {}, {}, never, never, true, never>;
}

export { PrivacyPreferencesComponent };
export type { PrivacyPreferencesData, PrivacyPreferencesResult, PrivacyPreferencesTab };
