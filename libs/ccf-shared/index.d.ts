import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, EventEmitter, ElementRef, OnChanges, SimpleChanges, InjectionToken, OnInit, Signal } from '@angular/core';
import { SpatialSceneNode, DatabaseStatus, OntologyTree, SpatialEntity, Filter, TissueBlock, AggregateCount, FilterSexEnum } from '@hra-api/ng-client';
import { NodeDragEvent, NodeClickEvent, BodyUI } from 'ccf-body-ui';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import { ObservableInput, Observable, BehaviorSubject } from 'rxjs';
import * as i4 from '@angular/material/autocomplete';
import * as i5 from '@angular/material/form-field';
import * as i6 from '@angular/material/input';
import * as i3$1 from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import * as i4$1 from '@angular/material/icon';
import * as i5$1 from '@angular/material/expansion';
import * as i6$1 from '@angular/youtube-player';
import * as i7 from 'ngx-markdown';
import * as i5$2 from '@angular/material/card';
import { Immutable } from '@angular-ru/cdk/typings';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { ImmutableStateValue, ImmutablePatchValue } from '@angular-ru/ngxs/typings';
import { Observable as Observable$1 } from 'rxjs/internal/Observable';
import * as i3$2 from '@ngxs/store';
import { NgxsOnInit, StateContext } from '@ngxs/store';
import * as i2$1 from '@hra-ui/common';

/** x, y, z coordinage triplet */
interface XYZTriplet<T = number> {
    /** X coordinate */
    x: T;
    /** Y coordinate */
    y: T;
    /** Z coordinate */
    z: T;
}
/**
 * Component that handles displaying the 3D models in the stage
 */
