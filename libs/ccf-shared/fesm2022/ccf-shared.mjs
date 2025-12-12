import * as i0 from '@angular/core';
import { inject, ChangeDetectorRef, ChangeDetectionStrategy, Component, NgModule, model, input, output, signal, ElementRef, Directive, Injectable, Input, EventEmitter, Output } from '@angular/core';
import { Store, State } from '@ngxs/store';
import { Subscription, of, Observable, Subject } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import * as i1$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i2 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as i4 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { __decorate, __metadata } from 'tslib';
import { Computed, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { toSignal } from '@angular/core/rxjs-interop';
import { filterNulls } from 'ccf-shared/rxjs-ext/operators';
import { shareReplay, pluck, distinctUntilChanged, map, debounceTime, switchMap, tap, take, filter, delay, repeat, ignoreElements, endWith } from 'rxjs/operators';
import { V1Service, FilterSexEnum } from '@hra-api/ng-client';
import { Matrix4 } from '@math.gl/core';
import { Cacheable } from 'ts-cacheable';
import * as i4$1 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { HraCommonModule } from '@hra-ui/common';
import * as i1$2 from '@hra-ui/common/analytics';
import { injectFeaturePath, injectLogEvent } from '@hra-ui/common/analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';

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
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StoreDebugComponent, selectors: [["ccf-store-debug"]], standalone: false, decls: 1, vars: 1, consts: [["class", "state", 4, "ngFor", "ngForOf"], [1, "state"], [1, "kvlist"], ["class", "kvpair", 4, "ngFor", "ngForOf"], [1, "kvpair"]], template: function StoreDebugComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StoreDebugComponent_div_0_Template, 5, 2, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.data);
        } }, dependencies: [i1.NgForOf, i1.JsonPipe], styles: ["[_nghost-%COMP%]{display:block}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StoreDebugComponent, [{
        type: Component,
        args: [{ selector: 'ccf-store-debug', standalone: false, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let state of data\" class=\"state\">\n  <div>{{ state[0] }}</div>\n  <ul class=\"kvlist\">\n    <li *ngFor=\"let kv of state[1]\" class=\"kvpair\">{{ kv[0] }}: {{ kv[1] | json }}</li>\n  </ul>\n</div>\n", styles: [":host{display:block}\n"] }]
    }], () => [], null); })();
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
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpacitySliderComponent, selectors: [["ccf-opacity-slider"]], inputs: { opacity: [1, "opacity"], visible: [1, "visible"] }, outputs: { opacity: "opacityChange", opacityChange: "opacityChange", visibilityToggle: "visibilityToggle", opacityReset: "opacityReset", sliderChanged: "sliderChanged" }, decls: 14, vars: 8, consts: [["slider", ""], ["input", ""], [1, "icons"], ["hraFeature", "visibility-off", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Hide", 1, "visibility", "icon", "visible"], ["hraFeature", "visibility-on", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Show", 1, "visibility", "icon", "invisible"], ["hraFeature", "reset", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Reset", 1, "icon", "reset", 3, "click"], ["hraFeature", "slider", "hraClickEvent", "", 1, "slider", 3, "step", "min", "max"], ["matSliderThumb", "", 1, "opacity-slider", 3, "input", "value"], ["hraFeature", "input", "hraClickEvent", "", "subscriptSizing", "dynamic"], ["matInput", "", "type", "number", 3, "input", "value"], ["hraFeature", "visibility-off", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Hide", 1, "visibility", "icon", "visible", 3, "click"], ["hraFeature", "visibility-on", "hraClickEvent", "", "mat-icon-button", "", "hraPlainTooltip", "Show", 1, "visibility", "icon", "invisible", 3, "click"]], template: function OpacitySliderComponent_Template(rf, ctx) { if (rf & 1) {
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
            MatIconModule, i1$1.MatIcon, MatSliderModule, i2.MatSlider, i2.MatSliderThumb, MatRippleModule,
            MatInputModule, i3.MatInput, i3.MatFormField, i3.MatLabel, ButtonsModule, i4.MatIconButton, PlainTooltipDirective], styles: ["[_nghost-%COMP%]{display:flex;width:100%;align-items:center;padding:1rem;border-radius:.5rem;background-color:var(--mat-sys-on-primary);box-shadow:0 5px 4px #201e3d29}[_nghost-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:5rem}[_nghost-%COMP%]   mat-slider[_ngcontent-%COMP%]{--mat-slider-active-track-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-inactive-track-color: #acb5c3;--mat-slider-handle-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-active-track-height: 2px;--mat-slider-inactive-track-height: 2px;width:10rem;margin:0 1.5rem}[_nghost-%COMP%]   mat-slider.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:not-allowed}[_nghost-%COMP%]   mat-slider[_ngcontent-%COMP%]     mat-slider-visual-thumb{transition:none}[_nghost-%COMP%]   mat-slider[_ngcontent-%COMP%]     .mdc-slider__track--inactive{opacity:1}"], changeDetection: 0 });
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
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"icons\">\n  @if (opacity() > 0) {\n    <button\n      hraFeature=\"visibility-off\"\n      hraClickEvent\n      mat-icon-button\n      class=\"visibility icon visible\"\n      hraPlainTooltip=\"Hide\"\n      (click)=\"toggleVisibility()\"\n    >\n      <mat-icon>visibility_off</mat-icon>\n    </button>\n  } @else {\n    <button\n      hraFeature=\"visibility-on\"\n      hraClickEvent\n      mat-icon-button\n      class=\"visibility icon invisible\"\n      hraPlainTooltip=\"Show\"\n      (click)=\"toggleVisibility()\"\n    >\n      <mat-icon>visibility_on</mat-icon>\n    </button>\n  }\n  <button\n    hraFeature=\"reset\"\n    hraClickEvent\n    mat-icon-button\n    class=\"icon reset\"\n    hraPlainTooltip=\"Reset\"\n    (click)=\"resetOpacity()\"\n  >\n    <mat-icon>reset_settings</mat-icon>\n  </button>\n</div>\n\n<mat-slider\n  hraFeature=\"slider\"\n  hraClickEvent\n  class=\"slider\"\n  [class.disabled]=\"!visible()\"\n  [step]=\"1\"\n  [min]=\"0\"\n  [max]=\"100\"\n>\n  <input\n    matSliderThumb\n    class=\"opacity-slider\"\n    [value]=\"opacity()\"\n    (input)=\"opacityChange.emit(+slider.value)\"\n    #slider\n  />\n</mat-slider>\n\n<mat-form-field hraFeature=\"input\" hraClickEvent subscriptSizing=\"dynamic\">\n  <mat-label>Opacity</mat-label>\n  <input matInput type=\"number\" [value]=\"opacity()\" (input)=\"opacityChange.emit(+input.value || 0)\" #input />\n</mat-form-field>\n", styles: [":host{display:flex;width:100%;align-items:center;padding:1rem;border-radius:.5rem;background-color:var(--mat-sys-on-primary);box-shadow:0 5px 4px #201e3d29}:host mat-form-field{width:5rem}:host mat-slider{--mat-slider-active-track-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-inactive-track-color: #acb5c3;--mat-slider-handle-color: var(--mat-sys-on-tertiary-fixed);--mat-slider-active-track-height: 2px;--mat-slider-inactive-track-height: 2px;width:10rem;margin:0 1.5rem}:host mat-slider.disabled{pointer-events:none;cursor:not-allowed}:host mat-slider ::ng-deep mat-slider-visual-thumb{transition:none}:host mat-slider ::ng-deep .mdc-slider__track--inactive{opacity:1}\n"] }]
    }], null, { opacity: [{ type: i0.Input, args: [{ isSignal: true, alias: "opacity", required: false }] }, { type: i0.Output, args: ["opacityChange"] }], visible: [{ type: i0.Input, args: [{ isSignal: true, alias: "visible", required: false }] }], opacityChange: [{ type: i0.Output, args: ["opacityChange"] }], visibilityToggle: [{ type: i0.Output, args: ["visibilityToggle"] }], opacityReset: [{ type: i0.Output, args: ["opacityReset"] }], sliderChanged: [{ type: i0.Output, args: ["sliderChanged"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpacitySliderComponent, { className: "OpacitySliderComponent", filePath: "lib/components/opacity-slider/opacity-slider.component.ts", lineNumber: 28 }); })();

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
                host: {
                    '(input)': 'onInputChange($event)',
                },
            }]
    }], null, null); })();

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
        src: 'app:adipose',
        organ: 'Adipose',
        name: 'Adipose',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0014455',
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
        src: 'app:intervertebral-disk',
        organ: 'Intervertebral Disk',
        name: 'Intervertebral Disk',
        hasSex: true,
        id: 'http://purl.obolibrary.org/obo/UBERON_0001066',
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
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpatialSearchListComponent, selectors: [["ccf-spatial-search-list"]], inputs: { label: [1, "label"], items: [1, "items"] }, outputs: { selectionChanged: "selectionChanged", itemRemoved: "itemRemoved" }, decls: 4, vars: 1, consts: [["hraFeature", "list", 1, "list"], [1, "item"], [1, "item-content"], ["hraFeature", "select-all-toggle", "hraClickEvent", "", "labelPosition", "after", 1, "description", 3, "change", "checked"], [1, "checkbox-label"], ["hraFeature", "select", "hraClickEvent", "", "labelPosition", "after", 1, "description", 3, "change", "checked"], ["hraFeature", "remove", "hraClickEvent", "", "mat-icon-button", "", 1, "delete", 3, "click"]], template: function SpatialSearchListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-list", 0);
            i0.ɵɵconditionalCreate(1, SpatialSearchListComponent_Conditional_1_Template, 5, 1, "mat-list-item", 1);
            i0.ɵɵrepeaterCreate(2, SpatialSearchListComponent_For_3_Template, 8, 2, "mat-list-item", 1, ctx.itemId, true);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.items().length > 1 ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.items());
        } }, dependencies: [HraCommonModule, i1$2.ClickEventDirective, i1$2.FeatureDirective, MatButtonModule, i4.MatIconButton, MatIconModule, i1$1.MatIcon, MatCheckboxModule, i4$1.MatCheckbox, MatListModule, i5.MatList, i5.MatListItem], styles: ["[_nghost-%COMP%]   .list[_ngcontent-%COMP%]{--mat-list-list-item-one-line-container-height: 2.5rem;--mat-list-list-item-label-text-color: var(--mat-sys-primary);padding:.25rem 0}[_nghost-%COMP%]   .item-content[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .checkbox-label[_ngcontent-%COMP%]{font:var(--mat-sys-label-large);padding:0 .5rem}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpatialSearchListComponent, [{
        type: Component,
        args: [{ selector: 'ccf-spatial-search-list', imports: [HraCommonModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatListModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-list hraFeature=\"list\" class=\"list\">\n  @if (items().length > 1) {\n    <mat-list-item class=\"item\">\n      <div class=\"item-content\">\n        <mat-checkbox\n          hraFeature=\"select-all-toggle\"\n          hraClickEvent\n          class=\"description\"\n          labelPosition=\"after\"\n          [checked]=\"allSelected\"\n          (change)=\"updateAllItemsSelection($event.checked)\"\n        />\n        <div class=\"checkbox-label\">All Spatial Locations</div>\n      </div>\n    </mat-list-item>\n  }\n  @for (item of items(); track itemId($index, item)) {\n    <mat-list-item class=\"item\">\n      <div class=\"item-content\">\n        <mat-checkbox\n          hraFeature=\"select\"\n          hraClickEvent\n          class=\"description\"\n          labelPosition=\"after\"\n          [checked]=\"item.selected\"\n          (change)=\"updateItemSelection($index, $event.checked)\"\n        />\n        <button hraFeature=\"remove\" hraClickEvent mat-icon-button class=\"delete\" (click)=\"removeItem($index)\">\n          <mat-icon>delete_outlined</mat-icon>\n        </button>\n        <div class=\"checkbox-label\">{{ item.description }}</div>\n      </div>\n    </mat-list-item>\n  }\n</mat-list>\n", styles: [":host .list{--mat-list-list-item-one-line-container-height: 2.5rem;--mat-list-list-item-label-text-color: var(--mat-sys-primary);padding:.25rem 0}:host .item-content{display:flex;align-items:center}:host .checkbox-label{font:var(--mat-sys-label-large);padding:0 .5rem}\n"] }]
    }], null, { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: false }] }], selectionChanged: [{ type: i0.Output, args: ["selectionChanged"] }], itemRemoved: [{ type: i0.Output, args: ["itemRemoved"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SpatialSearchListComponent, { className: "SpatialSearchListComponent", filePath: "lib/components/spatial-search-list/spatial-search-list.component.ts", lineNumber: 29 }); })();

