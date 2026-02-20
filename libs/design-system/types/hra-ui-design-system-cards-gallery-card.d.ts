import * as _angular_core from '@angular/core';

/**
 * Gallery card component for displaying content with images, dates, and tags
 */
declare class GalleryCardComponent {
    /** Title/tagline text */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Image source URL to display at the top */
    readonly imageSrc: _angular_core.InputSignal<string>;
    /** Date to display */
    readonly date: _angular_core.InputSignal<string>;
    /** URL for the tagline link */
    readonly link: _angular_core.InputSignal<string>;
    /** Whether the link opens in new tab */
    readonly external: _angular_core.InputSignal<boolean>;
    /** Tags to display */
    readonly tags: _angular_core.InputSignal<string[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GalleryCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GalleryCardComponent, "hra-gallery-card", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "imageSrc": { "alias": "imageSrc"; "required": true; "isSignal": true; }; "date": { "alias": "date"; "required": true; "isSignal": true; }; "link": { "alias": "link"; "required": true; "isSignal": true; }; "external": { "alias": "external"; "required": false; "isSignal": true; }; "tags": { "alias": "tags"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { GalleryCardComponent };