declare class BodyUiComponent implements AfterViewInit, OnDestroy {
    /** HTML class name */
    readonly clsName = "ccf-body-ui";
    /** Get scene nodes */
    get scene(): SpatialSceneNode[];
    /** Set scene nodes */
    set scene(nodes: SpatialSceneNode[]);
    /** Get scene rotation */
    get rotation(): number;
    /** Set scene rotation */
    set rotation(value: number);
    /** Get scene x rotation */
    get rotationX(): number;
    /** Set scene x rotation */
    set rotationX(value: number);
    /** Get scene zoom */
    get zoom(): number;
    /** Set scene zoom */
    set zoom(value: number);
    /** Get scene target */
    get target(): [number, number, number];
    /** Set scene target */
    set target(value: [number, number, number]);
    /** Get scene bounds */
    get bounds(): XYZTriplet;
    /** Set scene bounds */
    set bounds(value: XYZTriplet);
    /** Get scene camera */
    get camera(): string;
    /** Set scene camera */
    set camera(value: string);
    /** Emits when the scene is rotated */
    readonly rotationChange: EventEmitter<[number, number]>;
    /** Emits when a node is dragged */
    readonly nodeDrag: EventEmitter<NodeDragEvent>;
    /** Emits when a node is clicked */
    readonly nodeClick: EventEmitter<NodeClickEvent>;
    /** Emits when a node is hovered */
    readonly nodeHoverStart: EventEmitter<SpatialSceneNode>;
    /** Emits when a node is no longer hovered */
    readonly nodeHoverStop: EventEmitter<SpatialSceneNode>;
    /** Emits once the scene is initialized */
    readonly initialized: EventEmitter<void>;
    /** Get whether the scene is interactive */
    get interactive(): boolean;
    /** Set whether the scene is interactive */
    set interactive(value: boolean);
    /** Whether the scene is interactive */
    private _interactive;
    /** Current rotation */
    private _rotation;
    /** Current x rotation */
    private _rotationX;
    /** Current zoom level */
    private _zoom;
    /** Current target */
    private _target;
    /** Current bounds */
    private _bounds;
    /** Scene nodes */
    private _scene;
    /** Subscriptions */
    private subscriptions;
    /** Camera */
    private _camera;
    /**
     * Instance of the body UI class for rendering the deckGL scene
     */
    bodyUI: BodyUI;
    /**
     * Reference to the div we are using to mount the body UI to.
     */
    bodyCanvas: ElementRef<HTMLCanvasElement>;
    /**
     * Performs setup required after initialization
     */
    ngAfterViewInit(): void;
    /** Zoom to bounds */
    zoomToBounds(bounds: XYZTriplet, margin?: {
        x: number;
        y: number;
    }): void;
    /**
     * Set up required to render the body UI with the scene nodes.
     */
    private setupBodyUI;
    /** Reinitializes the body ui */
    private recreateBodyUI;
    /** Cleans up subscriptions */
    private clearSubscriptions;
    /** Cleans up the component */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BodyUiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BodyUiComponent, "ccf-body-ui", never, { "scene": { "alias": "scene"; "required": false; }; "rotation": { "alias": "rotation"; "required": false; }; "rotationX": { "alias": "rotationX"; "required": false; }; "zoom": { "alias": "zoom"; "required": false; }; "target": { "alias": "target"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "camera": { "alias": "camera"; "required": false; }; "interactive": { "alias": "interactive"; "required": false; }; }, { "rotationChange": "rotationChange"; "nodeDrag": "nodeDrag"; "nodeClick": "nodeClick"; "nodeHoverStart": "nodeHoverStart"; "nodeHoverStop": "nodeHoverStop"; "initialized": "initialized"; }, never, never, false, never>;
}

declare class BodyUiModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BodyUiModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BodyUiModule, [typeof BodyUiComponent], [typeof i2.CommonModule], [typeof BodyUiComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BodyUiModule>;
}

/** A range which should have the specified classes and styles applied */
interface DecoratedRange {
    /** Start index of range (inclusive). Negative indicies are allowed. */
    start: number;
    /** End index of range (exclusive). Negative indicies are allowed. */
    end: number;
    /** Classes to add */
    classes: string[];
    /** Styles to set */
    styles: Record<string, unknown>;
}

/** A segment of text with additional classes and styles */
interface Segment {
    /** The piece of text to display */
    text: string;
    /** Classes to add to the text container */
    classes: string[];
    /** Styles to set on the text container */
    styles: Record<string, unknown>;
}
/**
 * Class to display text with additional styling on ranges of the text.
 */
declare class DecoratedTextComponent implements OnChanges {
    /** HTML class name */
    readonly clsName = "ccf-decorated-text";
    /**
     * Text to display
     */
    text: string;
    /**
     * Classes and styles to apply to ranges of the text.
     * For overlapping ranges later values takes precedence.
     */
    decorations?: Partial<DecoratedRange>[];
    /**
     * Computed segments of text with decorations resolved.
     */
    segments: Segment[];
    /**
     * Apply changes and recalculate cached values.
     *
     * @param changes Instance properties that have changed
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Creates an array of decorated text segments based on
     * the latest text and decorations.
     *
     * @returns The new segments
     */
    private createSegments;
    /**
     * Creates an ordered array of stack operations to apply when building segments.
     *
     * @param ranges The decorated ranges to apply
     * @returns The array of operations
     */
    private createStackOps;
    /**
     * Applies the stack changes specified by the stack operation.
     *
     * @param stack The current stack
     * @param op The operation
     * @returns The new stack
     */
    private updateStack;
    /**
     * Normalizes and filters valid decorated ranges.
     *
     * @returns The normalized ranges with properties filled
     */
    private getNormalizedDecorations;
    /**
     * Creates a segment without any decoration
     *
     * @param text The text for the segment
     * @returns A segment without any decoration
     */
    private makeUndecoratedSegment;
    /**
     * Creates a segment with decoration
     *
     * @param text The text for the segment
     * @param decorations Decorations for this segment
     * @returns A decorated segment
     */
    private makeDecoratedSegment;
    static ɵfac: i0.ɵɵFactoryDeclaration<DecoratedTextComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DecoratedTextComponent, "ccf-decorated-text", never, { "text": { "alias": "text"; "required": false; }; "decorations": { "alias": "decorations"; "required": false; }; }, {}, never, never, false, never>;
}

declare class DecoratedTextModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DecoratedTextModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DecoratedTextModule, [typeof DecoratedTextComponent], [typeof i2.CommonModule], [typeof DecoratedTextComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DecoratedTextModule>;
}

/** Key-Value pair */
type KVPair<T = unknown> = [string, T];
/** Array of Key-Value pairs */
type KVList<T = unknown> = KVPair<T>[];
/**
 * Simple component for displaying the current values in the data store.
 */
declare class StoreDebugComponent implements OnDestroy {
    /** HTML class name */
    readonly clsName = "ccf-store-debug";
    /**
     * Gets the store data as a list of state name to key-value pairs
     */
    get data(): KVList<KVList>;
    /** Latest store data */
    private root;
    /** Subscriptions managed by this component */
    private readonly subscriptions;
    /**
     * Creates an instance of store debug component.
     * Sets up the store data listeners.
     *
     * @param store The data store.
     * @param cdr Change detection for this component.
     */
    constructor();
    /**
     * Cleans up subscriptions
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreDebugComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreDebugComponent, "ccf-store-debug", never, {}, {}, never, never, false, never>;
}

declare class StoreDebugModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreDebugModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StoreDebugModule, [typeof StoreDebugComponent], [typeof i2.CommonModule], [typeof StoreDebugComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StoreDebugModule>;
}

/** A single suggestion to show in autocomplete  */
interface AutoCompleteOption {
    /** A unique id */
    id: unknown;
    /** The displayed label */
    label: string;
    /** Optional styling of the label */
    decorations?: Partial<DecoratedRange>[];
}
/**
 * Token to provide a default for the maximum number of
 * autocomplete suggestions to show at the same time.
 */
declare const DEFAULT_MAX_OPTIONS: InjectionToken<number>;
/**
 * A text search bar with optional autocompletion functionality.
 */
declare class TextSearchComponent {
    private readonly defaultMaxOptions;
    /** HTML class name */
    readonly clsName = "ccf-text-search";
    /**
     * Placeholder text for the search bar
     */
    placeholder: string;
    /**
     * The text to show on the search bar
     */
    get value(): string;
    set value(val: string);
    /**
     * Maximum number of autocomplete suggestions to show simultaneously
     */
    maxOptions?: number;
    /**
     * Function providing the autocomplete suggestions.
     * Receives the latest search bar text and the maximum of suggestions to provide.
     */
    autoCompleter?: (search: string, max: number) => ObservableInput<AutoCompleteOption[]>;
    /**
     * Emits when the search bar text changes
     */
    readonly valueChange: Observable<string>;
    /**
     * Emits when an autocomplete option has been selected
     */
    readonly optionSelected: EventEmitter<AutoCompleteOption>;
    /**
     * Form controller for search bar
     */
    readonly controller: UntypedFormControl;
    /**
     * Fetches the latest autocomplete suggestions for the provided search text.
     *
     * @param search The search text to find suggestions for
     * @returns The found suggestions
     */
    private readonly getOptions;
    /**
     * Emits the latest autocomplete suggestions
     */
    readonly options: Observable<AutoCompleteOption[]>;
    /**
     * Creates an instance of text search component.
     *
     * @param defaultMaxOptions The default value for `maxOptions`
     */
    constructor();
    /**
     * Text to show in search bar when an autocomplete option is selected.
     *
     * @param option The autocomplete option
     * @returns The displayed text
     */
    optionDisplay(option: AutoCompleteOption | null): string;
    /**
     * Gets an unique identifier for an autocomplete option object.
     *
     * @param _index Unused
     * @param option The option object
     * @returns The unique identifier
     */
    optionId(_index: number, option: AutoCompleteOption): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextSearchComponent, "ccf-text-search", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "maxOptions": { "alias": "maxOptions"; "required": false; }; "autoCompleter": { "alias": "autoCompleter"; "required": false; }; }, { "valueChange": "valueChange"; "optionSelected": "optionSelected"; }, never, ["[matPrefix]", "[matSuffix]"], false, never>;
}

declare class TextSearchModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TextSearchModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TextSearchModule, [typeof TextSearchComponent], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i3.ReactiveFormsModule, typeof i4.MatAutocompleteModule, typeof i5.MatFormFieldModule, typeof i6.MatInputModule, typeof DecoratedTextModule], [typeof TextSearchComponent, typeof i5.MatPrefix, typeof i5.MatSuffix]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TextSearchModule>;
}

