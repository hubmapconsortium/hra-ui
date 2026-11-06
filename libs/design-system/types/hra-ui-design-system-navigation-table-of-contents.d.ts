import * as _hra_ui_design_system_content_templates_page_section from '@hra-ui/design-system/content-templates/page-section';
import * as _angular_core from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';

/** Table of contents options */
interface TableOfContentsOptions {
    /** Whether links render as a Material navigation list, like AtlasNG's table of contents */
    navList: boolean;
}
/** Injection token for table of contents options */
declare const TABLE_OF_CONTENTS_OPTIONS: InjectionToken<TableOfContentsOptions>;
/**
 * Provides table of contents options
 *
 * @param options Table of contents options
 * @returns A provider for the options
 */
declare function provideTableOfContentsOptions(options: TableOfContentsOptions): Provider;
/**
 * Table of contents component for navigating between different sections on a page
 */
declare class TableOfContentsComponent {
    /** Title for the table of content */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Whether the table of contents is shown in a side column beside the page content */
    readonly sideColumn: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Table of contents options */
    protected readonly options: TableOfContentsOptions;
    /** All page sections sorted by dom order */
    protected readonly sections: _angular_core.Signal<_hra_ui_design_system_content_templates_page_section.PageSectionInstance[]>;
    /** Currently active section */
    protected readonly activeSection: _angular_core.Signal<_hra_ui_design_system_content_templates_page_section.PageSectionInstance | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TableOfContentsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TableOfContentsComponent, "hra-table-of-contents", never, { "tagline": { "alias": "tagline"; "required": false; "isSignal": true; }; "sideColumn": { "alias": "sideColumn"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { TABLE_OF_CONTENTS_OPTIONS, TableOfContentsComponent, provideTableOfContentsOptions };
export type { TableOfContentsOptions };
