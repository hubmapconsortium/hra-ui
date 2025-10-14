import * as _angular_core from '@angular/core';
import { ViewRef } from '@angular/core';

/** View outlet directive */
declare class ViewOutletDirective {
    /** view reference input */
    readonly viewRef: _angular_core.InputSignal<ViewRef | undefined>;
    /** Reference of the view container */
    private readonly viewContainerRef;
    /** Attaches the view */
    constructor();
    /** Attaches the view to the view container */
    attach(): void;
    /** Detaches the view from the view container */
    detach(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ViewOutletDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ViewOutletDirective, "[hraViewOutlet]", never, { "viewRef": { "alias": "hraViewOutlet"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/** Fullscreen actions component */
declare class FullscreenActionsComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FullscreenActionsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FullscreenActionsComponent, "hra-fullscreen-actions", never, {}, {}, never, ["*"], true, never>;
}
/** Fullscreen portal content component */
declare class FullscreenPortalContentComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FullscreenPortalContentComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FullscreenPortalContentComponent, "hra-fullscreen-portal-content", never, {}, {}, never, ["*"], true, never>;
}
/** Fullscreen Component */
declare class FullscreenPortalComponent {
    /** Heading of the dialog */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Classes to apply to the dialog panel in fullscreen mode */
    readonly panelClass: _angular_core.InputSignal<string | string[] | undefined>;
    /** Event for before the dialog is opened */
    readonly beforeOpened: _angular_core.OutputEmitterRef<void>;
    /** Event for when the dialog is opened */
    readonly opened: _angular_core.OutputEmitterRef<void>;
    /** Event for before the dialog is closed */
    readonly beforeClosed: _angular_core.OutputEmitterRef<void>;
    /** Event for when the dialog is closed */
    readonly closed: _angular_core.OutputEmitterRef<void>;
    /** Creates embedded view using template */
    readonly viewRef: _angular_core.Signal<_angular_core.EmbeddedViewRef<void>>;
    /** Rootnodes of the view reference */
    readonly rootNodes: _angular_core.Signal<any[]>;
    /** Reference to the mat dialog */
    private readonly dialogService;
    /** Reference to the view container */
    private readonly viewContainerRef;
    /** Reference to the destroy ref */
    private readonly destroyRef;
    /** Reference to the view outlet directive */
    private readonly viewOutlet;
    /** Reference to the view content template */
    private readonly contentTemplateRef;
    /** Reference to the view dialog template */
    private readonly dialogTemplateRef;
    /** Reference to the mat dialog */
    private dialogRef?;
    /** Destroys the view */
    constructor();
    /** Detaches the view from histogram module and attaches it to the view in the dialog */
    open(): void;
    /** Closes the dialog */
    close(): void;
    /** Filters the dialog event based on provided dialog reference */
    private filterDialogEvents;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FullscreenPortalComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FullscreenPortalComponent, "hra-fullscreen-portal", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "panelClass": { "alias": "panelClass"; "required": false; "isSignal": true; }; }, { "beforeOpened": "beforeOpened"; "opened": "opened"; "beforeClosed": "beforeClosed"; "closed": "closed"; }, never, ["hra-fullscreen-portal-content", "hra-fullscreen-actions"], true, never>;
}

export { FullscreenActionsComponent, FullscreenPortalComponent, FullscreenPortalContentComponent, ViewOutletDirective };