/**
 * Slider for setting opacity on an anatomical structure
 */
declare class OpacitySliderComponent implements OnInit {
    /** HTML class name */
    readonly clsName = "ccf-opacity-slider";
    /** The value displayed in the slider */
    readonly opacity: i0.ModelSignal<number>;
    /** Whether the item is set to visible */
    readonly visible: i0.InputSignal<boolean>;
    /** Emits the updated opacity when the opacity changes */
    readonly opacityChange: i0.OutputEmitterRef<number>;
    /** Emitted when slider visibility is toggled */
    readonly visibilityToggle: i0.OutputEmitterRef<void>;
    /** Emitter for resetting all opacity values to default */
    readonly opacityReset: i0.OutputEmitterRef<void>;
    /** Emitted when slider thumb is moved */
    readonly sliderChanged: i0.OutputEmitterRef<string>;
    /** Previous opacity */
    readonly prevOpacity: i0.WritableSignal<number>;
    /** Initialize the component */
    ngOnInit(): void;
    /** Reset previous opacity */
    reset(): void;
    /**
     * Emits signal to toggle the visibility of the item
     */
    toggleVisibility(): void;
    /**
     * Emits signal to reset the opacity of the item
     */
    resetOpacity(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OpacitySliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OpacitySliderComponent, "ccf-opacity-slider", never, { "opacity": { "alias": "opacity"; "required": false; "isSignal": true; }; "visible": { "alias": "visible"; "required": false; "isSignal": true; }; }, { "opacity": "opacityChange"; "opacityChange": "opacityChange"; "visibilityToggle": "visibilityToggle"; "opacityReset": "opacityReset"; "sliderChanged": "sliderChanged"; }, never, never, true, never>;
}

/**
 * The structure to define how each documentation panel
 * should look like in the info dialog
 */
interface DocumentationContent {
    /** Title of the panel */
    title: string;
    /** Content inside the panel */
    content: string;
}
/** Panel data */
interface PanelData {
    /** Content */
    content: DocumentationContent[];
    /** Title */
    infoTitle: string;
    /** Video */
    videoID: string;
}
/** Info button service */
declare class InfoButtonService {
    /** Http client */
    private readonly http;
    /** Subject to send the documentation data to the component when its done processing */
    panelContent: BehaviorSubject<PanelData>;
    /**
     * Read the markdown file to split it by h1 tags and update the panel title and videoID.
     */
    updateData(url: string, videoID: string, infoTitle: string): void;
    /**
     * Function to parse the markdown file and convert to
     * documentation content used by the info-dialog panels
     *
     * @param data Markdown file sent as a string after reading it
     * @returns array of DocumentationContent
     */
    parseMarkdown(data: string): DocumentationContent[];
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoButtonService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InfoButtonService>;
}

/**
 * Data model for the dialog input
 */
interface InfoDialogData {
    /** Content */
    content: DocumentationContent[];
    /** Title */
    title: string;
    /** Video */
    videoID: string;
}
/**
 * This component handles displaying and hiding a full screen modal / overlay that displays information about the project.
 */
declare class InfoDialogComponent implements OnInit {
    /** Dialog reference */
    readonly dialogRef: MatDialogRef<InfoDialogComponent, any>;
    /** Data from parent */
    readonly data: InfoDialogData;
    /**
     * Documentation contents
     */
    documentationContents: DocumentationContent[];
    /**
     * Title of the dialog
     */
    infoTitle: string;
    /**
     * URL for video
     */
    videoID: string;
    /**
     * load the youtube player api in on init
     */
    ngOnInit(): void;
    /**
     * Closes info dialog component
     */
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InfoDialogComponent, "ccf-info-dialog", never, {}, {}, never, never, false, never>;
}

declare class InfoDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InfoDialogModule, [typeof InfoDialogComponent], [typeof i2.CommonModule, typeof i3$1.MatDialogModule, typeof i4$1.MatIconModule, typeof i5$1.MatExpansionModule, typeof i6$1.YouTubePlayerModule, typeof i7.MarkdownModule], [typeof InfoDialogComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InfoDialogModule>;
}

/**
 * Info button component: Information icon displays project details when clicked.
 */
declare class InfoButtonComponent implements OnDestroy {
    /** Dialog service */
    private readonly dialog;
    /** Info button service */
    private readonly infoButtonService;
    /**
     * Title of the info dialog
     */
    infoTitle: string;
    /**
     * Whether the information is for the RUI or EUI
     */
    videoID: string;
    /** Documentation url */
    documentationUrl: string;
    /** Subscriptions */
    private readonly subscriptions;
    /**
     * Creates an instance of info button component.
     */
    constructor();
    /**
     * Unsubscribe to the observable when the component
     * is destroyed
     */
    ngOnDestroy(): void;
    /**
     * Opens the info dialogue with the project details
     */
    launchInfoDialog(data: PanelData): void;
    /**
     * Detects button click and updates panel data
     */
    onDialogButtonClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InfoButtonComponent, "ccf-info-button", never, { "infoTitle": { "alias": "infoTitle"; "required": false; }; "videoID": { "alias": "videoID"; "required": false; }; "documentationUrl": { "alias": "documentationUrl"; "required": false; }; }, {}, never, never, false, never>;
}

declare class InfoButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InfoButtonModule, [typeof InfoButtonComponent], [typeof i2.CommonModule, typeof InfoDialogModule, typeof i4$1.MatIconModule], [typeof InfoButtonComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InfoButtonModule>;
}

/**
 * Info button component: Information icon displays project details when clicked.
 */
declare class CallToActionComponent {
    /**HTML class */
    readonly clsName = "ccf-call-to-action";
    /**
     * Title of the info dialog
     */
    infoTitle: string;
    /**
     * Whether the information is for the RUI or EUI
     */
    imageUrl: string;
    /**
     * Message to be displayed under image
     */
    message: string;
    /**
     * Label for the button
     */
    callToAction: string;
    /**
     *  Emmitter for component to pass info to parent
     * */
    readonly callToActionClicked: EventEmitter<void>;
    /**
     *  Emmitter for component to pass info to parent
     * */
    readonly closeClicked: EventEmitter<void>;
    /**
     * Function to handle the close button click action
     */
    close(): void;
    /**
     * Detects button click and reads markdown function
     */
    onDialogButtonClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CallToActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CallToActionComponent, "ccf-call-to-action", never, { "infoTitle": { "alias": "infoTitle"; "required": false; }; "imageUrl": { "alias": "imageUrl"; "required": false; }; "message": { "alias": "message"; "required": false; }; "callToAction": { "alias": "callToAction"; "required": false; }; }, { "callToActionClicked": "callToActionClicked"; "closeClicked": "closeClicked"; }, never, never, false, never>;
}

declare class CallToActionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CallToActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CallToActionModule, [typeof CallToActionComponent], [typeof i2.CommonModule, typeof i4$1.MatIconModule, typeof i3$1.MatDialogModule, typeof i5$2.MatCardModule], [typeof CallToActionComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CallToActionModule>;
}

/**
 * Directive for restricting an input element to integer only values.
 */
declare class NumberDirective {
    private readonly el;
    /**
     * Listens to input changes and updates the text to only include numbers.
     *
     * @param event The input event
     */
    onInputChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NumberDirective, "input[ccfNumbersOnly]", never, {}, {}, never, never, false, never>;
}

declare class NumbersOnlyModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NumbersOnlyModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NumbersOnlyModule, [typeof NumberDirective], never, [typeof NumberDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NumbersOnlyModule>;
}

/** Global config state */
declare class GlobalConfigState<T> extends NgxsImmutableDataRepository<T> {
    /** Option accessor cache */
    private readonly optionCache;
    /** Get current config */
    get config$(): Observable<Immutable<T>>;
    /** Set the config */
    setConfig(config: ImmutableStateValue<T>): void;
    /** Patch the config */
    patchConfig(config: ImmutablePatchValue<T>): void;
    /** Get a config property */
    getProperty<R>(path: PropertyKey[]): Observable<R>;
    /** Get a config option */
    getOption<K1 extends keyof T>(k1: K1): Observable<T[K1]>;
    /** Get a config option */
    getOption<K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): Observable<T[K1][K2]>;
    /** Get a config option */
    getOption<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3): Observable<T[K1][K2][K3]>;
    /** Get a config option */
    getOption<R>(...path: (string | number)[]): Observable<R>;
    /** Gets the config option as a signal */
    getOptionSignal<K1 extends keyof T>(k1: K1): Signal<T[K1]>;
    /** Compute a key for a path */
    private getPathKey;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalConfigState<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalConfigState<any>>;
}

