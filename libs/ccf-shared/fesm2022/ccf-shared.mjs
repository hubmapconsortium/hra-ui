import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, ChangeDetectionStrategy, Component, ViewChild, Input, Output, HostBinding, NgModule, inject, ChangeDetectorRef, InjectionToken, model, input, output, signal, Injectable, Directive, HostListener } from '@angular/core';
import { BodyUI } from 'ccf-body-ui';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Store, State, Action, Selector, Select, NgxsModule } from '@ngxs/store';
import { Subscription, lastValueFrom, from, BehaviorSubject, of, Observable, Subject } from 'rxjs';
import * as i2 from '@angular/forms';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { take, map, startWith, distinctUntilChanged, switchMap, shareReplay, pluck, debounceTime, tap, filter, delay, repeat, ignoreElements, endWith } from 'rxjs/operators';
import * as i3 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i4 from '@angular/material/form-field';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import * as i5 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import * as i1$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i2$1 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as i5$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2$2 from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import * as i4$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i5$2 from '@hra-ui/design-system/content-templates/youtube-player';
import { HraYoutubePlayerComponent } from '@hra-ui/design-system/content-templates/youtube-player';
import * as i6 from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import * as i3$1 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { __decorate, __metadata } from 'tslib';
import { Computed, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { toSignal } from '@angular/core/rxjs-interop';
import { filterNulls } from 'ccf-shared/rxjs-ext/operators';
import { V1Service, FilterSexEnum } from '@hra-api/ng-client';
import { Matrix4 } from '@math.gl/core';
import { Cacheable } from 'ts-cacheable';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable as Observable$1 } from 'rxjs/internal/Observable';
import * as i4$2 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5$3 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { HraCommonModule } from '@hra-ui/common';
import * as i1$2 from '@hra-ui/common/analytics';
import { injectFeaturePath, injectLogEvent } from '@hra-ui/common/analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';

const _c0$1 = ["bodyCanvas"];
/**
 * Component that handles displaying the 3D models in the stage
 */
class BodyUiComponent {
    /** HTML class name */
    clsName = 'ccf-body-ui';
    /** Get scene nodes */
    get scene() {
        return this._scene;
    }
    /** Set scene nodes */
    set scene(nodes) {
        this._scene = nodes;
        this.bodyUI?.setScene(nodes);
    }
    /** Get scene rotation */
    get rotation() {
        return this._rotation;
    }
    /** Set scene rotation */
    set rotation(value) {
        this._rotation = value;
        this.bodyUI?.setRotation(value);
    }
    /** Get scene x rotation */
    get rotationX() {
        return this._rotationX;
    }
    /** Set scene x rotation */
    set rotationX(value) {
        this._rotationX = value;
        this.bodyUI?.setRotationX(value);
    }
    /** Get scene zoom */
    get zoom() {
        return this._zoom;
    }
    /** Set scene zoom */
    set zoom(value) {
        this._zoom = value;
        this.bodyUI?.setZoom(value);
    }
    /** Get scene target */
    get target() {
        return this._target;
    }
    /** Set scene target */
    set target(value) {
        this._target = value;
        this.bodyUI?.setTarget(value);
    }
    /** Get scene bounds */
    get bounds() {
        return this._bounds;
    }
    /** Set scene bounds */
    set bounds(value) {
        this._bounds = value;
        this.zoomToBounds(value);
    }
    /** Get scene camera */
    get camera() {
        return this._camera;
    }
    /** Set scene camera */
    set camera(value) {
        this._camera = value;
    }
    /** Emits when the scene is rotated */
    rotationChange = new EventEmitter();
    /** Emits when a node is dragged */
    nodeDrag = new EventEmitter();
    /** Emits when a node is clicked */
    nodeClick = new EventEmitter();
    /** Emits when a node is hovered */
    nodeHoverStart = new EventEmitter();
    /** Emits when a node is no longer hovered */
    nodeHoverStop = new EventEmitter();
    /** Emits once the scene is initialized */
    initialized = new EventEmitter();
    /** Get whether the scene is interactive */
    get interactive() {
        return this._interactive;
    }
    /** Set whether the scene is interactive */
    set interactive(value) {
        this._interactive = value;
        if (this.bodyUI) {
            this.recreateBodyUI();
        }
    }
    /** Whether the scene is interactive */
    _interactive = true;
    /** Current rotation */
    _rotation = 0;
    /** Current x rotation */
    _rotationX = 0;
    /** Current zoom level */
    _zoom = 9.5;
    /** Current target */
    _target = [0, 0, 0];
    /** Current bounds */
    _bounds;
    /** Scene nodes */
    _scene = [];
    /** Subscriptions */
    subscriptions = [];
    /** Camera */
    _camera;
    /**
     * Instance of the body UI class for rendering the deckGL scene
     */
    bodyUI;
    /**
     * Reference to the div we are using to mount the body UI to.
     */
    bodyCanvas;
    /**
     * Performs setup required after initialization
     */
    ngAfterViewInit() {
        this.setupBodyUI();
    }
    /** Zoom to bounds */
    zoomToBounds(bounds, margin = { x: 48, y: 48 }) {
        if (this.bodyCanvas) {
            const { width, height } = this.bodyCanvas.nativeElement;
            const pxRatio = window.devicePixelRatio;
            const zoom = Math.min(Math.log2((width - margin.x) / pxRatio / bounds.x), Math.log2((height - margin.y) / pxRatio / bounds.y));
            this.zoom = zoom;
        }
    }
    /**
     * Set up required to render the body UI with the scene nodes.
     */
    async setupBodyUI() {
        const canvas = this.bodyCanvas.nativeElement;
        const bodyUI = new BodyUI({
            id: 'body-ui',
            canvas,
            zoom: this.zoom,
            target: [0, 0, 0],
            rotation: 0,
            minRotationX: -75,
            maxRotationX: 75,
            interactive: this.interactive,
            camera: this.camera,
        });
        canvas.addEventListener('contextmenu', (evt) => evt.preventDefault());
        await bodyUI.initialize();
        this.bodyUI = bodyUI;
        window.bodyUI = bodyUI;
        if (this.scene?.length > 0) {
            this.bodyUI.setScene(this.scene);
        }
        if (this.bounds) {
            this.zoomToBounds(this.bounds);
        }
        if (this.target) {
            this.bodyUI.setTarget(this.target);
        }
        this.subscriptions = [
            this.bodyUI.sceneRotation$.subscribe((rotation) => this.rotationChange.next(rotation)),
            this.bodyUI.nodeDrag$.subscribe((event) => this.nodeDrag.emit(event)),
            this.bodyUI.nodeClick$.subscribe((event) => this.nodeClick.emit(event)),
            this.bodyUI.nodeHoverStart$.subscribe((event) => this.nodeHoverStart.emit(event)),
            this.bodyUI.nodeHoverStop$.subscribe((event) => this.nodeHoverStop.emit(event)),
        ];
        this.initialized.emit();
    }
    /** Reinitializes the body ui */
    recreateBodyUI() {
        this.clearSubscriptions();
        this.bodyUI.finalize();
        this.setupBodyUI();
    }
    /** Cleans up subscriptions */
    clearSubscriptions() {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];
    }
    /** Cleans up the component */
    ngOnDestroy() {
        this.clearSubscriptions();
    }
    static ɵfac = function BodyUiComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BodyUiComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BodyUiComponent, selectors: [["ccf-body-ui"]], viewQuery: function BodyUiComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$1, 5, ElementRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.bodyCanvas = _t.first);
        } }, hostVars: 2, hostBindings: function BodyUiComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { scene: "scene", rotation: "rotation", rotationX: "rotationX", zoom: "zoom", target: "target", bounds: "bounds", camera: "camera", interactive: "interactive" }, outputs: { rotationChange: "rotationChange", nodeDrag: "nodeDrag", nodeClick: "nodeClick", nodeHoverStart: "nodeHoverStart", nodeHoverStop: "nodeHoverStop", initialized: "initialized" }, standalone: false, decls: 2, vars: 0, consts: [["bodyCanvas", ""], [1, "body-ui"]], template: function BodyUiComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "canvas", 1, 0);
        } }, styles: ["[_nghost-%COMP%]{height:100%;display:flex}[_nghost-%COMP%]   .body-ui[_ngcontent-%COMP%]{position:relative!important;background-color:#000}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BodyUiComponent, [{
        type: Component,
        args: [{ selector: 'ccf-body-ui', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<canvas #bodyCanvas class=\"body-ui\"></canvas>\n", styles: [":host{height:100%;display:flex}:host .body-ui{position:relative!important;background-color:#000}\n"] }]
    }], null, { clsName: [{
            type: HostBinding,
            args: ['class']
        }], scene: [{
            type: Input
        }], rotation: [{
            type: Input
        }], rotationX: [{
            type: Input
        }], zoom: [{
            type: Input
        }], target: [{
            type: Input
        }], bounds: [{
            type: Input
        }], camera: [{
            type: Input
        }], rotationChange: [{
            type: Output
        }], nodeDrag: [{
            type: Output
        }], nodeClick: [{
            type: Output
        }], nodeHoverStart: [{
            type: Output
        }], nodeHoverStop: [{
            type: Output
        }], initialized: [{
            type: Output
        }], interactive: [{
            type: Input
        }], bodyCanvas: [{
            type: ViewChild,
            args: ['bodyCanvas', { read: ElementRef }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BodyUiComponent, { className: "BodyUiComponent", filePath: "lib/components/body-ui/body-ui.component.ts", lineNumber: 37 }); })();

class BodyUiModule {
    static ɵfac = function BodyUiModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BodyUiModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: BodyUiModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BodyUiModule, [{
        type: NgModule,
        args: [{
                declarations: [BodyUiComponent],
                imports: [CommonModule],
                exports: [BodyUiComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BodyUiModule, { declarations: [BodyUiComponent], imports: [CommonModule], exports: [BodyUiComponent] }); })();

/**
 * Resolves and normalizes an index for indexing into an array of length `length`.
 *
 * @param index The index value to resolve. May be negative indicating an index from end.
 * @param length The length of the object on which this index will be used.
 * @returns A positive index in range [0, length]
 */
function resolveIndex(index, length) {
    if (index >= 0 && index < length) {
        return index;
    }
    else if (index >= length) {
        return length;
    }
    else if (index + length < 0) {
        return 0;
    }
    return index + length;
}
/**
 * Produces a new range object based on the input where all properties have been normalized.
 *
 * @param range The object to normalize.
 * @param length Max length for indices.
 * @returns A new object where all undefined values have been replaced with defaults and
 * where all indices have been constrained to the range [0, length].
 */
function normalize(range, length) {
    const start = resolveIndex(range.start ?? 0, length);
    const end = resolveIndex(range.end ?? length, length);
    const classes = range.classes ?? [];
    const styles = range.styles ?? {};
    return { start, end, classes, styles };
}

function DecoratedTextComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const segment_r1 = ctx.$implicit;
    i0.ɵɵstyleMap(segment_r1.styles);
    i0.ɵɵclassMap(segment_r1.classes);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", segment_r1.text, "\n");
} }
/**
 * Class to display text with additional styling on ranges of the text.
 */
class DecoratedTextComponent {
    /** HTML class name */
    clsName = 'ccf-decorated-text';
    /**
     * Text to display
     */
    text;
    /**
     * Classes and styles to apply to ranges of the text.
     * For overlapping ranges later values takes precedence.
     */
    decorations;
    /**
     * Computed segments of text with decorations resolved.
     */
    segments = [];
    /**
     * Apply changes and recalculate cached values.
     *
     * @param changes Instance properties that have changed
     */
    ngOnChanges(changes) {
        if ('text' in changes || 'decorations' in changes) {
            this.segments = this.createSegments();
        }
    }
    /**
     * Creates an array of decorated text segments based on
     * the latest text and decorations.
     *
     * @returns The new segments
     */
    createSegments() {
        const { text } = this;
        if (!text) {
            // No styling can be applied to empty text fields
            return [this.makeUndecoratedSegment(text)];
        }
        const decorations = this.getNormalizedDecorations();
        if (decorations.length === 0) {
            // No styling available
            return [this.makeUndecoratedSegment(text)];
        }
        const stackOps = this.createStackOps(decorations);
        const segments = [];
        let stack = [];
        let lastIndex = 0;
        // If the first op starts at index zero apply stack changes
        // but don't push a segment by shifing out the first op
        if (stackOps[0].index === 0) {
            stack = this.updateStack(stack, stackOps.shift());
        }
        // Build segments based on the stack operations
        for (const op of stackOps) {
            segments.push(this.makeDecoratedSegment(text.slice(lastIndex, op.index), stack));
            lastIndex = op.index;
            stack = this.updateStack(stack, op);
        }
        // Push the last segment if not already done
        if (lastIndex !== text.length) {
            segments.push(this.makeDecoratedSegment(text.slice(lastIndex), stack));
        }
        return segments;
    }
    /**
     * Creates an ordered array of stack operations to apply when building segments.
     *
     * @param ranges The decorated ranges to apply
     * @returns The array of operations
     */
    createStackOps(ranges) {
        const ops = {};
        const getOp = (index) => (ops[index] ??= { index, added: [], removed: [] });
        for (const range of ranges) {
            getOp(range.start).added.push(range);
            getOp(range.end).removed.push(range);
        }
        return Object.entries(ops)
            .sort((i1, i2) => +i1[0] - +i2[0]) // Sort by index
            .map((entry) => entry[1]);
    }
    /**
     * Applies the stack changes specified by the stack operation.
     *
     * @param stack The current stack
     * @param op The operation
     * @returns The new stack
     */
    updateStack(stack, op) {
        return (stack
            .filter((item) => !op.removed.includes(item))
            // Note - A new array is created by the above filter statement
            // so it is safe to modify it with concat
            .concat(op.added));
    }
    /**
     * Normalizes and filters valid decorated ranges.
     *
     * @returns The normalized ranges with properties filled
     */
    getNormalizedDecorations() {
        const { decorations = [], text: { length }, } = this;
        return (decorations
            // Turn partials into full objects
            .map((range) => normalize(range, length))
            // Remove empty and out of bounds ranges
            .filter((range) => range.start < length && range.start < range.end));
    }
    /**
     * Creates a segment without any decoration
     *
     * @param text The text for the segment
     * @returns A segment without any decoration
     */
    makeUndecoratedSegment(text) {
        return { text, classes: [], styles: {} };
    }
    /**
     * Creates a segment with decoration
     *
     * @param text The text for the segment
     * @param decorations Decorations for this segment
     * @returns A decorated segment
     */
    makeDecoratedSegment(text, decorations) {
        const classes = decorations.reduce((result, range) => result.concat(range.classes), []);
        const styles = decorations.reduce((result, range) => ({ ...result, ...range.styles }), {});
        return { text, classes, styles };
    }
    static ɵfac = function DecoratedTextComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecoratedTextComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DecoratedTextComponent, selectors: [["ccf-decorated-text"]], hostVars: 2, hostBindings: function DecoratedTextComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { text: "text", decorations: "decorations" }, standalone: false, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", "style", 4, "ngFor", "ngForOf"]], template: function DecoratedTextComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DecoratedTextComponent_span_0_Template, 2, 5, "span", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.segments);
        } }, dependencies: [i1.NgForOf], styles: ["[_nghost-%COMP%]{display:flex}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecoratedTextComponent, [{
        type: Component,
        args: [{ selector: 'ccf-decorated-text', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<span *ngFor=\"let segment of segments\" [class]=\"segment.classes\" [style]=\"segment.styles\">\n  {{ segment.text }}\n</span>\n", styles: [":host{display:flex}\n"] }]
    }], null, { clsName: [{
            type: HostBinding,
            args: ['class']
        }], text: [{
            type: Input
        }], decorations: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DecoratedTextComponent, { className: "DecoratedTextComponent", filePath: "lib/components/decorated-text/decorated-text.component.ts", lineNumber: 38 }); })();

