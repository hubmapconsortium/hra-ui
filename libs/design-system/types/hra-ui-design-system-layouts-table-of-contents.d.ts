import * as i0 from '@angular/core';

/** Table of contents layout header */
declare class TableOfContentsLayoutHeaderComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContentsLayoutHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableOfContentsLayoutHeaderComponent, "hra-table-of-contents-layout-header", never, {}, {}, never, ["*"], true, never>;
}
/** Table of contents layout */
declare class TableOfContentsLayoutComponent {
    /** Whether the screen width is currently greater than or equal to 1100px */
    protected isWideScreen: i0.Signal<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContentsLayoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableOfContentsLayoutComponent, "hra-table-of-contents-layout", never, {}, {}, never, ["hra-table-of-contents-layout-header", "*"], true, never>;
}

/** Table of contents modules */
declare class TableOfContentsLayoutModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContentsLayoutModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TableOfContentsLayoutModule, never, [typeof TableOfContentsLayoutComponent, typeof TableOfContentsLayoutHeaderComponent], [typeof TableOfContentsLayoutComponent, typeof TableOfContentsLayoutHeaderComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TableOfContentsLayoutModule>;
}

export { TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent, TableOfContentsLayoutModule };
