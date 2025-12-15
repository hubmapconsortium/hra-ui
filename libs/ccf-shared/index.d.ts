import * as i0 from '@angular/core';
import { OnDestroy, OnInit, Signal, EventEmitter } from '@angular/core';
import * as i2 from '@angular/common';
import { Immutable } from '@angular-ru/cdk/typings';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { ImmutableStateValue, ImmutablePatchValue } from '@angular-ru/ngxs/typings';
import { Observable } from 'rxjs';
import { DatabaseStatus, OntologyTree, SpatialEntity, Filter, TissueBlock, AggregateCount, SpatialSceneNode, FilterSexEnum } from '@hra-api/ng-client';
import * as i2$1 from '@hra-ui/common';
import * as i3 from '@angular/material/icon';

/** Key-Value pair */
type KVPair<T = unknown> = [string, T];
/** Array of Key-Value pairs */
type KVList<T = unknown> = KVPair<T>[];
/**
 * Simple component for displaying the current values in the data store.
 */
declare class StoreDebugComponent implements OnDestroy {
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

/**
 * Slider for setting opacity on an anatomical structure
 */
declare class OpacitySliderComponent implements OnInit {
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
    static ɵmod: i0.ɵɵNgModuleDeclaration<SpatialSearchKeyboardUIModule, [typeof SpatialSearchKeyboardUIComponent], [typeof i2$1.HraCommonModule, typeof i3.MatIconModule], [typeof SpatialSearchKeyboardUIComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SpatialSearchKeyboardUIModule>;
}

declare class SpatialSearchKeyboardUIBehaviorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SpatialSearchKeyboardUIBehaviorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SpatialSearchKeyboardUIBehaviorModule, [typeof SpatialSearchKeyboardUIBehaviorComponent], [typeof i2$1.HraCommonModule, typeof SpatialSearchKeyboardUIModule], [typeof SpatialSearchKeyboardUIBehaviorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SpatialSearchKeyboardUIBehaviorModule>;
}

export { ALL_ORGANS, ALL_POSSIBLE_ORGANS, ApiEndpointDataSourceService, DataSourceService, GlobalConfigState, GlobalsService, NumberDirective, NumbersOnlyModule, OpacitySliderComponent, SpatialSearchKeyboardUIBehaviorComponent, SpatialSearchKeyboardUIBehaviorModule, SpatialSearchKeyboardUIComponent, SpatialSearchKeyboardUIModule, SpatialSearchListComponent, StoreDebugComponent, StoreDebugModule, XYZPositionComponent, XYZPositionModule, sexEquals, sexFromString };
export type { ApiEndpointDataSourceOptions, DataSource, GlobalKey, GlobalThis, KVList, KVPair, OrganInfo, Position, SpatialSearchListItem };