class DecoratedTextModule {
    static ɵfac = function DecoratedTextModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecoratedTextModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: DecoratedTextModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecoratedTextModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [DecoratedTextComponent],
                exports: [DecoratedTextComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DecoratedTextModule, { declarations: [DecoratedTextComponent], imports: [CommonModule], exports: [DecoratedTextComponent] }); })();

function StoreDebugComponent_div_0_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 4);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "json");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const kv_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", kv_r1[0], ": ", i0.ɵɵpipeBind1(2, 2, kv_r1[1]));
} }
function StoreDebugComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 2);
    i0.ɵɵtemplate(4, StoreDebugComponent_div_0_li_4_Template, 3, 4, "li", 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const state_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(state_r2[0]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", state_r2[1]);
} }
/**
 * Simple component for displaying the current values in the data store.
 */
class StoreDebugComponent {
    /** HTML class name */
    clsName = 'ccf-store-debug';
    /**
     * Gets the store data as a list of state name to key-value pairs
     */
    get data() {
        const states = Object.entries(this.root);
        const stateValues = states.map(([key, values]) => [key, Object.entries(values)]);
        return stateValues.filter(([, values]) => values.length > 0);
    }
    /** Latest store data */
    root = {};
    /** Subscriptions managed by this component */
    subscriptions = new Subscription();
    /**
     * Creates an instance of store debug component.
     * Sets up the store data listeners.
     *
     * @param store The data store.
     * @param cdr Change detection for this component.
     */
    constructor() {
        const store = inject(Store);
        const cdr = inject(ChangeDetectorRef);
        const sub = store.subscribe((root) => {
            this.root = root;
            cdr.markForCheck();
        });
        this.subscriptions.add(sub);
    }
    /**
     * Cleans up subscriptions
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    static ɵfac = function StoreDebugComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StoreDebugComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StoreDebugComponent, selectors: [["ccf-store-debug"]], hostVars: 2, hostBindings: function StoreDebugComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, standalone: false, decls: 1, vars: 1, consts: [["class", "state", 4, "ngFor", "ngForOf"], [1, "state"], [1, "kvlist"], ["class", "kvpair", 4, "ngFor", "ngForOf"], [1, "kvpair"]], template: function StoreDebugComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StoreDebugComponent_div_0_Template, 5, 2, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.data);
        } }, dependencies: [i1.NgForOf, i1.JsonPipe], styles: ["[_nghost-%COMP%]{display:block}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StoreDebugComponent, [{
        type: Component,
        args: [{ selector: 'ccf-store-debug', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div *ngFor=\"let state of data\" class=\"state\">\n  <div>{{ state[0] }}</div>\n  <ul class=\"kvlist\">\n    <li *ngFor=\"let kv of state[1]\" class=\"kvpair\">{{ kv[0] }}: {{ kv[1] | json }}</li>\n  </ul>\n</div>\n", styles: [":host{display:block}\n"] }]
    }], () => [], { clsName: [{
            type: HostBinding,
            args: ['class']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StoreDebugComponent, { className: "StoreDebugComponent", filePath: "lib/components/store-debug/store-debug.component.ts", lineNumber: 20 }); })();

class StoreDebugModule {
    static ɵfac = function StoreDebugModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StoreDebugModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: StoreDebugModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StoreDebugModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [StoreDebugComponent],
                exports: [StoreDebugComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(StoreDebugModule, { declarations: [StoreDebugComponent], imports: [CommonModule], exports: [StoreDebugComponent] }); })();

const _c0 = [[["", "matPrefix", ""]], [["", "matSuffix", ""]]];
const _c1 = ["[matPrefix]", "[matSuffix]"];
function TextSearchComponent_mat_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option");
    i0.ɵɵelement(1, "ccf-decorated-text", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("text", option_r2.label)("decorations", option_r2.decorations);
} }
/**
 * Token to provide a default for the maximum number of
 * autocomplete suggestions to show at the same time.
 */
const DEFAULT_MAX_OPTIONS = new InjectionToken('Maximum number of autocomplete options displayed', {
    providedIn: 'root',
    factory() {
        return 10;
    },
});
/**
 * A text search bar with optional autocompletion functionality.
 */
class TextSearchComponent {
    defaultMaxOptions = inject(DEFAULT_MAX_OPTIONS);
    /** HTML class name */
    clsName = 'ccf-text-search';
    /**
     * Placeholder text for the search bar
     */
    placeholder = 'Search...';
    /**
     * The text to show on the search bar
     */
    get value() {
        return this.controller.value;
    }
    set value(val) {
        this.controller.setValue(val, { emitEvent: false });
    }
    /**
     * Maximum number of autocomplete suggestions to show simultaneously
     */
    maxOptions;
    /**
     * Function providing the autocomplete suggestions.
     * Receives the latest search bar text and the maximum of suggestions to provide.
     */
    autoCompleter;
    /**
     * Emits when the search bar text changes
     */
    valueChange;
    /**
     * Emits when an autocomplete option has been selected
     */
    optionSelected = new EventEmitter();
    /**
     * Form controller for search bar
     */
    controller = new UntypedFormControl();
    /**
     * Fetches the latest autocomplete suggestions for the provided search text.
     *
     * @param search The search text to find suggestions for
     * @returns The found suggestions
     */
    getOptions = async (search) => {
        const { autoCompleter, maxOptions = this.defaultMaxOptions } = this;
        if (!autoCompleter || maxOptions < 1) {
            return [];
        }
        const options = autoCompleter(search, maxOptions);
        return lastValueFrom(from(options).pipe(take(1), map((array) => (array.length <= maxOptions ? array : array.slice(0, maxOptions)))));
    };
    /**
     * Emits the latest autocomplete suggestions
     */
    options = this.controller.valueChanges.pipe(startWith(''), distinctUntilChanged(), switchMap(this.getOptions));
    /**
     * Creates an instance of text search component.
     *
     * @param defaultMaxOptions The default value for `maxOptions`
     */
    constructor() {
        this.valueChange = this.controller.valueChanges;
    }
    /**
     * Text to show in search bar when an autocomplete option is selected.
     *
     * @param option The autocomplete option
     * @returns The displayed text
     */
    optionDisplay(option) {
        return option?.label ?? '';
    }
    /**
     * Gets an unique identifier for an autocomplete option object.
     *
     * @param _index Unused
     * @param option The option object
     * @returns The unique identifier
     */
    optionId(_index, option) {
        return option.id;
    }
    static ɵfac = function TextSearchComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextSearchComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextSearchComponent, selectors: [["ccf-text-search"]], hostVars: 2, hostBindings: function TextSearchComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { placeholder: "placeholder", value: "value", maxOptions: "maxOptions", autoCompleter: "autoCompleter" }, outputs: { valueChange: "valueChange", optionSelected: "optionSelected" }, standalone: false, ngContentSelectors: _c1, decls: 11, vars: 8, consts: [["auto", "matAutocomplete"], [1, "form"], ["appearance", "outline", 1, "form-field"], ["matPrefix", ""], ["matInput", "", "type", "search", 1, "input", 3, "placeholder", "formControl", "matAutocomplete"], [1, "autocomplete", 3, "optionSelected", "displayWith"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["matSuffix", ""], [3, "text", "decorations"]], template: function TextSearchComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "form", 1)(1, "mat-form-field", 2);
            i0.ɵɵelementContainerStart(2, 3);
            i0.ɵɵprojection(3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelement(4, "input", 4);
            i0.ɵɵelementStart(5, "mat-autocomplete", 5, 0);
            i0.ɵɵlistener("optionSelected", function TextSearchComponent_Template_mat_autocomplete_optionSelected_5_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.optionSelected.emit($event.option.value)); });
            i0.ɵɵtemplate(7, TextSearchComponent_mat_option_7_Template, 2, 2, "mat-option", 6);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerStart(9, 7);
            i0.ɵɵprojection(10, 1);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const auto_r3 = i0.ɵɵreference(6);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", ctx.placeholder)("formControl", ctx.controller)("matAutocomplete", auto_r3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("displayWith", ctx.optionDisplay);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(8, 6, ctx.options))("ngForTrackBy", ctx.optionId);
        } }, dependencies: [i1.NgForOf, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgForm, i2.FormControlDirective, i3.MatAutocomplete, i3.MatOption, i3.MatAutocompleteTrigger, i4.MatFormField, i4.MatPrefix, i4.MatSuffix, i5.MatInput, DecoratedTextComponent, i1.AsyncPipe], styles: ["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{margin-left:.5rem}[_nghost-%COMP%]     .mat-form-field-appearance-outline .mat-form-field-wrapper{margin:0}[_nghost-%COMP%]     .mat-form-field-appearance-outline .mat-form-field-wrapper .mat-form-field-flex{align-items:center}[_nghost-%COMP%]     .mat-form-field-appearance-outline .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{height:3rem;border:none}[_nghost-%COMP%]     .mat-form-field-appearance-outline .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-suffix{top:0;border:none}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextSearchComponent, [{
        type: Component,
        args: [{ selector: 'ccf-text-search', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<form class=\"form\">\n  <mat-form-field class=\"form-field\" appearance=\"outline\">\n    <ng-container matPrefix>\n      <ng-content select=\"[matPrefix]\"></ng-content>\n    </ng-container>\n\n    <input\n      matInput\n      type=\"search\"\n      class=\"input\"\n      [placeholder]=\"placeholder\"\n      [formControl]=\"controller\"\n      [matAutocomplete]=\"auto\"\n    />\n\n    <mat-autocomplete\n      class=\"autocomplete\"\n      [displayWith]=\"optionDisplay\"\n      (optionSelected)=\"optionSelected.emit($event.option.value)\"\n      #auto=\"matAutocomplete\"\n    >\n      <mat-option *ngFor=\"let option of options | async; trackBy: optionId\">\n        <ccf-decorated-text [text]=\"option.label\" [decorations]=\"option.decorations\"> </ccf-decorated-text>\n      </mat-option>\n    </mat-autocomplete>\n\n    <ng-container matSuffix>\n      <ng-content select=\"[matSuffix]\"></ng-content>\n    </ng-container>\n  </mat-form-field>\n</form>\n", styles: [":host{display:block}:host .form .form-field{width:100%}:host .form .form-field .input{margin-left:.5rem}:host ::ng-deep .mat-form-field-appearance-outline .mat-form-field-wrapper{margin:0}:host ::ng-deep .mat-form-field-appearance-outline .mat-form-field-wrapper .mat-form-field-flex{align-items:center}:host ::ng-deep .mat-form-field-appearance-outline .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{height:3rem;border:none}:host ::ng-deep .mat-form-field-appearance-outline .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-suffix{top:0;border:none}\n"] }]
    }], () => [], { clsName: [{
            type: HostBinding,
            args: ['class']
        }], placeholder: [{
            type: Input
        }], value: [{
            type: Input
        }], maxOptions: [{
            type: Input
        }], autoCompleter: [{
            type: Input
        }], valueChange: [{
            type: Output
        }], optionSelected: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextSearchComponent, { className: "TextSearchComponent", filePath: "lib/components/text-search/text-search.component.ts", lineNumber: 48 }); })();

class TextSearchModule {
    static ɵfac = function TextSearchModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextSearchModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TextSearchModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatAutocompleteModule,
            MatFormFieldModule,
            MatInputModule,
            DecoratedTextModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextSearchModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatAutocompleteModule,
                    MatFormFieldModule,
                    MatInputModule,
                    DecoratedTextModule,
                ],
                declarations: [TextSearchComponent],
                exports: [
                    TextSearchComponent,
                    // Reexport prefix/suffix markers
                    MatPrefix,
                    MatSuffix,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TextSearchModule, { declarations: [TextSearchComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        DecoratedTextModule], exports: [TextSearchComponent,
        // Reexport prefix/suffix markers
        MatPrefix,
        MatSuffix] }); })();

function OpacitySliderComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function OpacitySliderComponent_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleVisibility()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "visibility_off");
    i0.ɵɵelementEnd()();
} }
function OpacitySliderComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function OpacitySliderComponent_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleVisibility()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "visibility_on");
    i0.ɵɵelementEnd()();
} }
/**
 * Slider for setting opacity on an anatomical structure
 */
