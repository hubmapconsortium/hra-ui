import * as _hra_ui_design_system_content_templates_page_section from '@hra-ui/design-system/content-templates/page-section';
import * as _angular_core from '@angular/core';

/**
 * Table of contents component for navigating between different sections on a page
 */
declare class TableOfContentsComponent {
    /** Title for the table of content */
    readonly tagline: _angular_core.InputSignal<string>;
    /** All page sections sorted by dom order */
    protected readonly sections: _angular_core.Signal<_hra_ui_design_system_content_templates_page_section.PageSectionInstance[]>;
    /** Currently active section */
    protected readonly activeSection: _angular_core.Signal<_hra_ui_design_system_content_templates_page_section.PageSectionInstance | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TableOfContentsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TableOfContentsComponent, "hra-table-of-contents", never, { "tagline": { "alias": "tagline"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { TableOfContentsComponent };
