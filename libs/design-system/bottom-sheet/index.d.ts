import { TableRow, TableColumn } from '@hra-ui/design-system/table';
import * as i0 from '@angular/core';
import * as _angular_material_bottom_sheet from '@angular/material/bottom-sheet';

/**
 * Interface for individual page section data
 */
interface PageSectionData {
    /** Tagline for the page section */
    tagline: string;
    /** Optional content text for the section */
    content?: string;
}
/**
 * Interface for the Table Bottom Sheet Data
 */
interface TableBottomSheetData {
    /** Variant of the bottom sheet data */
    variant: 'table';
    /** rows for the table */
    rows: TableRow[];
    /** columns for the table */
    columns: TableColumn[];
    /** Optional flag to hide headers */
    hideHeaders?: boolean;
}
/**
 * Interface for the Page Section Bottom Sheet Data (single section)
 */
interface SinglePageSectionBottomSheetData {
    /** Variant of the bottom sheet data */
    variant: 'page-section';
    /** Tagline for the page section */
    tagline: string;
    /** Optional content text for the section */
    content?: string;
}
/**
 * Interface for the Multiple Page Sections Bottom Sheet Data
 */
interface MultiplePageSectionsBottomSheetData {
    /** Variant of the bottom sheet data */
    variant: 'page-sections';
    /** Array of page sections */
    sections: PageSectionData[];
}
/**
 * Union type for the Bottom Sheet Data
 */
type BottomSheetData = TableBottomSheetData | SinglePageSectionBottomSheetData | MultiplePageSectionsBottomSheetData;
/**
 * Bottom Sheet Component
 * Displays a bottom sheet with either a table, single page section, or multiple page sections based on the provided data.
 */
declare class BottomSheetComponent {
    /** Reference to the bottom sheet */
    private readonly _bottomSheetRef;
    /** Data injected into the bottom sheet */
    protected readonly data: BottomSheetData;
    /** Function to close the bottom sheet */
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BottomSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BottomSheetComponent, "hra-bottom-sheet", never, {}, {}, never, never, true, never>;
}

/**
 * Service to handle bottom sheet operations.
 * Provides methods to open different types of bottom sheets.
 */
declare class BottomSheetService {
    /** Injects the MatBottomSheet service to open bottom sheets */
    private readonly _bottomSheet;
    /**
     * Opens a table bottom sheet with the provided rows and columns.
     * @param rows - The table rows to display
     * @param columns - The table columns to display
     * @param hideHeaders - Whether to hide table headers
     */
    openTableBottomSheet(rows: TableRow[], columns: TableColumn[], hideHeaders?: boolean): _angular_material_bottom_sheet.MatBottomSheetRef<BottomSheetComponent, any>;
    /**
     * Opens a page section bottom sheet with the provided tagline.
     * @param tagline - The tagline to display in the page section
     * @param content - Optional content text for the section
     */
    openPageSectionBottomSheet(tagline: string, content?: string): _angular_material_bottom_sheet.MatBottomSheetRef<BottomSheetComponent, any>;
    /**
     * Opens a multiple page sections bottom sheet with the provided sections.
     * @param sections - Array of page section data
     */
    openMultiplePageSectionsBottomSheet(sections: PageSectionData[]): _angular_material_bottom_sheet.MatBottomSheetRef<BottomSheetComponent, any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BottomSheetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BottomSheetService>;
}

export { BottomSheetComponent, BottomSheetService };
export type { BottomSheetData, PageSectionData };