class OpacitySliderComponent {
    /** HTML class name */
    clsName = 'ccf-opacity-slider';
    /** The value displayed in the slider */
    opacity = model(20, ...(ngDevMode ? [{ debugName: "opacity" }] : []));
    /** Whether the item is set to visible */
    visible = input(true, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    /** Emits the updated opacity when the opacity changes */
    opacityChange = output();
    /** Emitted when slider visibility is toggled */
    visibilityToggle = output();
    /** Emitter for resetting all opacity values to default */
    opacityReset = output();
    /** Emitted when slider thumb is moved */
    sliderChanged = output();
    /** Previous opacity */
    prevOpacity = signal(0, ...(ngDevMode ? [{ debugName: "prevOpacity" }] : []));
    /** Initialize the component */
    ngOnInit() {
        if (this.visible()) {
            this.prevOpacity.set(0);
        }
        else {
            this.prevOpacity.set(20);
        }
    }
    /** Reset previous opacity */
    reset() {
        this.prevOpacity.set(20);
    }
    /**
     * Emits signal to toggle the visibility of the item
     */
    toggleVisibility() {
        const temp = this.opacity();
        this.opacity.set(this.prevOpacity());
        this.prevOpacity.set(temp);
        this.visibilityToggle.emit();
        this.opacityChange.emit(this.opacity());
    }
    /**
     * Emits signal to reset the opacity of the item
     */
    resetOpacity() {
        this.prevOpacity.set(0);
        this.opacityReset.emit();
    }
    static ɵfac = function OpacitySliderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpacitySliderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpacitySliderComponent, selectors: [["ccf-opacity-slider"]], hostVars: 2, hostBindings: function OpacitySliderComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { opacity: [1, "opacity"], visible: [1, "visible"] }, outputs: { opacity: "opacityChange", opacityChange: "opacityChange", visibilityToggle: "visibilityToggle", opacityReset: "opacityReset", sliderChanged: "sliderChanged" }, decls: 14, vars: 8, consts: [["slider", ""], ["input", ""], [1, "icons"], ["hraFeature", "visibility-off", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Hide", 1, "visibility", "icon", "visible"], ["hraFeature", "visibility-on", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Show", 1, "visibility", "icon", "invisible"], ["hraFeature", "reset", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Reset", 1, "icon", "reset", 3, "click"], ["hraFeature", "slider", "hraClickEvent", "", 1, "slider", 3, "step", "min", "max"], ["matSliderThumb", "", 1, "opacity-slider", 3, "input", "value"], ["hraFeature", "input", "hraClickEvent", "", "subscriptSizing", "dynamic"], ["matInput", "", "type", "number", 3, "input", "value"], ["hraFeature", "visibility-off", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Hide", 1, "visibility", "icon", "visible", 3, "click"], ["hraFeature", "visibility-on", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Show", 1, "visibility", "icon", "invisible", 3, "click"]], template: function OpacitySliderComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵconditionalCreate(1, OpacitySliderComponent_Conditional_1_Template, 3, 0, "button", 3)(2, OpacitySliderComponent_Conditional_2_Template, 3, 0, "button", 4);
            i0.ɵɵelementStart(3, "button", 5);
            i0.ɵɵlistener("click", function OpacitySliderComponent_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.resetOpacity()); });
            i0.ɵɵelementStart(4, "mat-icon");
            i0.ɵɵtext(5, "reset_settings");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "mat-slider", 6)(7, "input", 7, 0);
            i0.ɵɵlistener("input", function OpacitySliderComponent_Template_input_input_7_listener() { i0.ɵɵrestoreView(_r1); const slider_r5 = i0.ɵɵreference(8); return i0.ɵɵresetView(ctx.opacityChange.emit(+slider_r5.value)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "mat-form-field", 8)(10, "mat-label");
            i0.ɵɵtext(11, "Opacity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "input", 9, 1);
            i0.ɵɵlistener("input", function OpacitySliderComponent_Template_input_input_12_listener() { i0.ɵɵrestoreView(_r1); const input_r6 = i0.ɵɵreference(13); return i0.ɵɵresetView(ctx.opacityChange.emit(+input_r6.value || 0)); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.opacity() > 0 ? 1 : 2);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("disabled", !ctx.visible());
            i0.ɵɵproperty("step", 1)("min", 0)("max", 100);
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.opacity());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.opacity());
        } }, dependencies: [CommonModule,
            MatIconModule, i1$1.MatIcon, MatSliderModule, i2$1.MatSlider, i2$1.MatSliderThumb, MatRippleModule,
            MatInputModule, i5.MatInput, i4.MatFormField, i4.MatLabel, ButtonsModule, i5$1.MatIconButton, PlainTooltipDirective], styles: ["[_nghost-%COMP%]{display:flex;width:100%;align-items:center;padding:1rem;border-radius:.5rem;background-color:var(--mat-sys-on-primary);box-shadow:0 5px 4px #201e3d29}[_nghost-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:5rem}[_nghost-%COMP%]   mat-slider[_ngcontent-%COMP%]{--mat-slider-active-track-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-inactive-track-color: #acb5c3;--mat-slider-handle-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-active-track-height: 2px;--mat-slider-inactive-track-height: 2px;width:10rem;margin:0 1.5rem}[_nghost-%COMP%]   mat-slider.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:not-allowed}[_nghost-%COMP%]   mat-slider[_ngcontent-%COMP%]     mat-slider-visual-thumb{transition:none}[_nghost-%COMP%]   mat-slider[_ngcontent-%COMP%]     .mdc-slider__track--inactive{opacity:1}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpacitySliderComponent, [{
        type: Component,
        args: [{ selector: 'ccf-opacity-slider', imports: [
                    CommonModule,
                    MatIconModule,
                    MatSliderModule,
                    MatRippleModule,
                    MatInputModule,
                    ButtonsModule,
                    PlainTooltipDirective,
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"icons\">\n  @if (opacity() > 0) {\n    <button\n      hraFeature=\"visibility-off\"\n      hraClickEvent\n      mat-icon-button\n      class=\"visibility icon visible\"\n      (click)=\"toggleVisibility()\"\n      hraPlainTooltip=\"Hide\"\n    >\n      <mat-icon>visibility_off</mat-icon>\n    </button>\n  } @else {\n    <button\n      hraFeature=\"visibility-on\"\n      hraClickEvent\n      mat-icon-button\n      class=\"visibility icon invisible\"\n      (click)=\"toggleVisibility()\"\n      hraPlainTooltip=\"Show\"\n    >\n      <mat-icon>visibility_on</mat-icon>\n    </button>\n  }\n  <button\n    hraFeature=\"reset\"\n    hraClickEvent\n    mat-icon-button\n    class=\"icon reset\"\n    (click)=\"resetOpacity()\"\n    hraPlainTooltip=\"Reset\"\n  >\n    <mat-icon>reset_settings</mat-icon>\n  </button>\n</div>\n\n<mat-slider\n  hraFeature=\"slider\"\n  hraClickEvent\n  class=\"slider\"\n  [class.disabled]=\"!visible()\"\n  [step]=\"1\"\n  [min]=\"0\"\n  [max]=\"100\"\n>\n  <input\n    matSliderThumb\n    class=\"opacity-slider\"\n    [value]=\"opacity()\"\n    (input)=\"opacityChange.emit(+slider.value)\"\n    #slider\n  />\n</mat-slider>\n\n<mat-form-field hraFeature=\"input\" hraClickEvent subscriptSizing=\"dynamic\">\n  <mat-label>Opacity</mat-label>\n  <input matInput [value]=\"opacity()\" (input)=\"opacityChange.emit(+input.value || 0)\" type=\"number\" #input />\n</mat-form-field>\n", styles: [":host{display:flex;width:100%;align-items:center;padding:1rem;border-radius:.5rem;background-color:var(--mat-sys-on-primary);box-shadow:0 5px 4px #201e3d29}:host mat-form-field{width:5rem}:host mat-slider{--mat-slider-active-track-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-inactive-track-color: #acb5c3;--mat-slider-handle-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-active-track-height: 2px;--mat-slider-inactive-track-height: 2px;width:10rem;margin:0 1.5rem}:host mat-slider.disabled{pointer-events:none;cursor:not-allowed}:host mat-slider ::ng-deep mat-slider-visual-thumb{transition:none}:host mat-slider ::ng-deep .mdc-slider__track--inactive{opacity:1}\n"] }]
    }], null, { clsName: [{
            type: HostBinding,
            args: ['class']
        }], opacity: [{ type: i0.Input, args: [{ isSignal: true, alias: "opacity", required: false }] }, { type: i0.Output, args: ["opacityChange"] }], visible: [{ type: i0.Input, args: [{ isSignal: true, alias: "visible", required: false }] }], opacityChange: [{ type: i0.Output, args: ["opacityChange"] }], visibilityToggle: [{ type: i0.Output, args: ["visibilityToggle"] }], opacityReset: [{ type: i0.Output, args: ["opacityReset"] }], sliderChanged: [{ type: i0.Output, args: ["sliderChanged"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpacitySliderComponent, { className: "OpacitySliderComponent", filePath: "lib/components/opacity-slider/opacity-slider.component.ts", lineNumber: 28 }); })();

function InfoDialogComponent_div_10_mat_expansion_panel_1_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "hra-youtube-player", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("videoId", ctx_r0.videoID);
} }
function InfoDialogComponent_div_10_mat_expansion_panel_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-expansion-panel", 11)(1, "mat-expansion-panel-header")(2, "h2", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 13);
    i0.ɵɵelement(5, "markdown", 14);
    i0.ɵɵtemplate(6, InfoDialogComponent_div_10_mat_expansion_panel_1_div_6_Template, 2, 1, "div", 15);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const content_r3 = ctx_r1.$implicit;
    const i_r4 = ctx_r1.index;
    i0.ɵɵproperty("expanded", i_r4 === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(content_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("first", i_r4 === 0);
    i0.ɵɵproperty("data", content_r3.content);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r4 === 0);
} }
function InfoDialogComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, InfoDialogComponent_div_10_mat_expansion_panel_1_Template, 7, 6, "mat-expansion-panel", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const content_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", content_r3);
} }
/**
 * This component handles displaying and hiding a full screen modal / overlay that displays information about the project.
 */
