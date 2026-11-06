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
    /**
     * Whether opening and closing cross-fade between the page and the fullscreen view in a view transition,
     * where the browser supports them. The old view stays on screen until the app is stable after the change,
     * so content that resizes itself for the new view can finish first by marking that work with `PendingTasks`.
     */
    readonly viewTransition: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Event for before the dialog is opened */
    readonly beforeOpened: _angular_core.OutputEmitterRef<void>;
    /** Event for when the dialog is opened */
    readonly opened: _angular_core.OutputEmitterRef<void>;
    /** Event for before the dialog is closed */
    readonly beforeClosed: _angular_core.OutputEmitterRef<void>;
    /** Event for when the dialog is closed */
    readonly closed: _angular_core.OutputEmitterRef<void>;
    /**
     * Event for when opening or closing has finished, including its view transition. Content can wait for it to
     * start slow work, so the work doesn't hold up the transition.
     */
    readonly transitionEnded: _angular_core.OutputEmitterRef<void>;
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
    /** Reference to the document, used to start view transitions */
    private readonly document;
    /** Reference to the application, used to wait until the content settles in a view transition */
    private readonly appRef;
    /** Reference to the zone, used to open and close the dialog in it from a view transition */
    private readonly ngZone;
    /** Reference to the view outlet directive */
    private readonly viewOutlet;
    /** Reference to the view content template */
    private readonly contentTemplateRef;
    /** Reference to the view dialog template */
    private readonly dialogTemplateRef;
    /** Reference to the mat dialog */
    private dialogRef?;
    /** Whether a view transition is opening or closing the dialog */
    private transitioning;
    /** Whether the component was destroyed, so a view transition that finishes later doesn't emit */
    private destroyed;
    /** Destroys the view */
    constructor();
    /** Detaches the view from histogram module and attaches it to the view in the dialog */
    open(): void;
    /** Closes the dialog */
    close(): void;
    /**
     * Opens the dialog
     *
     * @returns Reference to the opened dialog
     */
    private openDialog;
    /**
     * Opens or closes the dialog, in a view transition when enabled and supported
     *
     * @param change Opens or closes the dialog and returns an observable that emits once it has
     */
    private runTransition;
    /**
     * Whether opening and closing run in view transitions
     *
     * @returns True if view transitions are enabled and the browser supports them
     */
    private useViewTransition;
    /** Filters the dialog event based on provided dialog reference */
    private filterDialogEvents;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FullscreenPortalComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FullscreenPortalComponent, "hra-fullscreen-portal", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "panelClass": { "alias": "panelClass"; "required": false; "isSignal": true; }; "viewTransition": { "alias": "viewTransition"; "required": false; "isSignal": true; }; }, { "beforeOpened": "beforeOpened"; "opened": "opened"; "beforeClosed": "beforeClosed"; "closed": "closed"; "transitionEnded": "transitionEnded"; }, never, ["hra-fullscreen-portal-content", "hra-fullscreen-actions"], true, never>;
}

export { FullscreenActionsComponent, FullscreenPortalComponent, FullscreenPortalContentComponent, ViewOutletDirective };
