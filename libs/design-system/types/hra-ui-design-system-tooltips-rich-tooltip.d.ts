import * as i0 from '@angular/core';
import { OutputEmitterRef, TemplateRef } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';

/**
 * Interface for the Rich Tooltip Directive.
 * (used in providing context to the tooltip component)
 */
interface RichTooltipController {
    /**
     * Signal for the tagline text.
     * @returns Tagline text.
     */
    tagline: () => string | undefined;
    /**
     * Signal for the description text.
     * @returns Description text.
     */
    description: () => string | undefined;
    /**
     * Signal for the action button text.
     * @returns Action button text.
     */
    actionText: () => string | undefined;
    /** Signal for positions array to use for the tooltip */
    positions: () => ConnectedPosition[] | undefined;
    /**
     * Output emitter reference for emitting action button click event.
     */
    actionClick: OutputEmitterRef<void>;
    /**
     * Function to open the tooltip.
     */
    open(): void;
    /**
     * Function to close the tooltip.
     */
    close(): void;
    /**
     * Function to toggle the visibility of the tooltip.
     */
    toggle(): void;
}

/**
 * Component for the Rich Tooltip Tagline
 */
declare class RichTooltipTaglineComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipTaglineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTooltipTaglineComponent, "hra-rich-tooltip-tagline", never, {}, {}, never, ["*"], true, never>;
}
/**
 * Component for the Rich Tooltip Content
 */
declare class RichTooltipContentComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTooltipContentComponent, "hra-rich-tooltip-content", never, {}, {}, never, ["*"], true, never>;
}
/**
 * Component for the Rich Tooltip actions row
 */
declare class RichTooltipActionsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTooltipActionsComponent, "hra-rich-tooltip-actions", never, {}, {}, never, ["*"], true, never>;
}
/**
 * Directive that can be used on a button
 * for closing the rich tooltip.
 */
declare class RichTooltipCloseDirective {
    /**
     * The controller for the rich tooltip.
     * (context is set by component once initialized)
     */
    controller?: RichTooltipController;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipCloseDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RichTooltipCloseDirective, "[hraRichTooltipClose]", never, {}, {}, never, never, true, never>;
}
/**
 * The main component of the Rich Tooltip - the container,
 * encapsulates all the other components (tagline, content & actions).
 */
declare class RichTooltipContainerComponent {
    /**
     * ViewChild for the container template.
     */
    readonly template: i0.Signal<TemplateRef<any>>;
    /**
     * List of close directives used in the custom template.
     */
    readonly closeDirectives: i0.Signal<readonly RichTooltipCloseDirective[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RichTooltipContainerComponent, "hra-rich-tooltip-container", ["hraRichTooltipContainer"], {}, {}, ["closeDirectives"], ["hra-rich-tooltip-tagline", "hra-rich-tooltip-content", "hra-rich-tooltip-actions"], true, never>;
}

/**
 * HRA Rich Tooltip Directive
 */
declare class RichTooltipDirective implements RichTooltipController {
    /**
     * Custom content for the rich tooltip
     * - Not required if need to use simple content variant
     */
    readonly customContainer: i0.InputSignal<RichTooltipContainerComponent | undefined>;
    /**
     * Title for the rich tooltip
     * - Not required if using custom content variant
     */
    readonly tagline: i0.InputSignal<string>;
    /**
     * Description for the rich tooltip
     * - Not required if using the custom content variant
     */
    readonly description: i0.InputSignal<string>;
    /**
     * Action Text for the rich tooltip
     * - Not required if using the custom content variant
     */
    readonly actionText: i0.InputSignal<string>;
    /**
     * Positions array for the rich tooltip
     */
    readonly positions: i0.InputSignal<ConnectedPosition[]>;
    /**
     * Action Click Output Emitter for the rich tooltip
     * - Not required to be subscribed to if using the custom content variant
     */
    readonly actionClick: i0.OutputEmitterRef<void>;
    /**
     * Element Ref for the rich tooltip
     */
    private readonly elementRef;
    /**
     * Container view reference variable DI
     */
    private readonly viewContainerRef;
    /**
     * Overlay DI variable
     */
    private readonly overlay;
    /**
     * Position strategy for the rich tooltip
     */
    private readonly positionStrategy;
    /**
     * Reference variable for the overlay
     */
    private readonly overlayRef;
    /**
     * Boolean flag indicating whether the
     * rich tooltip is currently visible
     */
    private isOpen;
    /**
     * Container element variable for the rich tooltip
     */
    private container;
    /**
     * Constructor for the directive
     */
    constructor();
    /**
     * Function to open the rich tooltip.
     */
    open(): void;
    /**
     * Function to close the rich tooltip.
     */
    close(): void;
    /**
     * Function to toggles the rich tooltip.
     */
    toggle(): void;
    /**
     * Attaches the rich tooltip component to the overlay.
     */
    private attach;
    /**
     * Detaches the rich tooltip component from the overlay.
     */
    private detach;
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RichTooltipDirective, "[hraRichTooltip]", never, { "customContainer": { "alias": "hraRichTooltip"; "required": false; "isSignal": true; }; "tagline": { "alias": "hraRichTooltipTagline"; "required": false; "isSignal": true; }; "description": { "alias": "hraRichTooltipDescription"; "required": false; "isSignal": true; }; "actionText": { "alias": "hraRichTooltipActionText"; "required": false; "isSignal": true; }; "positions": { "alias": "hraRichTooltipPositions"; "required": false; "isSignal": true; }; }, { "actionClick": "hraRichTooltipActionClick"; }, never, never, true, never>;
}

declare class RichTooltipModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<RichTooltipModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RichTooltipModule, never, [typeof RichTooltipDirective, typeof RichTooltipTaglineComponent, typeof RichTooltipContentComponent, typeof RichTooltipActionsComponent, typeof RichTooltipCloseDirective, typeof RichTooltipContainerComponent], [typeof RichTooltipDirective, typeof RichTooltipTaglineComponent, typeof RichTooltipContentComponent, typeof RichTooltipActionsComponent, typeof RichTooltipCloseDirective, typeof RichTooltipContainerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RichTooltipModule>;
}

export { RichTooltipActionsComponent, RichTooltipCloseDirective, RichTooltipContainerComponent, RichTooltipContentComponent, RichTooltipDirective, RichTooltipModule, RichTooltipTaglineComponent };