class InfoDialogComponent {
    /** Dialog reference */
    dialogRef = inject(MatDialogRef);
    /** Data from parent */
    data = inject(MAT_DIALOG_DATA);
    /**
     * Documentation contents
     */
    documentationContents = this.data.content || [];
    /**
     * Title of the dialog
     */
    infoTitle = this.data.title || '';
    /**
     * URL for video
     */
    videoID = this.data.videoID;
    /**
     * load the youtube player api in on init
     */
    ngOnInit() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }
    /**
     * Closes info dialog component
     */
    close() {
        document.getElementsByClassName('modal-animated')[0]?.classList.add('modal-animate-fade-out');
        setTimeout(() => {
            this.dialogRef.close();
        }, 250);
    }
    static ɵfac = function InfoDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfoDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InfoDialogComponent, selectors: [["ccf-info-dialog"]], standalone: false, decls: 11, vars: 2, consts: [[1, "about", "wrapper"], [1, "container"], [1, "content"], [1, "header"], ["mat-dialog-title", "", 1, "title"], [1, "close"], [1, "material-icons", "close-icon", 3, "click"], [1, "mat-typography", "dialog-content"], ["class", "panel", 4, "ngFor", "ngForOf"], [1, "panel"], [3, "expanded", 4, "ngIf"], [3, "expanded"], [1, "no-header-margin"], [1, "top-padding"], [1, "variable-binding", 3, "data"], ["class", "video-player", 4, "ngIf"], [1, "video-player"], ["hraFeature", "info-video", "label", "Info video", 3, "videoId"]], template: function InfoDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 5)(7, "mat-icon", 6);
            i0.ɵɵlistener("click", function InfoDialogComponent_Template_mat_icon_click_7_listener() { return ctx.close(); });
            i0.ɵɵtext(8, "clear");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "mat-dialog-content", 7);
            i0.ɵɵtemplate(10, InfoDialogComponent_div_10_Template, 2, 1, "div", 8);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.infoTitle);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.documentationContents);
        } }, dependencies: [i1.NgForOf, i1.NgIf, i2$2.MatDialogTitle, i2$2.MatDialogContent, i1$1.MatIcon, i4$1.MatExpansionPanel, i4$1.MatExpansionPanelHeader, i5$2.HraYoutubePlayerComponent, i6.MarkdownComponent], styles: [".mat-dialog-container{padding:0}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:1.5rem;text-align:left}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;height:3rem;margin-bottom:2.25rem;position:relative}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.5rem;margin-bottom:1rem}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{cursor:pointer;height:3rem;width:3rem;line-height:3rem;text-align:center;transition:.6s}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.5rem;margin:0 auto;line-height:3rem;height:3rem;justify-self:center;display:flex}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:1rem;margin-top:0;margin-bottom:.5rem}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]{margin-bottom:1.5rem}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .no-header-margin[_ngcontent-%COMP%]{font-weight:300;margin-bottom:0}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .top-padding[_ngcontent-%COMP%]{display:flex}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .top-padding[_ngcontent-%COMP%]   markdown[_ngcontent-%COMP%]     ul{margin-top:0;padding-left:1.5rem}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]{height:50rem;min-height:10rem;padding:0 1.5rem}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .variable-binding[_ngcontent-%COMP%]{font-weight:300;display:flex}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .variable-binding.first[_ngcontent-%COMP%]{padding-right:1rem;width:73%}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .variable-binding[_ngcontent-%COMP%]     ul{margin:0}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .variable-binding[_ngcontent-%COMP%]     img{margin-left:1rem;float:right}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .video-player[_ngcontent-%COMP%]{position:relative;width:50%}.about.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .video-player[_ngcontent-%COMP%]     iframe{width:100%;height:100%}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfoDialogComponent, [{
        type: Component,
        args: [{ selector: 'ccf-info-dialog', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div class=\"about wrapper\">\n  <div class=\"container\">\n    <div class=\"content\">\n      <div class=\"header\">\n        <h2 class=\"title\" mat-dialog-title>{{ infoTitle }}</h2>\n        <div class=\"close\">\n          <mat-icon class=\"material-icons close-icon\" (click)=\"close()\">clear</mat-icon>\n        </div>\n      </div>\n\n      <mat-dialog-content class=\"mat-typography dialog-content\">\n        <div *ngFor=\"let content of documentationContents; let i = index\" class=\"panel\">\n          <mat-expansion-panel *ngIf=\"content\" [expanded]=\"i === 0\">\n            <mat-expansion-panel-header>\n              <h2 class=\"no-header-margin\">{{ content.title }}</h2>\n            </mat-expansion-panel-header>\n            <div class=\"top-padding\">\n              <markdown class=\"variable-binding\" [class.first]=\"i === 0\" [data]=\"content.content\"></markdown>\n              <div class=\"video-player\" *ngIf=\"i === 0\">\n                <hra-youtube-player hraFeature=\"info-video\" [videoId]=\"videoID\" label=\"Info video\" />\n              </div>\n            </div>\n          </mat-expansion-panel>\n        </div>\n      </mat-dialog-content>\n    </div>\n  </div>\n</div>\n", styles: ["::ng-deep .mat-dialog-container{padding:0}.about.wrapper .container .content{padding:1.5rem;text-align:left}.about.wrapper .container .content .header{display:flex;justify-content:space-between;height:3rem;margin-bottom:2.25rem;position:relative}.about.wrapper .container .description{font-size:.875rem;line-height:1.5rem;margin-bottom:1rem}.about.wrapper .container .close .close-icon{cursor:pointer;height:3rem;width:3rem;line-height:3rem;text-align:center;transition:.6s}.about.wrapper .container .title{font-size:1.5rem;margin:0 auto;line-height:3rem;height:3rem;justify-self:center;display:flex}.about.wrapper .container .subtitle{font-size:1rem;margin-top:0;margin-bottom:.5rem}.about.wrapper .container .panel{margin-bottom:1.5rem}.about.wrapper .container .panel .no-header-margin{font-weight:300;margin-bottom:0}.about.wrapper .container .panel .top-padding{display:flex}.about.wrapper .container .panel .top-padding markdown ::ng-deep ul{margin-top:0;padding-left:1.5rem}.about.wrapper .container .dialog-content{height:50rem;min-height:10rem;padding:0 1.5rem}.about.wrapper .container .dialog-content .variable-binding{font-weight:300;display:flex}.about.wrapper .container .dialog-content .variable-binding.first{padding-right:1rem;width:73%}.about.wrapper .container .dialog-content .variable-binding ::ng-deep ul{margin:0}.about.wrapper .container .dialog-content .variable-binding ::ng-deep img{margin-left:1rem;float:right}.about.wrapper .container .dialog-content .video-player{position:relative;width:50%}.about.wrapper .container .dialog-content .video-player ::ng-deep iframe{width:100%;height:100%}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InfoDialogComponent, { className: "InfoDialogComponent", filePath: "lib/components/info/info-dialog/info-dialog.component.ts", lineNumber: 27 }); })();

class InfoDialogModule {
    static ɵfac = function InfoDialogModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfoDialogModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: InfoDialogModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
            MatDialogModule,
            MatIconModule,
            MatExpansionModule,
            HraYoutubePlayerComponent,
            MarkdownModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfoDialogModule, [{
        type: NgModule,
        args: [{
                declarations: [InfoDialogComponent],
                imports: [
                    CommonModule,
                    MatDialogModule,
                    MatIconModule,
                    MatExpansionModule,
                    HraYoutubePlayerComponent,
                    MarkdownModule,
                ],
                exports: [InfoDialogComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(InfoDialogModule, { declarations: [InfoDialogComponent], imports: [CommonModule,
        MatDialogModule,
        MatIconModule,
        MatExpansionModule,
        HraYoutubePlayerComponent,
        MarkdownModule], exports: [InfoDialogComponent] }); })();

/** Info button service */
class InfoButtonService {
    /** Http client */
    http = inject(HttpClient);
    /** Subject to send the documentation data to the component when its done processing */
    panelContent = new BehaviorSubject({
        content: [],
        infoTitle: '',
        videoID: '',
    });
    /**
     * Read the markdown file to split it by h1 tags and update the panel title and videoID.
     */
    updateData(url, videoID, infoTitle) {
        this.http.get(url, { responseType: 'text' }).subscribe((data) => {
            const panelContent = {
                content: this.parseMarkdown(data),
                infoTitle: infoTitle,
                videoID: videoID,
            };
            this.panelContent.next(panelContent);
        });
    }
    /**
     * Function to parse the markdown file and convert to
     * documentation content used by the info-dialog panels
     *
     * @param data Markdown file sent as a string after reading it
     * @returns array of DocumentationContent
     */
    parseMarkdown(data) {
        const markdownContent = [];
        const splitByHeaderTag = data.split('# ');
        for (const split of splitByHeaderTag) {
            if (split.length) {
                const newLine = split.includes('\n\n') ? '\n\n' : '\r\n\r\n';
                const headerAndContent = split.split(newLine);
                markdownContent.push({
                    title: headerAndContent[0],
                    content: headerAndContent.splice(1).join(newLine),
                });
            }
        }
        return markdownContent;
    }
    static ɵfac = function InfoButtonService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfoButtonService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: InfoButtonService, factory: InfoButtonService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfoButtonService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();

/**
 * Info button component: Information icon displays project details when clicked.
 */
class InfoButtonComponent {
    /** Dialog service */
    dialog = inject(MatDialog);
    /** Info button service */
    infoButtonService = inject(InfoButtonService);
    /**
     * Title of the info dialog
     */
    infoTitle = '';
    /**
     * Whether the information is for the RUI or EUI
     */
    videoID;
    /** Documentation url */
    documentationUrl;
    /** Subscriptions */
    subscriptions = new Subscription();
    /**
     * Creates an instance of info button component.
     */
    constructor() {
        const infoButtonService = this.infoButtonService;
        this.subscriptions.add(infoButtonService.panelContent.subscribe((data) => {
            if (data.content.length) {
                this.launchInfoDialog(data);
            }
        }));
    }
    /**
     * Unsubscribe to the observable when the component
     * is destroyed
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    /**
     * Opens the info dialogue with the project details
     */
    launchInfoDialog(data) {
        if (this.dialog.openDialogs.length === 0) {
            //Prevent multiple dialogs from opening
            this.dialog.open(InfoDialogComponent, {
                autoFocus: false,
                panelClass: 'modal-animated',
                width: '72rem',
                data: {
                    title: data.infoTitle,
                    content: data.content,
                    videoID: data.videoID,
                },
            });
        }
    }
    /**
     * Detects button click and updates panel data
     */
    onDialogButtonClick() {
        this.infoButtonService.updateData(this.documentationUrl, this.videoID, this.infoTitle);
    }
    static ɵfac = function InfoButtonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfoButtonComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InfoButtonComponent, selectors: [["ccf-info-button"]], inputs: { infoTitle: "infoTitle", videoID: "videoID", documentationUrl: "documentationUrl" }, standalone: false, decls: 3, vars: 0, consts: [[1, "info-button-wrapper"], ["aria-hidden", "false", "aria-label", "Page information", 1, "ccf-info-button", 3, "click"]], template: function InfoButtonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "mat-icon", 1);
            i0.ɵɵlistener("click", function InfoButtonComponent_Template_mat_icon_click_1_listener() { return ctx.onDialogButtonClick(); });
            i0.ɵɵtext(2, " info ");
            i0.ɵɵelementEnd()();
        } }, dependencies: [i1$1.MatIcon], styles: [".info-button-wrapper[_ngcontent-%COMP%]{border-radius:.25rem;padding:.65rem;transition:.6s}.info-button-wrapper[_ngcontent-%COMP%]   .ccf-info-button[_ngcontent-%COMP%]{cursor:pointer;transition:color .6s;font-size:1.5rem;vertical-align:sub}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfoButtonComponent, [{
        type: Component,
        args: [{ selector: 'ccf-info-button', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div class=\"info-button-wrapper\">\n  <mat-icon class=\"ccf-info-button\" aria-hidden=\"false\" aria-label=\"Page information\" (click)=\"onDialogButtonClick()\">\n    info\n  </mat-icon>\n</div>\n", styles: [".info-button-wrapper{border-radius:.25rem;padding:.65rem;transition:.6s}.info-button-wrapper .ccf-info-button{cursor:pointer;transition:color .6s;font-size:1.5rem;vertical-align:sub}\n"] }]
    }], () => [], { infoTitle: [{
            type: Input
        }], videoID: [{
            type: Input
        }], documentationUrl: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InfoButtonComponent, { className: "InfoButtonComponent", filePath: "lib/components/info/info-button/info-button.component.ts", lineNumber: 19 }); })();

class InfoButtonModule {
    static ɵfac = function InfoButtonModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfoButtonModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: InfoButtonModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [provideHttpClient(withInterceptorsFromDi())], imports: [CommonModule, InfoDialogModule, MatIconModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfoButtonModule, [{
        type: NgModule,
        args: [{
                declarations: [InfoButtonComponent],
                exports: [InfoButtonComponent],
                imports: [CommonModule, InfoDialogModule, MatIconModule],
                providers: [provideHttpClient(withInterceptorsFromDi())],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(InfoButtonModule, { declarations: [InfoButtonComponent], imports: [CommonModule, InfoDialogModule, MatIconModule], exports: [InfoButtonComponent] }); })();

/**
 * Info button component: Information icon displays project details when clicked.
 */
class CallToActionComponent {
    /**HTML class */
    clsName = 'ccf-call-to-action';
    /**
     * Title of the info dialog
     */
    infoTitle;
    /**
     * Whether the information is for the RUI or EUI
     */
    imageUrl;
    /**
     * Message to be displayed under image
     */
    message;
    /**
     * Label for the button
     */
    callToAction;
    /**
     *  Emmitter for component to pass info to parent
     * */
    callToActionClicked = new EventEmitter();
    /**
     *  Emmitter for component to pass info to parent
     * */
    closeClicked = new EventEmitter();
    /**
     * Function to handle the close button click action
     */
    close() {
        this.closeClicked.emit();
    }
    /**
     * Detects button click and reads markdown function
     */
    onDialogButtonClick() {
        this.callToActionClicked.emit();
    }
    static ɵfac = function CallToActionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallToActionComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CallToActionComponent, selectors: [["ccf-call-to-action"]], hostVars: 2, hostBindings: function CallToActionComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { infoTitle: "infoTitle", imageUrl: "imageUrl", message: "message", callToAction: "callToAction" }, outputs: { callToActionClicked: "callToActionClicked", closeClicked: "closeClicked" }, standalone: false, decls: 13, vars: 4, consts: [[1, "rui-about", "wrapper"], [1, "container"], [1, "content"], [1, "first-row"], ["mat-dialog-title", "", 1, "title"], [1, "cta-mat-icon", "material-icons", "close-icon", 3, "click"], ["mat-card-sm-image", "", "alt", "preview", "layout-fill", "", 1, "cta-image", 3, "src"], [1, "mat-typography", "dialog-content"], [1, "message"], ["mat-button", "", 1, "mat-button", 3, "click", "text"]], template: function CallToActionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "p", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "mat-icon", 5);
            i0.ɵɵlistener("click", function CallToActionComponent_Template_mat_icon_click_6_listener() { return ctx.close(); });
            i0.ɵɵtext(7, "clear");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(8, "img", 6);
            i0.ɵɵelementStart(9, "mat-dialog-content", 7)(10, "div", 8);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "a", 9);
            i0.ɵɵlistener("click", function CallToActionComponent_Template_a_click_12_listener() { return ctx.onDialogButtonClick(); });
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.infoTitle);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("src", ctx.imageUrl, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance();
            i0.ɵɵproperty("text", ctx.callToAction);
        } }, dependencies: [i1$1.MatIcon, i2$2.MatDialogTitle, i2$2.MatDialogContent, i3$1.MatCardSmImage], styles: ["[_nghost-%COMP%]   .content[_ngcontent-%COMP%]{display:block;align-content:center;padding-left:1.6rem;padding-right:1.6rem;border-radius:.25rem}[_nghost-%COMP%]   .info-button-wrapper[_ngcontent-%COMP%]{border-radius:.25rem;padding:.6rem;transition:.6s}[_nghost-%COMP%]   .info-button-wrapper[_ngcontent-%COMP%]   .ccf-info-button[_ngcontent-%COMP%]{cursor:pointer;transition:color .6s;font-size:1.2rem;vertical-align:sub}[_nghost-%COMP%]   .first-row[_ngcontent-%COMP%]{display:flex;width:100%;line-height:.9rem}[_nghost-%COMP%]   .first-row[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{padding-right:7rem;padding-left:.2rem;font-size:.875rem;padding-top:.75rem}[_nghost-%COMP%]   .first-row[_ngcontent-%COMP%]   .cta-mat-icon[_ngcontent-%COMP%]{height:30%;line-height:3.4rem}[_nghost-%COMP%]   .message[_ngcontent-%COMP%]{padding:.5rem}[_nghost-%COMP%]   .cta-image[_ngcontent-%COMP%]{align-self:center;object-fit:cover;width:100%;border-radius:.25rem}[_nghost-%COMP%]   .mat-button[_ngcontent-%COMP%]{background-color:#444a65;font-size:.75rem;position:relative;margin-bottom:1rem;width:100%;height:2rem;color:#fff}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallToActionComponent, [{
        type: Component,
        args: [{ selector: 'ccf-call-to-action', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div class=\"rui-about wrapper\">\n  <div class=\"container\">\n    <div class=\"content\">\n      <div class=\"first-row\">\n        <p class=\"title\" mat-dialog-title>{{ infoTitle }}</p>\n        <mat-icon class=\"cta-mat-icon material-icons close-icon\" (click)=\"close()\">clear</mat-icon>\n      </div>\n      <img class=\"cta-image\" mat-card-sm-image [src]=\"imageUrl\" alt=\"preview\" layout-fill />\n\n      <mat-dialog-content class=\"mat-typography dialog-content\">\n        <div class=\"message\">{{ message }}</div>\n        <a mat-button class=\"mat-button\" [text]=\"callToAction\" (click)=\"onDialogButtonClick()\"> </a>\n      </mat-dialog-content>\n    </div>\n  </div>\n</div>\n", styles: [":host .content{display:block;align-content:center;padding-left:1.6rem;padding-right:1.6rem;border-radius:.25rem}:host .info-button-wrapper{border-radius:.25rem;padding:.6rem;transition:.6s}:host .info-button-wrapper .ccf-info-button{cursor:pointer;transition:color .6s;font-size:1.2rem;vertical-align:sub}:host .first-row{display:flex;width:100%;line-height:.9rem}:host .first-row .title{padding-right:7rem;padding-left:.2rem;font-size:.875rem;padding-top:.75rem}:host .first-row .cta-mat-icon{height:30%;line-height:3.4rem}:host .message{padding:.5rem}:host .cta-image{align-self:center;object-fit:cover;width:100%;border-radius:.25rem}:host .mat-button{background-color:#444a65;font-size:.75rem;position:relative;margin-bottom:1rem;width:100%;height:2rem;color:#fff}\n"] }]
    }], null, { clsName: [{
            type: HostBinding,
            args: ['class']
        }], infoTitle: [{
            type: Input
        }], imageUrl: [{
            type: Input
        }], message: [{
            type: Input
        }], callToAction: [{
            type: Input
        }], callToActionClicked: [{
            type: Output
        }], closeClicked: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CallToActionComponent, { className: "CallToActionComponent", filePath: "lib/components/call-to-action/call-to-action.component.ts", lineNumber: 13 }); })();

class CallToActionModule {
    static ɵfac = function CallToActionModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallToActionModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CallToActionModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, MatIconModule, MatDialogModule, MatCardModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallToActionModule, [{
        type: NgModule,
        args: [{
                declarations: [CallToActionComponent],
                imports: [CommonModule, MatIconModule, MatDialogModule, MatCardModule],
                exports: [CallToActionComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CallToActionModule, { declarations: [CallToActionComponent], imports: [CommonModule, MatIconModule, MatDialogModule, MatCardModule], exports: [CallToActionComponent] }); })();

/**
 * Directive for restricting an input element to integer only values.
 */
class NumberDirective {
    el = inject(ElementRef);
    /**
     * Listens to input changes and updates the text to only include numbers.
     *
     * @param event The input event
     */
    onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
    static ɵfac = function NumberDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NumberDirective)(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: NumberDirective, selectors: [["input", "ccfNumbersOnly", ""]], hostBindings: function NumberDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("input", function NumberDirective_input_HostBindingHandler($event) { return ctx.onInputChange($event); });
        } }, standalone: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumberDirective, [{
        type: Directive,
        args: [{
                selector: 'input[ccfNumbersOnly]',
                standalone: false,
            }]
    }], null, { onInputChange: [{
            type: HostListener,
            args: ['input', ['$event']]
        }] }); })();

class NumbersOnlyModule {
    static ɵfac = function NumbersOnlyModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NumbersOnlyModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NumbersOnlyModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({});
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumbersOnlyModule, [{
        type: NgModule,
        args: [{
                declarations: [NumberDirective],
                exports: [NumberDirective],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NumbersOnlyModule, { declarations: [NumberDirective], exports: [NumberDirective] }); })();

/** Global config state */
let GlobalConfigState = class GlobalConfigState extends NgxsImmutableDataRepository {
    /** Option accessor cache */
    optionCache = new Map();
    /** Get current config */
    get config$() {
        return this.state$.pipe(filterNulls(), shareReplay(1));
    }
    /** Set the config */
    setConfig(config) {
        this.setState(config);
    }
    /** Patch the config */
    patchConfig(config) {
        this.patchState(config);
    }
    /** Get a config property */
    getProperty(path) {
        return this.config$.pipe(pluck(...path), distinctUntilChanged(), shareReplay(1));
    }
    /** Get a config option */
    getOption(...path) {
        const key = this.getPathKey(path);
        if (this.optionCache.has(key)) {
            return this.optionCache.get(key) ?? of();
        }
        const obs = this.config$.pipe(pluck(...path), distinctUntilChanged(), shareReplay(1));
        this.optionCache.set(key, obs);
        return obs;
    }
    /** Gets the config option as a signal */
    getOptionSignal(k1) {
        return toSignal(this.getOption(k1), { requireSync: true });
    }
    /** Compute a key for a path */
    getPathKey(path) {
        return `${path.length}:${path.join('.')}`;
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵGlobalConfigState_BaseFactory; return function GlobalConfigState_Factory(__ngFactoryType__) { return (ɵGlobalConfigState_BaseFactory || (ɵGlobalConfigState_BaseFactory = i0.ɵɵgetInheritedFactory(GlobalConfigState)))(__ngFactoryType__ || GlobalConfigState); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: GlobalConfigState, factory: GlobalConfigState.ɵfac });
};
__decorate([
    Computed(),
    __metadata("design:type", Observable),
    __metadata("design:paramtypes", [])
], GlobalConfigState.prototype, "config$", null);
GlobalConfigState = __decorate([
    StateRepository(),
    State({
        name: 'globalConfig',
        defaults: null,
    })
], GlobalConfigState);
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GlobalConfigState, [{
        type: Injectable
    }], null, { config$: [] }); })();

