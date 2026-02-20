import * as _angular_core from '@angular/core';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';

/** Label for a page section. Can also be used standalone */
declare class PageLabelComponent {
    /** Label */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Which level of <hx> to use */
    readonly level: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Icons to display as part of the label */
    readonly icons: _angular_core.InputSignalWithTransform<{
        component: "Icon";
        classes?: string | string[] | Record<string, any> | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    }[], string | {
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    } | (string | {
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    })[] | undefined>;
    /** Anchor id of this label */
    readonly anchor: _angular_core.InputSignal<string | undefined>;
    /** Breadcrumbs to display above the label */
    readonly breadcrumbs: _angular_core.InputSignal<BreadcrumbItem[] | undefined>;
    /** Date to display below the label */
    readonly date: _angular_core.InputSignal<string | undefined>;
    /** Tags/labels to display below the date */
    readonly tags: _angular_core.InputSignal<string[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PageLabelComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PageLabelComponent, "hra-page-label", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "level": { "alias": "level"; "required": false; "isSignal": true; }; "icons": { "alias": "icons"; "required": false; "isSignal": true; }; "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "breadcrumbs": { "alias": "breadcrumbs"; "required": false; "isSignal": true; }; "date": { "alias": "date"; "required": false; "isSignal": true; }; "tags": { "alias": "tags"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { PageLabelComponent };
