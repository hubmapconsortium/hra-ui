import * as i0 from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';

/** Table of contents layout options */
interface TableOfContentsLayoutOptions {
    /** Media query at which the table of contents moves into a side column beside the page content */
    sideColumnQuery: string;
}
/** Injection token for table of contents layout options */
declare const TABLE_OF_CONTENTS_LAYOUT_OPTIONS: InjectionToken<TableOfContentsLayoutOptions>;
/**
 * Provides table of contents layout options
 *
 * @param options Table of contents layout options
 * @returns A provider for the options
 */
declare function provideTableOfContentsLayoutOptions(options: TableOfContentsLayoutOptions): Provider;
/** Table of contents layout header */
declare class TableOfContentsLayoutHeaderComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContentsLayoutHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableOfContentsLayoutHeaderComponent, "hra-table-of-contents-layout-header", never, {}, {}, never, ["*"], true, never>;
}
/** Table of contents layout */
declare class TableOfContentsLayoutComponent {
    /** Whether the screen matches the side column query (1100px and up by default) */
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

export { TABLE_OF_CONTENTS_LAYOUT_OPTIONS, TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent, TableOfContentsLayoutModule, provideTableOfContentsLayoutOptions };
export type { TableOfContentsLayoutOptions };