/**
 * Provide functionality for interacting with the global object.
 */
class GlobalsService {
    /**
     * The found global object
     */
    get obj() {
        const obj = this.findGlobalObject();
        // Cache value on the instance
        Object.defineProperties(this, {
            obj: {
                configurable: false,
                writable: false,
                value: obj,
            },
        });
        return obj;
    }
    /**
     * Tests whether the global object has the specific key.
     * This method returns true even when the associated value
     * is undefined or null as long as the key exists.
     *
     * @param key The key
     *
     * @returns true if the key exists in the global object
     */
    has(key) {
        const { obj } = this;
        return obj != null && key in obj;
    }
    /**
     * Gets a value from the global object.
     *
     * @param key The key for the value
     * @param def An optional default value
     *
     * @returns The value if it exists otherwise the default value
     */
    get(key, def) {
        const { obj } = this;
        return (obj && obj[key]) ?? def;
    }
    /**
     * Sets a value on the global object.
     *
     * @param key The key to set the value on
     * @param value The new value
     *
     * @throws TypeError if the value is readonly
     */
    set(key, value) {
        const { obj } = this;
        if (obj) {
            obj[key] = value;
        }
    }
    /**
     * Removes a key from the global object.
     *
     * @param key The key to remove
     *
     * @throws TypeError if the key is not removable
     */
    remove(key) {
        const { obj } = this;
        if (obj) {
            delete obj[key];
        }
    }
    /**
     * Attempt to locate the global object.
     * Can be overridden in a subclass to check other locations
     * or completely change the object. This is especially useful
     * during testing.
     *
     * @returns The global object if found
     */
    /* istanbul ignore next This is really hard to test as it depends on the global environment */
    findGlobalObject() {
        // This should pretty much always be available unless
        // we are running in some outdated environment
        if (typeof globalThis !== 'undefined') {
            return globalThis;
        }
        // Check the common places for a global object
        if (typeof global !== 'undefined') {
            // Node.js environment
            return global;
        }
        else if (typeof window !== 'undefined') {
            // Browser environment
            return window;
        }
        else if (typeof self !== 'undefined') {
            // Web worker environment
            return self;
        }
        try {
            // One last try - may fail depending on content security policy (CSP) settings
            return new Function('return this;')();
        }
        catch {
            /* Ignore errors */
        }
        return undefined;
    }
    static ɵfac = function GlobalsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GlobalsService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: GlobalsService, factory: GlobalsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GlobalsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();

/** Subject used to flush caches */
const buster$ = new Subject();
/** Basic cache config */
const CACHE_CONFIG_NO_PARAMS = {
    cacheBusterObserver: buster$,
};
/** Cache config */
const CACHE_CONFIG_PARAMS = {
    cacheBusterObserver: buster$,
    maxCacheCount: 4,
};
/**
 * Helper to cast values to a specific type
 *
 * @returns The identity function
 */
function cast() {
    return (data) => data;
}
/**
 * Converts a two element tuple into a MinMax object. Also clamps the range to [`low`, `high`]
 *
 * @param range Range to convert into a MinMax object
 * @param low Minimum value
 * @param high Maximum value
 * @returns A MinMax object
 */
function rangeToMinMax(range, low, high) {
    if (range) {
        const min = range[0] > low ? range[0] : undefined;
        const max = range[1] < high ? range[0] : undefined;
        if (min !== undefined || max !== undefined) {
            return { min, max };
        }
    }
    return undefined;
}
/**
 * Reviver for spatial scene nodes
 *
 * @param nodes Raw nodes
 * @returns Revived nodes
 */
function spatialSceneNodeReviver(nodes) {
    return nodes.map((node) => ({
        ...node,
        transformMatrix: new Matrix4(node.transformMatrix ?? []),
    }));
}
/**
 * Converts a filter into request parameters
 *
 * @param filter Filter object
 * @returns Filter parameters
 */
function filterToParams(filter = {}) {
    const { ageRange, bmiRange, sex, ontologyTerms, cellTypeTerms, biomarkerTerms, consortiums, tmc: providers, technologies, spatialSearches: spatial, } = filter;
    return {
        age: JSON.stringify(rangeToMinMax(ageRange, 1, 110)),
        bmi: JSON.stringify(rangeToMinMax(bmiRange, 13, 83)),
        sex: sex?.toLowerCase(),
        ontologyTerms,
        cellTypeTerms,
        biomarkerTerms,
        consortiums,
        providers,
        technologies,
        spatial: spatial?.length ? JSON.stringify(spatial) : undefined,
    };
}
/**
 * Compare endpoint configurations
 *
 * @param x First set of options
 * @param y Second set of options
 * @returns true if the configurations are considered equal
 */
function compareConfig(x, y) {
    if (x.remoteApiEndpoint !== y.remoteApiEndpoint || x.token !== y.token) {
        return false;
    }
    else if (x.token !== undefined) {
        return true;
    }
    // Deep compare?
    return x.filter === y.filter && x.dataSources === y.dataSources;
}
/** Api endpoint data source */
class ApiEndpointDataSourceService {
    /** Api service */
    api = inject(V1Service);
    /** Global configuration state */
    globalConfig = inject(GlobalConfigState);
    /** Api configuration */
    config$ = this.globalConfig.config$.pipe(map(cast()), distinctUntilChanged(compareConfig), debounceTime(10), switchMap((config) => this.getSessionToken(config)), tap(() => buster$.next(null)), shareReplay(1));
    /** Initializes the service */
    constructor() {
        this.config$.subscribe();
    }
    /**
     * Get the database status
     *
     * @returns An observable of the database status
     */
    getDatabaseStatus() {
        return this.doRequest((params) => this.api.dbStatus(params));
    }
    /**
     * Get the supported provider names
     *
     * @returns An observable of provider names
     */
    getProviderNames() {
        return this.doRequest((params) => this.api.providerNames(params));
    }
    /**
     * Get the supported technologies
     *
     * @returns An observable of technologies
     */
    getDatasetTechnologyNames() {
        return this.doRequest((params) => this.api.technologyNames(params));
    }
    /**
     * Get the supported consortium names
     *
     * @returns An observable of consortium names
     */
    getConsortiumNames() {
        return this.doRequest((params) => this.api.consortiumNames(params));
    }
    /**
     * Get the ontology tree
     *
     * @returns An observable of the ontology tree
     */
    getOntologyTreeModel() {
        return this.doRequest((params) => this.api.ontologyTreeModel(params), undefined, {}, cast());
    }
    /**
     * Get the cell types tree
     *
     * @returns An observable of the cell types tree
     */
    getCellTypeTreeModel() {
        return this.doRequest((params) => this.api.cellTypeTreeModel(params), undefined, {}, cast());
    }
    /**
     * Get the biomarker type tree model.
     *
     * @returns An observable emitting the results.
     */
    getBiomarkerTreeModel() {
        return this.doRequest((params) => this.api.biomarkerTreeModel(params), undefined, {}, cast());
    }
    /**
     * Get the supported reference organs
     *
     * @returns An observable of reference organs
     */
    getReferenceOrgans() {
        return this.doRequest((params) => this.api.referenceOrgans(params), undefined, {}, cast());
    }
    /**
     * Get tissue blocks
     *
     * @param filter Data filter
     * @returns An observable of tissue blocks
     */
    getTissueBlockResults(filter) {
        return this.doRequest((params) => this.api.tissueBlocks(params), filter, {}, cast());
    }
    /**
     * Get aggregate counts
     *
     * @param filter Data filter
     * @returns An observable of counts
     */
    getAggregateResults(filter) {
        return this.doRequest((params) => this.api.aggregateResults(params), filter);
    }
    /**
     * Get ontology term occurences
     *
     * @param filter Data filter
     * @returns An observable of ontology term occurences
     */
    getOntologyTermOccurences(filter) {
        return this.doRequest((params) => this.api.ontologyTermOccurences(params), filter);
    }
    /**
     * Get cell type occurences
     *
     * @param filter Data filter
     * @returns An observable of cell type occurences
     */
    getCellTypeTermOccurences(filter) {
        return this.doRequest((params) => this.api.cellTypeTermOccurences(params), filter);
    }
    /**
     * Get biomarker occurences
     *
     * @param filter Data filter
     * @returns An observable of biomarker occurences
     */
    getBiomarkerTermOccurences(filter) {
        return this.doRequest((params) => this.api.biomarkerTermOccurences(params), filter);
    }
    /**
     * Get scene nodes
     *
     * @param filter Data filter
     * @returns An observable of scene nodes
     */
    getScene(filter) {
        return this.doRequest((params) => this.api.scene(params), filter, {}, spatialSceneNodeReviver);
    }
    /**
     * Get reference organ scene nodes
     *
     * @param organIri Organ iri
     * @param filter Data filter
     * @returns An observable of reference organ scene nodes
     */
    getReferenceOrganScene(organIri, filter) {
        return this.doRequest((params) => this.api.referenceOrganScene(params), filter, { organIri });
    }
    /**
     * Perform a api request
     *
     * @param method Request method
     * @param filter Data filter
     * @param params Request parameters
     * @param reviver Data reviver
     * @returns An observable of the request result
     */
    doRequest(method, filter, params, reviver) {
        const { api, config$ } = this;
        const requestParams = { ...filterToParams(filter), ...params };
        return config$.pipe(debounceTime(50), take(1), tap(({ remoteApiEndpoint, token }) => {
            api.configuration.basePath = remoteApiEndpoint;
            if (token) {
                requestParams['token'] = token;
            }
        }), switchMap(() => method(requestParams)), map((data) => (reviver ? reviver(data) : data)));
    }
    /**
     * Creates a session token and adds it to the config when applicable
     *
     * @param config Api config
     * @returns An observable of config
     */
    getSessionToken(config) {
        if (config.token) {
            return of(config);
        }
        const { remoteApiEndpoint, dataSources = [], filter } = config;
        if (dataSources.length === 0 && filter === undefined) {
            return of(config);
        }
        const { api } = this;
        const sessionTokenRequest = { dataSources, filter };
        api.configuration.basePath = remoteApiEndpoint;
        return api.sessionToken({ sessionTokenRequest }).pipe(switchMap(({ token }) => this.ensureDatabaseReady(token)), map((token) => ({ ...config, token })));
    }
    /**
     * Ensures the database is ready for requests
     *
     * @param token Api token
     * @returns An observable that emits once the database is ready
     */
    ensureDatabaseReady(token) {
        const check = () => this.api.dbStatus({ token }).pipe(filter((resp) => resp.status !== 'Ready'), switchMap((resp) => of(undefined).pipe(delay(resp.checkback ?? 0))));
        return of(undefined).pipe(repeat({ delay: check }), ignoreElements(), endWith(token));
    }
    static ɵfac = function ApiEndpointDataSourceService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiEndpointDataSourceService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiEndpointDataSourceService, factory: ApiEndpointDataSourceService.ɵfac, providedIn: 'root' });
}
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getProviderNames", null);
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getDatasetTechnologyNames", null);
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getConsortiumNames", null);
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getOntologyTreeModel", null);
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getCellTypeTreeModel", null);
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getBiomarkerTreeModel", null);
__decorate([
    Cacheable(CACHE_CONFIG_NO_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getReferenceOrgans", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getTissueBlockResults", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getAggregateResults", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getOntologyTermOccurences", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getCellTypeTermOccurences", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getBiomarkerTermOccurences", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getScene", null);
__decorate([
    Cacheable(CACHE_CONFIG_PARAMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Observable)
], ApiEndpointDataSourceService.prototype, "getReferenceOrganScene", null);
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiEndpointDataSourceService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [], { getProviderNames: [], getDatasetTechnologyNames: [], getConsortiumNames: [], getOntologyTreeModel: [], getCellTypeTreeModel: [], getBiomarkerTreeModel: [], getReferenceOrgans: [], getTissueBlockResults: [], getAggregateResults: [], getOntologyTermOccurences: [], getCellTypeTermOccurences: [], getBiomarkerTermOccurences: [], getScene: [], getReferenceOrganScene: [] }); })();

/** Data source service */
class DataSourceService {
    static ɵfac = function DataSourceService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataSourceService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DataSourceService, factory: DataSourceService.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceService, [{
        type: Injectable
    }], null, null); })();

/** Learn more action */
class LearnMore {
    /** Type */
    static type = '[CallToAction] Learn More';
}
/** Open dialog action */
class OpenDialog {
    /** Type */
    static type = '[CallToAction] Open Dialog';
}
/** Close dialog action */
class CloseDialog {
    /** Type */
    static type = '[CallToAction] Close Dialog';
}

var callToAction_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CloseDialog: CloseDialog,
    LearnMore: LearnMore,
    OpenDialog: OpenDialog
});

/**
 * Service to handle local storage
 */