/**
 * Component displaying a x, y, and z position
 */
class XYZPositionComponent {
    /** X position */
    x = 0;
    /** Y position */
    y = 0;
    /** Z position */
    z = 0;
    /** Number format for position values */
    format = '1.0-2';
    static ɵfac = function XYZPositionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || XYZPositionComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: XYZPositionComponent, selectors: [["ccf-xyz-position"]], inputs: { x: "x", y: "y", z: "z" }, standalone: false, decls: 9, vars: 12, consts: [[1, "line"]], template: function XYZPositionComponent_Template(rf, ctx) { if (rf & 1) {
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
        args: [{ selector: 'ccf-xyz-position', standalone: false, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"line\">X: {{ x | number: format }}</span>\n<span class=\"line\">Y: {{ y | number: format }}</span>\n<span class=\"line\">Z: {{ z | number: format }}</span>\n", styles: [":host{display:flex;flex-direction:column}:host .line{font-size:1rem;font-weight:400}\n"] }]
    }], null, { x: [{
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
    /** Current key pressed */
    currentKey;
    /** True if shift key is pressed */
    shiftPressed;
    /** Emits when a key is clicked */
    keyClicked = new EventEmitter();
    /** Emits the key value when a key is hovered over */
    keyHovered = new EventEmitter();
    static ɵfac = function SpatialSearchKeyboardUIComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpatialSearchKeyboardUIComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpatialSearchKeyboardUIComponent, selectors: [["ccf-spatial-search-keyboard-ui"]], inputs: { currentKey: "currentKey", shiftPressed: "shiftPressed" }, outputs: { keyClicked: "keyClicked", keyHovered: "keyHovered" }, standalone: false, decls: 16, vars: 13, consts: [["hraFeature", "keyboard-ui", 1, "keys"], [1, "keyrow"], ["hraFeature", "q", "hraClickEvent", "", 1, "key", "blue", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "w", "hraClickEvent", "", 1, "key", "green", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "e", "hraClickEvent", "", 1, "key", "blue", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "a", "hraClickEvent", "", 1, "key", "red", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "s", "hraClickEvent", "", 1, "key", "green", 3, "mousedown", "mouseover", "mouseout"], ["hraFeature", "d", "hraClickEvent", "", 1, "key", "red", 3, "mousedown", "mouseover", "mouseout"], ["class", "shift", 4, "ngIf"], [1, "shift"]], template: function SpatialSearchKeyboardUIComponent_Template(rf, ctx) { if (rf & 1) {
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
        args: [{ selector: 'ccf-spatial-search-keyboard-ui', standalone: false, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div hraFeature=\"keyboard-ui\" class=\"keys\">\n  <div class=\"keyrow\">\n    <div\n      hraFeature=\"q\"\n      hraClickEvent\n      class=\"key blue\"\n      [class.highlighted]=\"currentKey === 'q'\"\n      (mousedown)=\"keyClicked.emit('q')\"\n      (mouseover)=\"keyHovered.emit('q')\"\n      (mouseout)=\"keyHovered.emit()\"\n    >\n      Q\n    </div>\n    <div\n      hraFeature=\"w\"\n      hraClickEvent\n      class=\"key green\"\n      [class.highlighted]=\"currentKey === 'w'\"\n      (mousedown)=\"keyClicked.emit('w')\"\n      (mouseover)=\"keyHovered.emit('w')\"\n      (mouseout)=\"keyHovered.emit()\"\n    >\n      W\n    </div>\n    <div\n      hraFeature=\"e\"\n      hraClickEvent\n      class=\"key blue\"\n      [class.highlighted]=\"currentKey === 'e'\"\n      (mousedown)=\"keyClicked.emit('e')\"\n      (mouseover)=\"keyHovered.emit('e')\"\n      (mouseout)=\"keyHovered.emit()\"\n    >\n      E\n    </div>\n  </div>\n  <div class=\"keyrow\">\n    <div\n      hraFeature=\"a\"\n      hraClickEvent\n      class=\"key red\"\n      [class.highlighted]=\"currentKey === 'a'\"\n      (mousedown)=\"keyClicked.emit('a')\"\n      (mouseover)=\"keyHovered.emit('a')\"\n      (mouseout)=\"keyHovered.emit()\"\n    >\n      A\n    </div>\n    <div\n      hraFeature=\"s\"\n      hraClickEvent\n      class=\"key green\"\n      [class.highlighted]=\"currentKey === 's'\"\n      (mousedown)=\"keyClicked.emit('s')\"\n      (mouseover)=\"keyHovered.emit('s')\"\n      (mouseout)=\"keyHovered.emit()\"\n    >\n      S\n    </div>\n    <div\n      hraFeature=\"d\"\n      hraClickEvent\n      class=\"key red\"\n      [class.highlighted]=\"currentKey === 'd'\"\n      (mousedown)=\"keyClicked.emit('d')\"\n      (mouseover)=\"keyHovered.emit('d')\"\n      (mouseout)=\"keyHovered.emit()\"\n    >\n      D\n    </div>\n  </div>\n  <div *ngIf=\"shiftPressed\" class=\"shift\">SHIFT</div>\n</div>\n", styles: [":host{font:var(--mat-sys-label-large)}:host .keys{display:flex;flex-direction:column;align-items:flex-start;padding:0;gap:.5rem;width:7rem;-webkit-user-select:none;user-select:none}:host .keys .keyrow{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0;gap:.5rem}:host .keys .keyrow .key{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.25rem;width:2rem;height:2rem;border:2px solid;border-radius:.5rem;cursor:pointer}:host .keys .keyrow .key:hover,:host .keys .keyrow .key.highlighted{color:#fff}:host .keys .green{color:#1dcc65}:host .keys .blue{color:#2979ff}:host .keys .red{color:#d50000}:host .shift{color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.25rem;width:7rem;height:2rem;border:2px solid;border-radius:.5rem}\n"] }]
    }], null, { currentKey: [{
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
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpatialSearchKeyboardUIBehaviorComponent, selectors: [["ccf-spatial-search-keyboard-ui-behavior"]], hostBindings: function SpatialSearchKeyboardUIBehaviorComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function SpatialSearchKeyboardUIBehaviorComponent_keydown_HostBindingHandler($event) { return ctx.handleKey($event); }, i0.ɵɵresolveDocument)("keyup", function SpatialSearchKeyboardUIBehaviorComponent_keyup_HostBindingHandler($event) { return ctx.keyUp($event); }, i0.ɵɵresolveDocument);
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
        args: [{ selector: 'ccf-spatial-search-keyboard-ui-behavior', standalone: false, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    '(document:keydown)': 'handleKey($event)',
                    '(document:keyup)': 'keyUp($event)',
                }, template: "<ccf-spatial-search-keyboard-ui\n  [currentKey]=\"currentKey\"\n  [shiftPressed]=\"shiftPressed\"\n  (keyClicked)=\"keyClick($event)\"\n  (keyHovered)=\"keyHover($event)\"\n/>\n" }]
    }], null, { delta: [{
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

export { ALL_ORGANS, ALL_POSSIBLE_ORGANS, ApiEndpointDataSourceService, DataSourceService, GlobalConfigState, GlobalsService, NumberDirective, NumbersOnlyModule, OpacitySliderComponent, SpatialSearchKeyboardUIBehaviorComponent, SpatialSearchKeyboardUIBehaviorModule, SpatialSearchKeyboardUIComponent, SpatialSearchKeyboardUIModule, SpatialSearchListComponent, StoreDebugComponent, StoreDebugModule, XYZPositionComponent, XYZPositionModule, sexEquals, sexFromString };
//# sourceMappingURL=ccf-shared.mjs.map
