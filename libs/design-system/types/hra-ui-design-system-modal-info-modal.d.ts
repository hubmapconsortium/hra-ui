import * as _angular_core from '@angular/core';

/** An item which defines a string label and a string value */
interface DataItem {
    /** A string property that represents the label */
    label: string;
    /** A string property that represents the value */
    value: string;
}
/**
 * Modal to display all available information about specific areas of a dataset.
 * The title names the modal for screen readers and doesn't show.
 */
declare class InfoModalComponent {
    /** List of data items to display */
    readonly data: _angular_core.InputSignal<DataItem[]>;
    /** Title of modal, which names it for screen readers */
    readonly title: _angular_core.InputSignal<string>;
    /** Label and tooltip of the close button */
    readonly closeLabel: _angular_core.InputSignal<string>;
    /** Emits when close icon clicked */
    readonly close: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<InfoModalComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<InfoModalComponent, "hra-info-modal", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": true; "isSignal": true; }; "closeLabel": { "alias": "closeLabel"; "required": false; "isSignal": true; }; }, { "close": "close"; }, never, never, true, never>;
}

export { InfoModalComponent };
export type { DataItem };