class LocalStorageService {
    /** Local storage reference */
    static storage = (() => {
        // Slightly modified from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        let storage;
        try {
            storage = window.localStorage;
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return storage;
        }
        catch (error) {
            const full = error instanceof DOMException &&
                // everything except Firefox
                (error.code === 22 ||
                    // Firefox
                    error.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    error.name === 'QuotaExceededError' ||
                    // Firefox
                    error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                storage &&
                storage.length !== 0;
            return full ? storage : undefined;
        }
    })();
    /**
     * gets length of storage list
     */
    get length() {
        return LocalStorageService.storage?.length ?? 0;
    }
    /**
     * Gets value based on key index
     * @param index
     * @returns
     */
    key(index) {
        return LocalStorageService.storage?.key(index) ?? null;
    }
    /**
     * Gets value based on key, also returns default if it fails
     * @param key
     * @param defaultValue
     * @returns the value
     */
    getItem(key, defaultValue) {
        return LocalStorageService.storage?.getItem(key) ?? defaultValue ?? null;
    }
    /**
     * sets a key-value pairin local storage
     * @param key
     * @param value
     * @returns true or false based on success/failure
     */
    setItem(key, value) {
        try {
            LocalStorageService.storage?.setItem(key, value);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * removes value based on key
     * @param key
     */
    removeItem(key) {
        LocalStorageService.storage?.removeItem(key);
    }
    /**
     * Clears all storage
     */
    clear() {
        LocalStorageService.storage?.clear();
    }
    static ɵfac = function LocalStorageService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LocalStorageService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LocalStorageService, factory: LocalStorageService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LocalStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();

var CallToActionState_1;
/**
 * Key for boolean determining if poup has been shown
 */
const POPUP_SHOWN_STORAGE_KEY = 'callToActionPopupShown';
/**
 * Path to readme markup doc
 */
const SPATIAL_SEARCH_README = 'assets/docs/SPATIAL_SEARCH_README.md';
/**
 * State that controls the data and behavior for the CallToAction Component
 */
let CallToActionState = class CallToActionState {
    static { CallToActionState_1 = this; }
    /** Dialog service */
    dialog = inject(MatDialog);
    /** Local storage service */
    storage = inject(LocalStorageService);
    /** Info button service */
    infoService = inject(InfoButtonService);
    /** Http client */
    http = inject(HttpClient);
    /** Used to break cyclical import */
    static callToActionComponent;
    /**
     * Function that determines if expiration date has passed
     * @param expirationDate
     * @param now
     * @returns boolean defining whether or not info popup has expiered
     */
    static ctaDatePassed(expirationDate, now = Date.now) {
        const today = now();
        const expire = new Date(expirationDate);
        return +today > +expire;
    }
    /** Initialize the state */
    ngxsOnInit(ctx) {
        const { expirationDate, popupShown } = ctx.getState();
        const popupShownStr = this.storage.getItem(POPUP_SHOWN_STORAGE_KEY, `${popupShown}`);
        const pastExpiration = CallToActionState_1.ctaDatePassed(expirationDate);
        const showPopup = popupShownStr !== 'true' && !pastExpiration;
        if (showPopup) {
            ctx.dispatch(new OpenDialog());
        }
    }
    /**
     * Returns observable containting info from the markup
     */
    getDialogData() {
        return this.http
            .get(SPATIAL_SEARCH_README, { responseType: 'text' })
            .pipe(map((data) => this.infoService.parseMarkdown(data)));
    }
    /**
     * Opens Learn more dialog
     */
    launchLearnMore(content) {
        this.dialog.open(InfoDialogComponent, {
            autoFocus: false,
            panelClass: 'modal-animated',
            width: '72rem',
            data: {
                title: 'Spatial Search',
                content: content,
                videoID: 'UfxMpzatowE',
            },
        });
    }
    /**
     * Handles click event box
     * @param _ctx
     */
    learnMore() {
        this.dialog.closeAll();
        return this.getDialogData().pipe(tap((data) => this.launchLearnMore(data)));
    }
    /**
     * Opens dialog box
     * @param ctx
     */
    open(ctx) {
        this.dialog.open(CallToActionState_1.callToActionComponent, {
            autoFocus: false,
            panelClass: 'modal-animated',
            width: '30.75rem',
            height: '36.688rem',
        });
        this.storage.setItem(POPUP_SHOWN_STORAGE_KEY, 'true');
        ctx.patchState({ popupShown: true });
    }
    /**
     * closes all dialog boxes
     * @param _ctxs;
     */
    close() {
        this.dialog.closeAll();
    }
    static ɵfac = function CallToActionState_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallToActionState)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CallToActionState, factory: CallToActionState.ɵfac });
};
__decorate([
    Action(LearnMore),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable)
], CallToActionState.prototype, "learnMore", null);
__decorate([
    Action(OpenDialog),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CallToActionState.prototype, "open", null);
__decorate([
    Action(CloseDialog),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CallToActionState.prototype, "close", null);
CallToActionState = CallToActionState_1 = __decorate([
    State({
        name: 'callToAction',
        defaults: {
            title: 'New to the Exploration User Interface',
            message: 'Spatial Search has arrived!',
            callToAction: 'Learn More',
            imageUrl: 'assets/images/spatial_search.gif',
            expirationDate: 'Dec 1, 2022',
            popupShown: false,
        },
    })
], CallToActionState);
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallToActionState, [{
        type: Injectable
    }], null, { learnMore: [], open: [], close: [] }); })();