/** Type of keys allowed in the global object */
type GlobalKey = string | symbol;
/** Type of the global object */
type GlobalThis = typeof globalThis;
/**
 * Provide functionality for interacting with the global object.
 */
declare class GlobalsService {
    /**
     * The found global object
     */
    get obj(): GlobalThis | undefined;
    /**
     * Tests whether the global object has the specific key.
     * This method returns true even when the associated value
     * is undefined or null as long as the key exists.
     *
     * @param key The key
     *
     * @returns true if the key exists in the global object
     */
    has(key: GlobalKey): boolean;
    /**
     * Gets a value from the global object.
     *
     * @param key The key for the value
     *
     * @returns The value if it exists otherwise the default value
     */
    get<K extends keyof GlobalThis>(key: K): GlobalThis[K];
    /**
     * Gets a value from the global object.
     *
     * @param key The key for the value
     * @param def An optional default value
     *
     * @returns The value if it exists otherwise the default value
     */
    get<K extends keyof GlobalThis, D>(key: K, def: D): NonNullable<GlobalThis[K]> | D;
    /**
     * Gets a value from the global object.
     *
     * @param key The key for the value
     *
     * @returns The value if it exists otherwise the default value
     */
    get<T = unknown>(key: GlobalKey): T | null | undefined;
    /**
     * Gets a value from the global object.
     *
     * @param key The key for the value
     * @param def An optional default value
     *
     * @returns The value if it exists otherwise the default value
     */
    get<T = unknown, D = T>(key: GlobalKey, def: D): T | D;
    /**
     * Sets a value on the global object.
     *
     * @param key The key to set the value on
     * @param value The new value
     *
     * @throws TypeError if the value is readonly
     */
    set<K extends keyof GlobalThis>(key: K, value: GlobalThis[K]): void;
    /**
     * Sets a value on the global object.
     *
     * @param key The key to set the value on
     * @param value The new value
     *
     * @throws TypeError if the value is readonly
     */
    set<T>(key: GlobalKey, value: T): void;
    /**
     * Removes a key from the global object.
     *
     * @param key The key to remove
     *
     * @throws TypeError if the key is not removable
     */
    remove(key: GlobalKey): void;
    /**
     * Attempt to locate the global object.
     * Can be overridden in a subclass to check other locations
     * or completely change the object. This is especially useful
     * during testing.
     *
     * @returns The global object if found
     */
    protected findGlobalObject(): GlobalThis | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalsService>;
}