/** Call to action selectors */
class CallToActionSelectors {
    /** Get the title */
    static title(state) {
        return state.title;
    }
    /** Get the message */
    static message(state) {
        return state.message;
    }
    /** Get the call to action text */
    static callToAction(state) {
        return state.callToAction;
    }
    /** Get the image url */
    static imageUrl(state) {
        return state.imageUrl;
    }
    /** Get the expiration date */
    static expirationDate(state) {
        return state.expirationDate;
    }
    /** Get whether popup is shown */
    static popupShown(state) {
        return state.popupShown;
    }
}
__decorate([
    Selector([CallToActionState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CallToActionSelectors, "title", null);
__decorate([
    Selector([CallToActionState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CallToActionSelectors, "message", null);
__decorate([
    Selector([CallToActionState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CallToActionSelectors, "callToAction", null);
__decorate([
    Selector([CallToActionState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CallToActionSelectors, "imageUrl", null);
__decorate([
    Selector([CallToActionState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CallToActionSelectors, "expirationDate", null);
__decorate([
    Selector([CallToActionState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], CallToActionSelectors, "popupShown", null);

/**
 * Info button component: Information icon displays project details when clicked.
 */
class CallToActionBehaviorComponent {
    /** Title */
    title$;
    /** Message */
    message$;
    /** Call to action text */
    callToAction$;
    /** Image url */
    imageUrl$;
    /**
     * Closes dialog
     */
    close = () => new CloseDialog();
    /**
     * Sends learn more open action
     * @returns LearnMore action
     */
    learnMore = () => new LearnMore();
    static ɵfac = function CallToActionBehaviorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallToActionBehaviorComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CallToActionBehaviorComponent, selectors: [["ccf-call-to-action-behavior"]], standalone: false, decls: 5, vars: 12, consts: [[3, "callToActionClicked", "closeClicked", "infoTitle", "message", "callToAction", "imageUrl"]], template: function CallToActionBehaviorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ccf-call-to-action", 0);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵpipe(2, "async");
            i0.ɵɵpipe(3, "async");
            i0.ɵɵpipe(4, "async");
            i0.ɵɵlistener("callToActionClicked", function CallToActionBehaviorComponent_Template_ccf_call_to_action_callToActionClicked_0_listener() { return ctx.learnMore(); })("closeClicked", function CallToActionBehaviorComponent_Template_ccf_call_to_action_closeClicked_0_listener() { return ctx.close(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("infoTitle", i0.ɵɵpipeBind1(1, 4, ctx.title$) ?? "")("message", i0.ɵɵpipeBind1(2, 6, ctx.message$) ?? "")("callToAction", i0.ɵɵpipeBind1(3, 8, ctx.callToAction$) ?? "")("imageUrl", i0.ɵɵpipeBind1(4, 10, ctx.imageUrl$) ?? "");
        } }, dependencies: [CallToActionComponent, i1.AsyncPipe], encapsulation: 2, changeDetection: 0 });
}
__decorate([
    Select(CallToActionSelectors.title),
    __metadata("design:type", Observable$1)
], CallToActionBehaviorComponent.prototype, "title$", void 0);
__decorate([
    Select(CallToActionSelectors.message),
    __metadata("design:type", Observable$1)
], CallToActionBehaviorComponent.prototype, "message$", void 0);
__decorate([
    Select(CallToActionSelectors.callToAction),
    __metadata("design:type", Observable$1)
], CallToActionBehaviorComponent.prototype, "callToAction$", void 0);
__decorate([
    Select(CallToActionSelectors.imageUrl),
    __metadata("design:type", Observable$1)
], CallToActionBehaviorComponent.prototype, "imageUrl$", void 0);
__decorate([
    Dispatch(),
    __metadata("design:type", Object)
], CallToActionBehaviorComponent.prototype, "close", void 0);
__decorate([
    Dispatch(),
    __metadata("design:type", Object)
], CallToActionBehaviorComponent.prototype, "learnMore", void 0);
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallToActionBehaviorComponent, [{
        type: Component,
        args: [{ selector: 'ccf-call-to-action-behavior', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<ccf-call-to-action\n  [infoTitle]=\"(title$ | async) ?? ''\"\n  [message]=\"(message$ | async) ?? ''\"\n  [callToAction]=\"(callToAction$ | async) ?? ''\"\n  [imageUrl]=\"(imageUrl$ | async) ?? ''\"\n  (callToActionClicked)=\"learnMore()\"\n  (closeClicked)=\"close()\"\n>\n</ccf-call-to-action>\n" }]
    }], null, { title$: [], message$: [], callToAction$: [], imageUrl$: [], close: [], learnMore: [] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CallToActionBehaviorComponent, { className: "CallToActionBehaviorComponent", filePath: "lib/components/call-to-action-behavior/call-to-action-behavior.component.ts", lineNumber: 19 }); })();
// Break cyclical import...
CallToActionState.callToActionComponent = CallToActionBehaviorComponent;

class CallToActionBehaviorModule {
    static ɵfac = function CallToActionBehaviorModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallToActionBehaviorModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CallToActionBehaviorModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, NgxsModule, MatIconModule, MatDialogModule, MatCardModule, CallToActionModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallToActionBehaviorModule, [{
        type: NgModule,
        args: [{
                declarations: [CallToActionBehaviorComponent],
                imports: [CommonModule, NgxsModule, MatIconModule, MatDialogModule, MatCardModule, CallToActionModule],
                exports: [CallToActionBehaviorComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CallToActionBehaviorModule, { declarations: [CallToActionBehaviorComponent], imports: [CommonModule, NgxsModule, MatIconModule, MatDialogModule, MatCardModule, CallToActionModule], exports: [CallToActionBehaviorComponent] }); })();

/**
 * All organs that will eventually be displayed in the app
 */
const ALL_POSSIBLE_ORGANS = [
    {
        src: 'app:skin',
        organ: 'Skin',
        name: 'Skin',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002097',
    },
    {
        src: 'app:brain',
        organ: 'Brain',
        name: 'Brain',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000955',
    },
    {
        disabled: true,
        src: 'app:lymph-nodes',
        organ: 'Lymph Node',
        name: 'Lymph Node',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000029',
    },
    {
        src: 'app:lymph-nodes',
        organ: 'Lymph Node',
        name: 'Lymph Node',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002509',
    },
    {
        disabled: true,
        src: 'app:eye',
        organ: 'Eye',
        name: 'Eye, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000970',
    },
    {
        src: 'app:eye',
        organ: 'Eye',
        name: 'Eye, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0004548',
    },
    {
        src: 'app:eye',
        organ: 'Eye',
        name: 'Eye, R',
        side: 'right',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0004549',
    },
    {
        disabled: true,
        src: 'app:fallopian-tube-left',
        organ: 'Fallopian Tube',
        name: 'Fallopian Tube, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0003889',
    },
    {
        src: 'app:fallopian-tube-left',
        organ: 'Fallopian Tube',
        name: 'Fallopian Tube, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001303',
    },
    {
        src: 'app:fallopian-tube-right',
        organ: 'Fallopian Tube',
        name: 'Fallopian Tube, R',
        side: 'right',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001302',
    },
    {
        src: 'app:heart',
        organ: 'Heart',
        name: 'Heart',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000948',
    },
    {
        disabled: true,
        src: 'app:kidney-left',
        organ: 'Kidney',
        name: 'Kidney, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002113',
    },
    {
        src: 'app:kidney-left',
        organ: 'Kidney',
        name: 'Kidney, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0004538',
    },
    {
        src: 'app:kidney-right',
        organ: 'Kidney',
        name: 'Kidney, R',
        side: 'right',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0004539',
    },
    {
        disabled: true,
        src: 'app:knee',
        organ: 'Knee',
        name: 'Knee, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001465',
    },
    {
        src: 'app:knee',
        organ: 'Knee',
        name: 'Knee, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.org/sig/ont/fma/fma24978',
    },
    {
        src: 'app:knee',
        organ: 'Knee',
        name: 'Knee, R',
        side: 'right',
        hasSex: true,
        id: 'http://purl.org/sig/ont/fma/fma24977',
    },
    {
        src: 'app:liver',
        organ: 'Liver',
        name: 'Liver',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002107',
    },
    {
        disabled: true,
        src: 'app:lung',
        organ: 'Lung',
        name: 'Lungs',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002048',
    },
    {
        src: 'app:lung',
        organ: 'Lung',
        name: 'Lungs',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001004',
    },
    {
        disabled: true,
        src: 'app:mammary-gland',
        organ: 'Mammary Gland',
        name: 'Mammary Gland, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001911',
    },
    {
        src: 'app:mammary-gland',
        organ: 'Mammary Gland',
        name: 'Mammary Gland, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.org/sig/ont/fma/fma57991',
    },
    {
        src: 'app:mammary-gland',
        organ: 'Mammary Gland',
        name: 'Mammary Gland, R',
        side: 'right',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.org/sig/ont/fma/fma57987',
    },
    {
        src: 'app:manubrium',
        organ: 'Manubrium',
        name: 'Manubrium',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_2001553',
    },
    {
        src: 'app:mouth',
        organ: 'Mouth',
        name: 'Mouth',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000165',
    },
    {
        disabled: true,
        src: 'app:ovary-left',
        organ: 'Ovary',
        name: 'Ovary, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000992',
    },
    {
        disabled: true,
        src: 'app:ovary-left',
        organ: 'Ovary',
        name: 'Ovary, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.org/sig/ont/fma/fma7214',
    },
    {
        src: 'app:ovary-left',
        organ: 'Ovary',
        name: 'Ovary, L',
        side: 'left',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002119',
    },
    {
        disabled: true,
        src: 'app:ovary-right',
        organ: 'Ovary',
        name: 'Ovary, R',
        side: 'right',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.org/sig/ont/fma/fma7213',
    },
    {
        src: 'app:ovary-right',
        organ: 'Ovary',
        name: 'Ovary, R',
        side: 'right',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002118',
    },
    {
        src: 'app:larynx',
        organ: 'Larynx',
        name: 'Larynx',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001737',
    },
    {
        src: 'app:main-bronchus',
        organ: 'Main Bronchus',
        name: 'Main Bronchus',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002182',
    },
    {
        disabled: true,
        src: 'app:palatine-tonsil',
        organ: 'Palatine Tonsil',
        name: 'Palatine Tonsil, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002373',
    },
    {
        src: 'app:palatine-tonsil',
        organ: 'Palatine Tonsil',
        name: 'Palatine Tonsil, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.org/sig/ont/fma/fma54974',
    },
    {
        src: 'app:palatine-tonsil',
        organ: 'Palatine Tonsil',
        name: 'Palatine Tonsil, R',
        side: 'right',
        hasSex: true,
        id: 'http://purl.org/sig/ont/fma/fma54973',
    },
    {
        src: 'app:pancreas',
        organ: 'Pancreas',
        name: 'Pancreas',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001264',
    },
    {
        src: 'app:pelvis-f',
        organ: 'Pelvis',
        name: 'Pelvis',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001270',
    },
    {
        src: 'app:placenta',
        organ: 'Placenta',
        name: 'Placenta',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001987',
    },
    {
        src: 'app:prostate',
        organ: 'Prostate',
        name: 'Prostate',
        hasSex: false,
        sex: FilterSexEnum.Male,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002367',
        disabled: true,
    },
    {
        src: 'app:prostate',
        organ: 'Prostate',
        name: 'Prostate',
        hasSex: false,
        sex: FilterSexEnum.Male,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000079',
    },
    {
        src: 'app:renal-pelvis-left',
        organ: 'Renal Pelvis',
        name: 'Renal Pelvis, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0018115',
    },
    {
        src: 'app:renal-pelvis-right',
        organ: 'Renal Pelvis',
        name: 'Renal Pelvis, R',
        side: 'right',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0018116',
    },
    {
        src: 'app:small-intestine',
        organ: 'Small Intestine',
        name: 'Small Intestine',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002108',
    },
    {
        src: 'app:sternum',
        organ: 'Sternum',
        name: 'Sternum',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000975',
    },
    {
        src: 'app:large-intestine',
        organ: 'Large Intestine',
        name: 'Large Intestine',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000059',
    },
    {
        src: 'app:spinal-cord',
        organ: 'Spinal Cord',
        name: 'Spinal Cord',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002240',
    },
    {
        src: 'app:spleen',
        organ: 'Spleen',
        name: 'Spleen',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002106',
    },
    {
        src: 'app:thymus',
        organ: 'Thymus',
        name: 'Thymus',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002370',
    },
    {
        src: 'app:trachea',
        organ: 'Trachea',
        name: 'Trachea',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0003126',
    },
    {
        disabled: true,
        src: 'app:ureter-left',
        organ: 'Ureter',
        name: 'Ureter, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000056',
    },
    {
        src: 'app:ureter-left',
        organ: 'Ureter',
        name: 'Ureter, L',
        side: 'left',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001223',
    },
    {
        src: 'app:ureter-right',
        organ: 'Ureter',
        name: 'Ureter, R',
        side: 'right',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001222',
    },
    {
        src: 'app:bladder',
        organ: 'Urinary Bladder',
        name: 'Urinary Bladder',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001255',
    },
    {
        src: 'app:uterus',
        organ: 'Uterus',
        name: 'Uterus',
        hasSex: false,
        sex: FilterSexEnum.Female,
        id: 'http://purl.obolibrary.org/obo/UBERON_0000995',
    },
    {
        src: 'app:vasculature-thick',
        organ: 'Blood Vasculature',
        name: 'Blood Vasculature',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0004537',
    },
    {
        disabled: true,
        src: 'app:vasculature-thick',
        organ: 'Blood Vasculature',
        name: 'Blood Vasculature',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0002049',
    },
].sort((a, b) => a.name.localeCompare(b.name));
/**
 * All organs which have not been disabled
 */
const ALL_ORGANS = ALL_POSSIBLE_ORGANS.filter((organ) => organ.disabled !== true);
/**
 * Helper for comparing differently typed sex values
 *
 * @param val1 First value
 * @param val2 Second value
 * @returns true if they are considered equal
 */
function sexEquals(val1, val2) {
    return val1?.toLowerCase() === val2?.toLowerCase();
}
/**
 * Converts a string typed sex value into a `FilterSexEnum`
 *
 * @param value Value to convert
 * @returns A `FilterSexEnum` value if a match is found
 */
function sexFromString(value) {
    return [FilterSexEnum.Both, FilterSexEnum.Female, FilterSexEnum.Male].find((sex) => sexEquals(sex, value));
}

function SpatialSearchListComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-list-item", 1)(1, "div", 2)(2, "mat-checkbox", 3);
    i0.ɵɵlistener("change", function SpatialSearchListComponent_Conditional_1_Template_mat_checkbox_change_2_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateAllItemsSelection($event.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 4);
    i0.ɵɵtext(4, "All Spatial Locations");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r1.allSelected);
} }
function SpatialSearchListComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-list-item", 1)(1, "div", 2)(2, "mat-checkbox", 5);
    i0.ɵɵlistener("change", function SpatialSearchListComponent_For_3_Template_mat_checkbox_change_2_listener($event) { const $index_r4 = i0.ɵɵrestoreView(_r3).$index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateItemSelection($index_r4, $event.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 6);
    i0.ɵɵlistener("click", function SpatialSearchListComponent_For_3_Template_button_click_3_listener() { const $index_r4 = i0.ɵɵrestoreView(_r3).$index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removeItem($index_r4)); });
    i0.ɵɵelementStart(4, "mat-icon");
    i0.ɵɵtext(5, "delete_outlined");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 4);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", item_r5.selected);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r5.description);
} }
/**
 * Displays a list of spatial searches
 */
class SpatialSearchListComponent {
    /** HTML class */
    clsName = 'ccf-spatial-search-list';
    /** Label for the list */
    label = input('', ...(ngDevMode ? [{ debugName: "label" }] : []));
    /** Items to display */
    items = input([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    /** Emits the new items when a selection changes */
    selectionChanged = output();
    /** Emits the item that has been removed from the list */
    itemRemoved = output();
    /** If all items are selected */
    allSelected = true;
    /**
     * Computes a unique id for an item
     *
     * @param _index Unused
     * @param item An item
     * @returns A unique id
     */
    itemId(_index, item) {
        return item.description;
    }
    /**
     * Updates the selected state for an item
     *
     * @param index Index of item to update
     * @param selected What to set the selected state to
     */
    updateItemSelection(index, selected) {
        const newItems = [...this.items()];
        newItems[index] = { ...newItems[index], selected };
        const selectedItems = newItems.filter((item) => item.selected);
        this.allSelected = selectedItems.length === newItems.length;
        this.selectionChanged.emit(selectedItems);
    }
    /**
     * Removes an item from the list
     *
     * @param index Index of the item to remove
     */
    removeItem(index) {
        const newItems = [...this.items()];
        const [item] = newItems.splice(index, 1);
        this.itemRemoved.emit(item);
    }
    /**
     * Updates all items to checked or unchecked
     *
     * @param checked Checked status
     */
    updateAllItemsSelection(checked) {
        this.allSelected = checked;
        const newItems = this.items().map((item) => ({ ...item, selected: checked }));
        this.selectionChanged.emit(newItems);
    }
    static ɵfac = function SpatialSearchListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpatialSearchListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpatialSearchListComponent, selectors: [["ccf-spatial-search-list"]], hostVars: 2, hostBindings: function SpatialSearchListComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { label: [1, "label"], items: [1, "items"] }, outputs: { selectionChanged: "selectionChanged", itemRemoved: "itemRemoved" }, decls: 4, vars: 1, consts: [["hraFeature", "list", 1, "list"], [1, "item"], [1, "item-content"], ["hraFeature", "select-all-toggle", "hraClickEvent", "", "labelPosition", "after", 1, "description", 3, "change", "checked"], [1, "checkbox-label"], ["hraFeature", "select", "hraClickEvent", "", "labelPosition", "after", 1, "description", 3, "change", "checked"], ["hraFeature", "remove", "hraClickEvent", "", "mat-icon-button", "", 1, "delete", 3, "click"]], template: function SpatialSearchListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-list", 0);
            i0.ɵɵconditionalCreate(1, SpatialSearchListComponent_Conditional_1_Template, 5, 1, "mat-list-item", 1);
            i0.ɵɵrepeaterCreate(2, SpatialSearchListComponent_For_3_Template, 8, 2, "mat-list-item", 1, ctx.itemId, true);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.items().length > 1 ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.items());
        } }, dependencies: [HraCommonModule, i1$2.ClickEventDirective, i1$2.FeatureDirective, MatButtonModule, i5$1.MatIconButton, MatIconModule, i1$1.MatIcon, MatCheckboxModule, i4$2.MatCheckbox, MatListModule, i5$3.MatList, i5$3.MatListItem], styles: ["[_nghost-%COMP%]   .list[_ngcontent-%COMP%]{--mat-list-list-item-one-line-container-height: 2.5rem;--mat-list-list-item-label-text-color: var(--mat-sys-primary);padding:.25rem 0}[_nghost-%COMP%]   .item-content[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .checkbox-label[_ngcontent-%COMP%]{font:var(--mat-sys-label-large);padding:0 .5rem}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpatialSearchListComponent, [{
        type: Component,
        args: [{ selector: 'ccf-spatial-search-list', imports: [HraCommonModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatListModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-list hraFeature=\"list\" class=\"list\">\n  @if (items().length > 1) {\n    <mat-list-item class=\"item\">\n      <div class=\"item-content\">\n        <mat-checkbox\n          hraFeature=\"select-all-toggle\"\n          hraClickEvent\n          class=\"description\"\n          labelPosition=\"after\"\n          [checked]=\"allSelected\"\n          (change)=\"updateAllItemsSelection($event.checked)\"\n        >\n        </mat-checkbox>\n        <div class=\"checkbox-label\">All Spatial Locations</div>\n      </div>\n    </mat-list-item>\n  }\n  @for (item of items(); track itemId($index, item)) {\n    <mat-list-item class=\"item\">\n      <div class=\"item-content\">\n        <mat-checkbox\n          hraFeature=\"select\"\n          hraClickEvent\n          class=\"description\"\n          labelPosition=\"after\"\n          [checked]=\"item.selected\"\n          (change)=\"updateItemSelection($index, $event.checked)\"\n        >\n        </mat-checkbox>\n        <button hraFeature=\"remove\" hraClickEvent mat-icon-button class=\"delete\" (click)=\"removeItem($index)\">\n          <mat-icon>delete_outlined</mat-icon>\n        </button>\n        <div class=\"checkbox-label\">{{ item.description }}</div>\n      </div>\n    </mat-list-item>\n  }\n</mat-list>\n", styles: [":host .list{--mat-list-list-item-one-line-container-height: 2.5rem;--mat-list-list-item-label-text-color: var(--mat-sys-primary);padding:.25rem 0}:host .item-content{display:flex;align-items:center}:host .checkbox-label{font:var(--mat-sys-label-large);padding:0 .5rem}\n"] }]
    }], null, { clsName: [{
            type: HostBinding,
            args: ['class']
        }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], selectionChanged: [{ type: i0.Output, args: ["selectionChanged"] }], itemRemoved: [{ type: i0.Output, args: ["itemRemoved"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SpatialSearchListComponent, { className: "SpatialSearchListComponent", filePath: "lib/components/spatial-search-list/spatial-search-list.component.ts", lineNumber: 29 }); })();

/**
 * Component displaying a x, y, and z position
 */
class XYZPositionComponent {
    /** Html class name */
    clsName = 'ccf-xyz-position';
    /** X position */
    x = 0;
    /** Y position */
    y = 0;
    /** Z position */
    z = 0;
    /** Number format for position values */
    format = '1.0-2';
    static ɵfac = function XYZPositionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || XYZPositionComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: XYZPositionComponent, selectors: [["ccf-xyz-position"]], hostVars: 2, hostBindings: function XYZPositionComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.clsName);
        } }, inputs: { x: "x", y: "y", z: "z" }, standalone: false, decls: 9, vars: 12, consts: [[1, "line"]], template: function XYZPositionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 0);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 0);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "number");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("X: ", i0.ɵɵpipeBind2(2, 3, ctx.x, ctx.format));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("Y: ", i0.ɵɵpipeBind2(5, 6, ctx.y, ctx.format));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("Z: ", i0.ɵɵpipeBind2(8, 9, ctx.z, ctx.format));
        } }, dependencies: [i1.DecimalPipe], styles: ["[_nghost-%COMP%]{display:flex;flex-direction:column}[_nghost-%COMP%]   .line[_ngcontent-%COMP%]{font-size:1rem;font-weight:400}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(XYZPositionComponent, [{
        type: Component,
        args: [{ selector: 'ccf-xyz-position', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<span class=\"line\">X: {{ x | number: format }}</span>\n<span class=\"line\">Y: {{ y | number: format }}</span>\n<span class=\"line\">Z: {{ z | number: format }}</span>\n", styles: [":host{display:flex;flex-direction:column}:host .line{font-size:1rem;font-weight:400}\n"] }]
    }], null, { clsName: [{
            type: HostBinding,
            args: ['class']
        }], x: [{
            type: Input
        }], y: [{
            type: Input
        }], z: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(XYZPositionComponent, { className: "XYZPositionComponent", filePath: "lib/components/xyz-position/xyz-position.component.ts", lineNumber: 13 }); })();

class XYZPositionModule {
    static ɵfac = function XYZPositionModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || XYZPositionModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: XYZPositionModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(XYZPositionModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [XYZPositionComponent],
                exports: [XYZPositionComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(XYZPositionModule, { declarations: [XYZPositionComponent], imports: [CommonModule], exports: [XYZPositionComponent] }); })();

function SpatialSearchKeyboardUIComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1, "SHIFT");
    i0.ɵɵelementEnd();
} }
/**
 * Keyboard control UI for spatial search
 */
class SpatialSearchKeyboardUIComponent {
    /** HTML class */
    className = 'ccf-spatial-search-keyboard-ui';
    /** Current key pressed */
    currentKey;
    /** True if shift key is pressed */
    shiftPressed;
    /** Emits when a key is clicked */
    keyClicked = new EventEmitter();
    /** Emits the key value when a key is hovered over */
    keyHovered = new EventEmitter();
    static ɵfac = function SpatialSearchKeyboardUIComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpatialSearchKeyboardUIComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpatialSearchKeyboardUIComponent, selectors: [["ccf-spatial-search-keyboard-ui"]], hostVars: 2, hostBindings: function SpatialSearchKeyboardUIComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassMap(ctx.className);
        } }, inputs: { currentKey: "currentKey", shiftPressed: "shiftPressed" }, outputs: { keyClicked: "keyClicked", keyHovered: "keyHovered" }, standalone: false, decls: 16, vars: 13, consts: [["hraFeature", "keyboard-ui", 1, "keys"], [1, "keyrow"], ["hraFeature", "q", "hraClickEvent", "", 1, "key", "blue", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "w", "hraClickEvent", "", 1, "key", "green", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "e", "hraClickEvent", "", 1, "key", "blue", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "a", "hraClickEvent", "", 1, "key", "red", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "s", "hraClickEvent", "", 1, "key", "green", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "d", "hraClickEvent", "", 1, "key", "red", 3, "mousedown", "mouseover", "mouseout"], ["class", "shift", 4, "ngIf"], [1, "shift"]], template: function SpatialSearchKeyboardUIComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵlistener("mousedown", function SpatialSearchKeyboardUIComponent_Template_div_mousedown_2_listener() { return ctx.keyClicked.emit("q"); })("mouseover", function SpatialSearchKeyboardUIComponent_Template_div_mouseover_2_listener() { return ctx.keyHovered.emit("q"); })("mouseout", function SpatialSearchKeyboardUIComponent_Template_div_mouseout_2_listener() { return ctx.keyHovered.emit(); });
            i0.ɵɵtext(3, " Q ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵlistener("mousedown", function SpatialSearchKeyboardUIComponent_Template_div_mousedown_4_listener() { return ctx.keyClicked.emit("w"); })("mouseover", function SpatialSearchKeyboardUIComponent_Template_div_mouseover_4_listener() { return ctx.keyHovered.emit("w"); })("mouseout", function SpatialSearchKeyboardUIComponent_Template_div_mouseout_4_listener() { return ctx.keyHovered.emit(); });
            i0.ɵɵtext(5, " W ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵlistener("mousedown", function SpatialSearchKeyboardUIComponent_Template_div_mousedown_6_listener() { return ctx.keyClicked.emit("e"); })("mouseover", function SpatialSearchKeyboardUIComponent_Template_div_mouseover_6_listener() { return ctx.keyHovered.emit("e"); })("mouseout", function SpatialSearchKeyboardUIComponent_Template_div_mouseout_6_listener() { return ctx.keyHovered.emit(); });
            i0.ɵɵtext(7, " E ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 1)(9, "div", 5);
            i0.ɵɵlistener("mousedown", function SpatialSearchKeyboardUIComponent_Template_div_mousedown_9_listener() { return ctx.keyClicked.emit("a"); })("mouseover", function SpatialSearchKeyboardUIComponent_Template_div_mouseover_9_listener() { return ctx.keyHovered.emit("a"); })("mouseout", function SpatialSearchKeyboardUIComponent_Template_div_mouseout_9_listener() { return ctx.keyHovered.emit(); });
            i0.ɵɵtext(10, " A ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 6);
            i0.ɵɵlistener("mousedown", function SpatialSearchKeyboardUIComponent_Template_div_mousedown_11_listener() { return ctx.keyClicked.emit("s"); })("mouseover", function SpatialSearchKeyboardUIComponent_Template_div_mouseover_11_listener() { return ctx.keyHovered.emit("s"); })("mouseout", function SpatialSearchKeyboardUIComponent_Template_div_mouseout_11_listener() { return ctx.keyHovered.emit(); });
            i0.ɵɵtext(12, " S ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 7);
            i0.ɵɵlistener("mousedown", function SpatialSearchKeyboardUIComponent_Template_div_mousedown_13_listener() { return ctx.keyClicked.emit("d"); })("mouseover", function SpatialSearchKeyboardUIComponent_Template_div_mouseover_13_listener() { return ctx.keyHovered.emit("d"); })("mouseout", function SpatialSearchKeyboardUIComponent_Template_div_mouseout_13_listener() { return ctx.keyHovered.emit(); });
            i0.ɵɵtext(14, " D ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(15, SpatialSearchKeyboardUIComponent_div_15_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("highlighted", ctx.currentKey === "q");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("highlighted", ctx.currentKey === "w");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("highlighted", ctx.currentKey === "e");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("highlighted", ctx.currentKey === "a");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("highlighted", ctx.currentKey === "s");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("highlighted", ctx.currentKey === "d");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.shiftPressed);
        } }, dependencies: [i1.NgIf, i1$2.ClickEventDirective, i1$2.FeatureDirective], styles: ["[_nghost-%COMP%]{font:var(--mat-sys-label-large)}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;padding:0;gap:.5rem;width:7rem;-webkit-user-select:none;user-select:none}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .keyrow[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0;gap:.5rem}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .keyrow[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.25rem;width:2rem;height:2rem;border:2px solid;border-radius:.5rem;cursor:pointer}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .keyrow[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]:hover, [_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .keyrow[_ngcontent-%COMP%]   .key.highlighted[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .green[_ngcontent-%COMP%]{color:#1dcc65}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .blue[_ngcontent-%COMP%]{color:#2979ff}[_nghost-%COMP%]   .keys[_ngcontent-%COMP%]   .red[_ngcontent-%COMP%]{color:#d50000}[_nghost-%COMP%]   .shift[_ngcontent-%COMP%]{color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.25rem;width:7rem;height:2rem;border:2px solid;border-radius:.5rem}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpatialSearchKeyboardUIComponent, [{
        type: Component,
        args: [{ selector: 'ccf-spatial-search-keyboard-ui', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div hraFeature=\"keyboard-ui\" class=\"keys\">\n  <div class=\"keyrow\">\n    <div\n      hraFeature=\"q\"\n      hraClickEvent\n      class=\"key blue\"\n      (mousedown)=\"keyClicked.emit('q')\"\n      (mouseover)=\"keyHovered.emit('q')\"\n      (mouseout)=\"keyHovered.emit()\"\n      [class.highlighted]=\"currentKey === 'q'\"\n    >\n      Q\n    </div>\n    <div\n      hraFeature=\"w\"\n      hraClickEvent\n      class=\"key green\"\n      (mousedown)=\"keyClicked.emit('w')\"\n      (mouseover)=\"keyHovered.emit('w')\"\n      (mouseout)=\"keyHovered.emit()\"\n      [class.highlighted]=\"currentKey === 'w'\"\n    >\n      W\n    </div>\n    <div\n      hraFeature=\"e\"\n      hraClickEvent\n      class=\"key blue\"\n      (mousedown)=\"keyClicked.emit('e')\"\n      (mouseover)=\"keyHovered.emit('e')\"\n      (mouseout)=\"keyHovered.emit()\"\n      [class.highlighted]=\"currentKey === 'e'\"\n    >\n      E\n    </div>\n  </div>\n  <div class=\"keyrow\">\n    <div\n      hraFeature=\"a\"\n      hraClickEvent\n      class=\"key red\"\n      (mousedown)=\"keyClicked.emit('a')\"\n      (mouseover)=\"keyHovered.emit('a')\"\n      (mouseout)=\"keyHovered.emit()\"\n      [class.highlighted]=\"currentKey === 'a'\"\n    >\n      A\n    </div>\n    <div\n      hraFeature=\"s\"\n      hraClickEvent\n      class=\"key green\"\n      (mousedown)=\"keyClicked.emit('s')\"\n      (mouseover)=\"keyHovered.emit('s')\"\n      (mouseout)=\"keyHovered.emit()\"\n      [class.highlighted]=\"currentKey === 's'\"\n    >\n      S\n    </div>\n    <div\n      hraFeature=\"d\"\n      hraClickEvent\n      class=\"key red\"\n      (mousedown)=\"keyClicked.emit('d')\"\n      (mouseover)=\"keyHovered.emit('d')\"\n      (mouseout)=\"keyHovered.emit()\"\n      [class.highlighted]=\"currentKey === 'd'\"\n    >\n      D\n    </div>\n  </div>\n  <div *ngIf=\"shiftPressed\" class=\"shift\">SHIFT</div>\n</div>\n", styles: [":host{font:var(--mat-sys-label-large)}:host .keys{display:flex;flex-direction:column;align-items:flex-start;padding:0;gap:.5rem;width:7rem;-webkit-user-select:none;user-select:none}:host .keys .keyrow{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0;gap:.5rem}:host .keys .keyrow .key{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.25rem;width:2rem;height:2rem;border:2px solid;border-radius:.5rem;cursor:pointer}:host .keys .keyrow .key:hover,:host .keys .keyrow .key.highlighted{color:#fff}:host .keys .green{color:#1dcc65}:host .keys .blue{color:#2979ff}:host .keys .red{color:#d50000}:host .shift{color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.25rem;width:7rem;height:2rem;border:2px solid;border-radius:.5rem}\n"] }]
    }], null, { className: [{
            type: HostBinding,
            args: ['class']
        }], currentKey: [{
            type: Input
        }], shiftPressed: [{
            type: Input
        }], keyClicked: [{
            type: Output
        }], keyHovered: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SpatialSearchKeyboardUIComponent, { className: "SpatialSearchKeyboardUIComponent", filePath: "lib/components/spatial-search-keyboard-ui/spatial-search-keyboard-ui.component.ts", lineNumber: 13 }); })();

/** Direction multipliers for each key */
const DIRECTION_FACTORS = {
    q: [0, 0, 1],
    e: [0, 0, -1],
    w: [0, 1, 0],
    s: [0, -1, 0],
    a: [-1, 0, 0],
    d: [1, 0, 0],
};
/** Set of direction keys */
const DIRECTION_KEYS = new Set(Object.keys(DIRECTION_FACTORS));
/**
 * Behavioral component for spatial search keyboard UI
 */
class SpatialSearchKeyboardUIBehaviorComponent {
    /** HTML class */
    className = 'ccf-spatial-search-keyboard-ui-behavior';
    /** Amount the position shifts for each key press */
    delta = 1;
    /** Input of spatial search keyboard uibehavior component */
    shiftDelta = 2;
    /** Current position of spatial search */
    position;
    /** Disable position changes */
    disablePositionChange = false;
    /** Emits when position changes */
    changePosition = new EventEmitter();
    /** Current key being pressed/clicked */
    currentKey;
    /** Current delta */
    currentDelta;
    /** True while shift key is pressed */
    shiftPressed = false;
    featurePath = injectFeaturePath();
    logEvent = injectLogEvent();
    /**
     * Shifts position based on key
     * @param key Key value
     */
    updatePosition(key) {
        this.currentDelta = this.shiftPressed ? this.shiftDelta : this.delta;
        this.currentKey = key.toLowerCase();
        const factors = DIRECTION_FACTORS[this.currentKey];
        if (factors !== undefined) {
            const { x, y, z } = this.position;
            const delta = this.currentDelta;
            this.position = {
                x: x + factors[0] * delta,
                y: y + factors[1] * delta,
                z: z + factors[2] * delta,
            };
            this.changePosition.emit(this.position);
        }
    }
    /**
     * Listens for keydown keyboard event and updates the position
     * @param target Keyboard event
     */
    handleKey(target) {
        if (this.disablePositionChange ||
            !DIRECTION_KEYS.has(target.key.toLowerCase()) ||
            target.target instanceof HTMLInputElement) {
            return;
        }
        if (target.shiftKey) {
            this.shiftPressed = true;
        }
        target.preventDefault();
        this.logEvent(CoreEvents.Keyboard, {
            path: `${this.featurePath()}.keyboard.${target.key}`,
            trigger: 'keydown',
            triggerData: target,
        });
        this.updatePosition(target.key);
    }
    /**
     * Listens for keyup keyboard event and updates currentKey / shiftPressed
     * @param target Keyboard event
     */
    keyUp(target) {
        if (target.key === 'Shift') {
            this.shiftPressed = false;
        }
        else {
            this.currentKey = undefined;
        }
    }
    /**
     * Updates the position when a key is clicked
     * @param key Key value
     */
    keyClick(key) {
        this.updatePosition(key);
    }
    /**
     * Updates current key when a key is hovered over
     * @param key Key value
     */
    keyHover(key) {
        this.currentKey = key;
    }
    static ɵfac = function SpatialSearchKeyboardUIBehaviorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpatialSearchKeyboardUIBehaviorComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpatialSearchKeyboardUIBehaviorComponent, selectors: [["ccf-spatial-search-keyboard-ui-behavior"]], hostVars: 2, hostBindings: function SpatialSearchKeyboardUIBehaviorComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function SpatialSearchKeyboardUIBehaviorComponent_keydown_HostBindingHandler($event) { return ctx.handleKey($event); }, i0.ɵɵresolveDocument)("keyup", function SpatialSearchKeyboardUIBehaviorComponent_keyup_HostBindingHandler($event) { return ctx.keyUp($event); }, i0.ɵɵresolveDocument);
        } if (rf & 2) {
            i0.ɵɵclassMap(ctx.className);
        } }, inputs: { delta: "delta", shiftDelta: "shiftDelta", position: "position", disablePositionChange: "disablePositionChange" }, outputs: { changePosition: "changePosition" }, standalone: false, decls: 1, vars: 2, consts: [[3, "keyClicked", "keyHovered", "currentKey", "shiftPressed"]], template: function SpatialSearchKeyboardUIBehaviorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ccf-spatial-search-keyboard-ui", 0);
            i0.ɵɵlistener("keyClicked", function SpatialSearchKeyboardUIBehaviorComponent_Template_ccf_spatial_search_keyboard_ui_keyClicked_0_listener($event) { return ctx.keyClick($event); })("keyHovered", function SpatialSearchKeyboardUIBehaviorComponent_Template_ccf_spatial_search_keyboard_ui_keyHovered_0_listener($event) { return ctx.keyHover($event); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("currentKey", ctx.currentKey)("shiftPressed", ctx.shiftPressed);
        } }, dependencies: [SpatialSearchKeyboardUIComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpatialSearchKeyboardUIBehaviorComponent, [{
        type: Component,
        args: [{ selector: 'ccf-spatial-search-keyboard-ui-behavior', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    '(document:keydown)': 'handleKey($event)',
                    '(document:keyup)': 'keyUp($event)',
                }, standalone: false, template: "<ccf-spatial-search-keyboard-ui\n  [currentKey]=\"currentKey\"\n  [shiftPressed]=\"shiftPressed\"\n  (keyClicked)=\"keyClick($event)\"\n  (keyHovered)=\"keyHover($event)\"\n>\n</ccf-spatial-search-keyboard-ui>\n" }]
    }], null, { className: [{
            type: HostBinding,
            args: ['class']
        }], delta: [{
            type: Input
        }], shiftDelta: [{
            type: Input
        }], position: [{
            type: Input
        }], disablePositionChange: [{
            type: Input
        }], changePosition: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SpatialSearchKeyboardUIBehaviorComponent, { className: "SpatialSearchKeyboardUIBehaviorComponent", filePath: "lib/components/spatial-search-keyboard-ui-behavior/spatial-search-keyboard-ui-behavior.component.ts", lineNumber: 41 }); })();

class SpatialSearchKeyboardUIModule {
    static ɵfac = function SpatialSearchKeyboardUIModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpatialSearchKeyboardUIModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SpatialSearchKeyboardUIModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [HraCommonModule, MatIconModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpatialSearchKeyboardUIModule, [{
        type: NgModule,
        args: [{
                imports: [HraCommonModule, MatIconModule],
                declarations: [SpatialSearchKeyboardUIComponent],
                exports: [SpatialSearchKeyboardUIComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SpatialSearchKeyboardUIModule, { declarations: [SpatialSearchKeyboardUIComponent], imports: [HraCommonModule, MatIconModule], exports: [SpatialSearchKeyboardUIComponent] }); })();

class SpatialSearchKeyboardUIBehaviorModule {
    static ɵfac = function SpatialSearchKeyboardUIBehaviorModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpatialSearchKeyboardUIBehaviorModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SpatialSearchKeyboardUIBehaviorModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [HraCommonModule, SpatialSearchKeyboardUIModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpatialSearchKeyboardUIBehaviorModule, [{
        type: NgModule,
        args: [{
                imports: [HraCommonModule, SpatialSearchKeyboardUIModule],
                declarations: [SpatialSearchKeyboardUIBehaviorComponent],
                exports: [SpatialSearchKeyboardUIBehaviorComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SpatialSearchKeyboardUIBehaviorModule, { declarations: [SpatialSearchKeyboardUIBehaviorComponent], imports: [HraCommonModule, SpatialSearchKeyboardUIModule], exports: [SpatialSearchKeyboardUIBehaviorComponent] }); })();

/*
 * Public API Surface of ccf-shared
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ALL_ORGANS, ALL_POSSIBLE_ORGANS, ApiEndpointDataSourceService, BodyUiComponent, BodyUiModule, callToAction_actions as CallToActionAction, CallToActionBehaviorComponent, CallToActionBehaviorModule, CallToActionComponent, CallToActionModule, CallToActionState, DEFAULT_MAX_OPTIONS, DataSourceService, DecoratedTextComponent, DecoratedTextModule, GlobalConfigState, GlobalsService, InfoButtonComponent, InfoButtonModule, InfoButtonService, InfoDialogComponent, InfoDialogModule, LocalStorageService, NumberDirective, NumbersOnlyModule, OpacitySliderComponent, SpatialSearchKeyboardUIBehaviorComponent, SpatialSearchKeyboardUIBehaviorModule, SpatialSearchKeyboardUIComponent, SpatialSearchKeyboardUIModule, SpatialSearchListComponent, StoreDebugComponent, StoreDebugModule, TextSearchComponent, TextSearchModule, XYZPositionComponent, XYZPositionModule, sexEquals, sexFromString };
//# sourceMappingURL=ccf-shared.mjs.map