/** Data source */
interface DataSource {
    /** Get databse status */
    getDatabaseStatus(): Observable<DatabaseStatus>;
    /** Get provider names */
    getProviderNames(): Observable<string[]>;
    /** Get technologies */
    getDatasetTechnologyNames(): Observable<string[]>;
    /** Get consortium names */
    getConsortiumNames(): Observable<string[]>;
    /** Get ontology tree */
    getOntologyTreeModel(): Observable<OntologyTree>;
    /** Get cell type tree */
    getCellTypeTreeModel(): Observable<OntologyTree>;
    /** Get biomarker tree */
    getBiomarkerTreeModel(): Observable<OntologyTree>;
    /** Get reference organs */
    getReferenceOrgans(): Observable<SpatialEntity[]>;
    /** Get tissue blocks */
    getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
    /** Get aggregate results */
    getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
    /** Get ontology term occurences */
    getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /** Get cell type ocuurences */
    getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /** Get biomarker occurences */
    getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /** Get the scene */
    getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
    /** Get the reference organ scene */
    getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
}

/** Api enpoint options */
interface ApiEndpointDataSourceOptions {
    /** Endpoint url */
    remoteApiEndpoint: string;
    /** Api token */
    token?: string;
    /** Data sources to include */
    dataSources?: string[];
    /** Data filters */
    filter?: Filter;
}
/** Api endpoint data source */
declare class ApiEndpointDataSourceService implements DataSource {
    /** Api service */
    private readonly api;
    /** Global configuration state */
    private readonly globalConfig;
    /** Api configuration */
    private readonly config$;
    /** Initializes the service */
    constructor();
    /**
     * Get the database status
     *
     * @returns An observable of the database status
     */
    getDatabaseStatus(): Observable<DatabaseStatus>;
    /**
     * Get the supported provider names
     *
     * @returns An observable of provider names
     */
    getProviderNames(): Observable<string[]>;
    /**
     * Get the supported technologies
     *
     * @returns An observable of technologies
     */
    getDatasetTechnologyNames(): Observable<string[]>;
    /**
     * Get the supported consortium names
     *
     * @returns An observable of consortium names
     */
    getConsortiumNames(): Observable<string[]>;
    /**
     * Get the ontology tree
     *
     * @returns An observable of the ontology tree
     */
    getOntologyTreeModel(): Observable<OntologyTree>;
    /**
     * Get the cell types tree
     *
     * @returns An observable of the cell types tree
     */
    getCellTypeTreeModel(): Observable<OntologyTree>;
    /**
     * Get the biomarker type tree model.
     *
     * @returns An observable emitting the results.
     */
    getBiomarkerTreeModel(): Observable<OntologyTree>;
    /**
     * Get the supported reference organs
     *
     * @returns An observable of reference organs
     */
    getReferenceOrgans(): Observable<SpatialEntity[]>;
    /**
     * Get tissue blocks
     *
     * @param filter Data filter
     * @returns An observable of tissue blocks
     */
    getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
    /**
     * Get aggregate counts
     *
     * @param filter Data filter
     * @returns An observable of counts
     */
    getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
    /**
     * Get ontology term occurences
     *
     * @param filter Data filter
     * @returns An observable of ontology term occurences
     */
    getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /**
     * Get cell type occurences
     *
     * @param filter Data filter
     * @returns An observable of cell type occurences
     */
    getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /**
     * Get biomarker occurences
     *
     * @param filter Data filter
     * @returns An observable of biomarker occurences
     */
    getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /**
     * Get scene nodes
     *
     * @param filter Data filter
     * @returns An observable of scene nodes
     */
    getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
    /**
     * Get reference organ scene nodes
     *
     * @param organIri Organ iri
     * @param filter Data filter
     * @returns An observable of reference organ scene nodes
     */
    getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
    /**
     * Perform a api request
     *
     * @param method Request method
     * @param filter Data filter
     * @param params Request parameters
     * @returns An observable of the request result
     */
    private doRequest;
    /**
     * Creates a session token and adds it to the config when applicable
     *
     * @param config Api config
     * @returns An observable of config
     */
    private getSessionToken;
    /**
     * Ensures the database is ready for requests
     *
     * @param token Api token
     * @returns An observable that emits once the database is ready
     */
    private ensureDatabaseReady;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApiEndpointDataSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApiEndpointDataSourceService>;
}

/** Data source service */
declare abstract class DataSourceService implements DataSource {
    /** Get databse status */
    abstract getDatabaseStatus(): Observable<DatabaseStatus>;
    /** Get provider names */
    abstract getProviderNames(): Observable<string[]>;
    /** Get technologies */
    abstract getDatasetTechnologyNames(): Observable<string[]>;
    /** Get consortium names */
    abstract getConsortiumNames(): Observable<string[]>;
    /** Get ontology tree */
    abstract getOntologyTreeModel(): Observable<OntologyTree>;
    /** Get cell type tree */
    abstract getCellTypeTreeModel(): Observable<OntologyTree>;
    /** Get biomarker tree */
    abstract getBiomarkerTreeModel(): Observable<OntologyTree>;
    /** Get reference organs */
    abstract getReferenceOrgans(): Observable<SpatialEntity[]>;
    /** Get tissue blocks */
    abstract getTissueBlockResults(filter?: Filter): Observable<TissueBlock[]>;
    /** Get aggregate results */
    abstract getAggregateResults(filter?: Filter): Observable<AggregateCount[]>;
    /** Get ontology term occurences */
    abstract getOntologyTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /** Get cell type ocuurences */
    abstract getCellTypeTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /** Get biomarker occurences */
    abstract getBiomarkerTermOccurences(filter?: Filter): Observable<Record<string, number>>;
    /** Get the scene */
    abstract getScene(filter?: Filter): Observable<SpatialSceneNode[]>;
    /** Get the reference organ scene */
    abstract getReferenceOrganScene(organIri: string, filter?: Filter): Observable<SpatialSceneNode[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataSourceService>;
}

/** Learn more action */
declare class LearnMore {
    /** Type */
    static readonly type = "[CallToAction] Learn More";
}
/** Open dialog action */
declare class OpenDialog {
    /** Type */
    static readonly type = "[CallToAction] Open Dialog";
}
/** Close dialog action */
declare class CloseDialog {
    /** Type */
    static readonly type = "[CallToAction] Close Dialog";
}

type callToAction_actions_d_CloseDialog = CloseDialog;
declare const callToAction_actions_d_CloseDialog: typeof CloseDialog;
type callToAction_actions_d_LearnMore = LearnMore;
declare const callToAction_actions_d_LearnMore: typeof LearnMore;
type callToAction_actions_d_OpenDialog = OpenDialog;
declare const callToAction_actions_d_OpenDialog: typeof OpenDialog;
declare namespace callToAction_actions_d {
  export {
    callToAction_actions_d_CloseDialog as CloseDialog,
    callToAction_actions_d_LearnMore as LearnMore,
    callToAction_actions_d_OpenDialog as OpenDialog,
  };
}

/**
 * Info button component: Information icon displays project details when clicked.
 */
declare class CallToActionBehaviorComponent {
    /** Title */
    readonly title$: Observable$1<string>;
    /** Message */
    readonly message$: Observable$1<string>;
    /** Call to action text */
    readonly callToAction$: Observable$1<string>;
    /** Image url */
    readonly imageUrl$: Observable$1<string>;
    /**
     * Closes dialog
     */
    readonly close: () => CloseDialog;
    /**
     * Sends learn more open action
     * @returns LearnMore action
     */
    readonly learnMore: () => LearnMore;
    static ɵfac: i0.ɵɵFactoryDeclaration<CallToActionBehaviorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CallToActionBehaviorComponent, "ccf-call-to-action-behavior", never, {}, {}, never, never, false, never>;
}

declare class CallToActionBehaviorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CallToActionBehaviorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CallToActionBehaviorModule, [typeof CallToActionBehaviorComponent], [typeof i2.CommonModule, typeof i3$2.NgxsModule, typeof i4$1.MatIconModule, typeof i3$1.MatDialogModule, typeof i5$2.MatCardModule, typeof CallToActionModule], [typeof CallToActionBehaviorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CallToActionBehaviorModule>;
}

/**
 * Interface to hold the necessary parts of the CTA dialog
 */
interface CallToActionModel {
    /** Title */
    title: string;
    /** Message */
    message: string;
    /** Call to action button text */
    callToAction: string;
    /** Image url */
    imageUrl: string;
    /** Expiration data */
    expirationDate: string;
    /** Whether popup is shown */
    popupShown: boolean;
}
/**
 * State that controls the data and behavior for the CallToAction Component
 */
declare class CallToActionState implements NgxsOnInit {
    /** Dialog service */
    private readonly dialog;
    /** Local storage service */
    private readonly storage;
    /** Info button service */
    private readonly infoService;
    /** Http client */
    private readonly http;
    /** Used to break cyclical import */
    static callToActionComponent: typeof CallToActionBehaviorComponent;
    /**
     * Function that determines if expiration date has passed
     * @param expirationDate
     * @param now
     * @returns boolean defining whether or not info popup has expiered
     */
    static ctaDatePassed(expirationDate: string, now?: () => number): boolean;
    /** Initialize the state */
    ngxsOnInit(ctx: StateContext<CallToActionModel>): void;
    /**
     * Returns observable containting info from the markup
     */
    private getDialogData;
    /**
     * Opens Learn more dialog
     */
    launchLearnMore(content: DocumentationContent[]): void;
    /**
     * Handles click event box
     * @param _ctx
     */
    learnMore(): Observable<DocumentationContent[]>;
    /**
     * Opens dialog box
     * @param ctx
     */
    open(ctx: StateContext<CallToActionModel>): void;
    /**
     * closes all dialog boxes
     * @param _ctxs;
     */
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CallToActionState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CallToActionState>;
}

/**
 * Service to handle local storage
 */
declare class LocalStorageService {
    /** Local storage reference */
    static storage: Storage | undefined;
    /**
     * gets length of storage list
     */
    get length(): number;
    /**
     * Gets value based on key index
     * @param index
     * @returns
     */
    key(index: number): string | null;
    /**
     * Gets value based on key, also returns default if it fails
     * @param key
     * @param defaultValue
     * @returns the value
     */
    getItem<D extends string | null = null>(key: string, defaultValue?: D): string | D;
    /**
     * sets a key-value pairin local storage
     * @param key
     * @param value
     * @returns true or false based on success/failure
     */
    setItem(key: string, value: string): boolean;
    /**
     * removes value based on key
     * @param key
     */
    removeItem(key: string): void;
    /**
     * Clears all storage
     */
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}

/**
 * All organs that will eventually be displayed in the app
 */
declare const ALL_POSSIBLE_ORGANS: ({
    src: string;
    organ: string;
    name: string;
    hasSex: true;
    id: string;
    disabled?: undefined;
    side?: undefined;
    sex?: undefined;
} | {
    disabled: true;
    src: string;
    organ: string;
    name: string;
    hasSex: true;
    id: string;
    side?: undefined;
    sex?: undefined;
} | {
    disabled: true;
    src: string;
    organ: string;
    name: string;
    side: "left";
    hasSex: true;
    id: string;
    sex?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "left";
    hasSex: true;
    id: string;
    disabled?: undefined;
    sex?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "right";
    hasSex: true;
    id: string;
    disabled?: undefined;
    sex?: undefined;
} | {
    disabled: true;
    src: string;
    organ: string;
    name: string;
    side: "left";
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
} | {
    src: string;
    organ: string;
    name: string;
    side: "left";
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
    disabled?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "right";
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
    disabled?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
    disabled?: undefined;
    side?: undefined;
} | {
    disabled: true;
    src: string;
    organ: string;
    name: string;
    side: "right";
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
} | {
    src: string;
    organ: string;
    name: string;
    hasSex: false;
    sex: FilterSexEnum.Male;
    id: string;
    disabled: true;
    side?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    hasSex: false;
    sex: FilterSexEnum.Male;
    id: string;
    disabled?: undefined;
    side?: undefined;
})[];
/**
 * All organs which have not been disabled
 */
declare const ALL_ORGANS: ({
    src: string;
    organ: string;
    name: string;
    hasSex: true;
    id: string;
    disabled?: undefined;
    side?: undefined;
    sex?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "left";
    hasSex: true;
    id: string;
    disabled?: undefined;
    sex?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "right";
    hasSex: true;
    id: string;
    disabled?: undefined;
    sex?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "left";
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
    disabled?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    side: "right";
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
    disabled?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    hasSex: false;
    sex: FilterSexEnum.Female;
    id: string;
    disabled?: undefined;
    side?: undefined;
} | {
    src: string;
    organ: string;
    name: string;
    hasSex: false;
    sex: FilterSexEnum.Male;
    id: string;
    disabled?: undefined;
    side?: undefined;
})[];
/**
 * Contains the organ name and url of the icon svg
 */
interface OrganInfo {
    /**
     * Used to fetch the url of the organ icon
     */
    src: string;
    /**
     * Label to display for the organ
     */
    name: string;
    /**
     * Name of the organ (to help match organs with left / right)
     */
    organ: string;
    /**
     * True if the icon is disabled
     */
    disabled?: boolean;
    /**
     * Used for paired organs
     */
    side?: 'left' | 'right';
    /**
     * True if applies to both sexes
     */
    hasSex?: boolean;
    /**
     * Used for single sex only organs
     */
    sex?: FilterSexEnum;
    /**
     * UBERON id for the organ
     */
    id?: string;
    /** Number of results */
    numResults?: number;
}
/**
 * Helper for comparing differently typed sex values
 *
 * @param val1 First value
 * @param val2 Second value
 * @returns true if they are considered equal
 */
declare function sexEquals(val1: FilterSexEnum | string | undefined, val2: FilterSexEnum | string | undefined): boolean;
/**
 * Converts a string typed sex value into a `FilterSexEnum`
 *
 * @param value Value to convert
 * @returns A `FilterSexEnum` value if a match is found
 */
declare function sexFromString(value: string): FilterSexEnum | undefined;

/**
 * Base interface of items in the spatial search list
 */
interface SpatialSearchListItem {
    /** Whether the item is selected */
    selected: boolean;
    /** Description displayed for the item */
    description: string;
}
/**
 * Displays a list of spatial searches
 */
declare class SpatialSearchListComponent<T extends SpatialSearchListItem> {
    /** HTML class */
    readonly clsName = "ccf-spatial-search-list";
    /** Label for the list */
    readonly label: i0.InputSignal<string>;
    /** Items to display */
    readonly items: i0.InputSignal<T[]>;
    /** Emits the new items when a selection changes */
    readonly selectionChanged: i0.OutputEmitterRef<T[]>;
    /** Emits the item that has been removed from the list */
    readonly itemRemoved: i0.OutputEmitterRef<T>;
    /** If all items are selected */
    allSelected: boolean;
    /**
     * Computes a unique id for an item
     *
     * @param _index Unused
     * @param item An item
     * @returns A unique id
     */
    itemId(_index: number, item: T): string;
    /**
     * Updates the selected state for an item
     *
     * @param index Index of item to update
     * @param selected What to set the selected state to
     */
    updateItemSelection(index: number, selected: boolean): void;
    /**
     * Removes an item from the list
     *
     * @param index Index of the item to remove
     */
    removeItem(index: number): void;
    /**
     * Updates all items to checked or unchecked
     *
     * @param checked Checked status
     */
    updateAllItemsSelection(checked: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpatialSearchListComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpatialSearchListComponent<any>, "ccf-spatial-search-list", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "items": { "alias": "items"; "required": false; "isSignal": true; }; }, { "selectionChanged": "selectionChanged"; "itemRemoved": "itemRemoved"; }, never, never, true, never>;
}

/**
 * Component displaying a x, y, and z position
 */
declare class XYZPositionComponent {
    /** Html class name */
    readonly clsName = "ccf-xyz-position";
    /** X position */
    x: number;
    /** Y position */
    y: number;
    /** Z position */
    z: number;
    /** Number format for position values */
    readonly format = "1.0-2";
    static ɵfac: i0.ɵɵFactoryDeclaration<XYZPositionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<XYZPositionComponent, "ccf-xyz-position", never, { "x": { "alias": "x"; "required": false; }; "y": { "alias": "y"; "required": false; }; "z": { "alias": "z"; "required": false; }; }, {}, never, never, false, never>;
}

declare class XYZPositionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<XYZPositionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<XYZPositionModule, [typeof XYZPositionComponent], [typeof i2.CommonModule], [typeof XYZPositionComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<XYZPositionModule>;
}

/** Position */
interface Position {
    /** X coordinate */
    x: number;
    /** Y coordinate */
    y: number;
    /** Z coordinate */
    z: number;
}
/**
 * Behavioral component for spatial search keyboard UI
 */
declare class SpatialSearchKeyboardUIBehaviorComponent {
    /** HTML class */
    readonly className = "ccf-spatial-search-keyboard-ui-behavior";
    /** Amount the position shifts for each key press */
    delta: number;
    /** Input of spatial search keyboard uibehavior component */
    shiftDelta: number;
    /** Current position of spatial search */
    position: Position;
    /** Disable position changes */
    disablePositionChange: boolean;
    /** Emits when position changes */
    readonly changePosition: EventEmitter<Position>;
    /** Current key being pressed/clicked */
    currentKey?: string;
    /** Current delta */
    currentDelta: number;
    /** True while shift key is pressed */
    shiftPressed: boolean;
    private readonly featurePath;
    private readonly logEvent;
    /**
     * Shifts position based on key
     * @param key Key value
     */
    updatePosition(key: string): void;
    /**
     * Listens for keydown keyboard event and updates the position
     * @param target Keyboard event
     */
    handleKey(target: KeyboardEvent): void;
    /**
     * Listens for keyup keyboard event and updates currentKey / shiftPressed
     * @param target Keyboard event
     */
    keyUp(target: KeyboardEvent): void;
    /**
     * Updates the position when a key is clicked
     * @param key Key value
     */
    keyClick(key: string): void;
    /**
     * Updates current key when a key is hovered over
     * @param key Key value
     */
    keyHover(key?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpatialSearchKeyboardUIBehaviorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpatialSearchKeyboardUIBehaviorComponent, "ccf-spatial-search-keyboard-ui-behavior", never, { "delta": { "alias": "delta"; "required": false; }; "shiftDelta": { "alias": "shiftDelta"; "required": false; }; "position": { "alias": "position"; "required": false; }; "disablePositionChange": { "alias": "disablePositionChange"; "required": false; }; }, { "changePosition": "changePosition"; }, never, never, false, never>;
}

/**
 * Keyboard control UI for spatial search
 */
declare class SpatialSearchKeyboardUIComponent {
    /** HTML class */
    readonly className = "ccf-spatial-search-keyboard-ui";
    /** Current key pressed */
    currentKey?: string;
    /** True if shift key is pressed */
    shiftPressed: boolean;
    /** Emits when a key is clicked */
    readonly keyClicked: EventEmitter<string>;
    /** Emits the key value when a key is hovered over */
    readonly keyHovered: EventEmitter<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpatialSearchKeyboardUIComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpatialSearchKeyboardUIComponent, "ccf-spatial-search-keyboard-ui", never, { "currentKey": { "alias": "currentKey"; "required": false; }; "shiftPressed": { "alias": "shiftPressed"; "required": false; }; }, { "keyClicked": "keyClicked"; "keyHovered": "keyHovered"; }, never, never, false, never>;
}

declare class SpatialSearchKeyboardUIModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SpatialSearchKeyboardUIModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SpatialSearchKeyboardUIModule, [typeof SpatialSearchKeyboardUIComponent], [typeof i2$1.HraCommonModule, typeof i4$1.MatIconModule], [typeof SpatialSearchKeyboardUIComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SpatialSearchKeyboardUIModule>;
}

declare class SpatialSearchKeyboardUIBehaviorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SpatialSearchKeyboardUIBehaviorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SpatialSearchKeyboardUIBehaviorModule, [typeof SpatialSearchKeyboardUIBehaviorComponent], [typeof i2$1.HraCommonModule, typeof SpatialSearchKeyboardUIModule], [typeof SpatialSearchKeyboardUIBehaviorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SpatialSearchKeyboardUIBehaviorModule>;
}

export { ALL_ORGANS, ALL_POSSIBLE_ORGANS, ApiEndpointDataSourceService, BodyUiComponent, BodyUiModule, callToAction_actions_d as CallToActionAction, CallToActionBehaviorComponent, CallToActionBehaviorModule, CallToActionComponent, CallToActionModule, CallToActionState, DEFAULT_MAX_OPTIONS, DataSourceService, DecoratedTextComponent, DecoratedTextModule, GlobalConfigState, GlobalsService, InfoButtonComponent, InfoButtonModule, InfoButtonService, InfoDialogComponent, InfoDialogModule, LocalStorageService, NumberDirective, NumbersOnlyModule, OpacitySliderComponent, SpatialSearchKeyboardUIBehaviorComponent, SpatialSearchKeyboardUIBehaviorModule, SpatialSearchKeyboardUIComponent, SpatialSearchKeyboardUIModule, SpatialSearchListComponent, StoreDebugComponent, StoreDebugModule, TextSearchComponent, TextSearchModule, XYZPositionComponent, XYZPositionModule, sexEquals, sexFromString };
export type { ApiEndpointDataSourceOptions, AutoCompleteOption, CallToActionModel, DataSource, DecoratedRange, DocumentationContent, GlobalKey, GlobalThis, InfoDialogData, KVList, KVPair, OrganInfo, PanelData, Position, SpatialSearchListItem };
