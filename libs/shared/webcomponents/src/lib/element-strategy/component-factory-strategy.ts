/**
 * Copied from {@link https://github.com/angular/angular/tree/17.3.7/packages/elements/src}
 * and modified to add support for signal based components.
 *
 * Once @angular/elements support signal based components all of this code should be removed
 * in favor of the official implementation.
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentMirror,
  ComponentRef,
  EnvironmentInjector,
  Injector,
  NgZone,
  Type,
  createComponent,
  isSignal,
  reflectComponentType,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { NgElementStrategy, NgElementStrategyEvent, NgElementStrategyFactory } from '@angular/elements';
import { Observable, ReplaySubject, isObservable, merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { extractProjectableNodes } from './extract-projectable-nodes';
import { scheduler, strictEquals } from './utils';

declare type Zone = any;
declare let Zone: any;

/** Time in milliseconds to wait before destroying the component ref when disconnected. */
const DESTROY_DELAY = 10;

/**
 * Factory that creates new ComponentNgElementStrategy instance. Gets the component factory with the
 * constructor's injector's factory resolver and passes that factory to each strategy.
 */
export class ComponentNgElementStrategyFactory implements NgElementStrategyFactory {
  constructor(private readonly component: Type<any>) {}

  create(injector: Injector) {
    return new ComponentNgElementStrategy(this.component, injector);
  }
}

/**
 * Creates and destroys a component ref using a component factory and handles change detection
 * in response to input changes.
 */
export class ComponentNgElementStrategy implements NgElementStrategy {
  // Subject of `NgElementStrategyEvent` observables corresponding to the component's outputs.
  private readonly eventEmitters = new ReplaySubject<Observable<NgElementStrategyEvent>[]>(1);

  /** Merged stream of the component's output events. */
  readonly events = this.eventEmitters.pipe(switchMap((emitters) => merge(...emitters)));

  /** Reference to the component that was created on connect. */
  private componentRef: ComponentRef<any> | null = null;

  /** Reference to the component view's `ChangeDetectorRef`. */
  private viewChangeDetectorRef: ChangeDetectorRef | null = null;

  /** Whether changes have been made to component inputs since the last change detection run. */
  private hasInputChanges = false;

  /** Whether a change detection has been scheduled to run on the component. */
  private scheduledChangeDetectionFn: (() => void) | null = null;

  /** Callback function that when called will cancel a scheduled destruction on the component. */
  private scheduledDestroyFn: (() => void) | null = null;

  /** Initial input values that were set before the component was created. */
  private readonly initialInputValues = new Map<string, any>();

  /**
   * Set of component inputs that have not yet changed, i.e. for which `recordInputChange()` has not
   * fired.
   * (This helps detect the first change of an input, even if it is explicitly set to `undefined`.)
   */
  private readonly unchangedInputs: Set<string>;

  /** Service for setting zone context. */
  private readonly ngZone: NgZone;

  /** The zone the element was created in or `null` if Zone.js is not loaded. */
  private readonly elementZone: Zone | null;

  private readonly componentMirror = reflectComponentType(this.component) as ComponentMirror<any>;

  constructor(
    private readonly component: Type<any>,
    private readonly injector: Injector,
  ) {
    this.unchangedInputs = new Set<string>(this.componentMirror.inputs.map(({ propName }) => propName));
    this.ngZone = this.injector.get<NgZone>(NgZone);
    this.elementZone = typeof Zone === 'undefined' ? null : this.ngZone.run(() => Zone.current);
  }

  /**
   * Initializes a new component if one has not yet been created and cancels any scheduled
   * destruction.
   */
  connect(element: HTMLElement) {
    this.runInZone(() => {
      // If the element is marked to be destroyed, cancel the task since the component was
      // reconnected
      if (this.scheduledDestroyFn !== null) {
        this.scheduledDestroyFn();
        this.scheduledDestroyFn = null;
        return;
      }

      if (this.componentRef === null) {
        this.initializeComponent(element);
      }
    });
  }

  /**
   * Schedules the component to be destroyed after some small delay in case the element is just
   * being moved across the DOM.
   */
  disconnect() {
    this.runInZone(() => {
      // Return if there is no componentRef or the component is already scheduled for destruction
      if (this.componentRef === null || this.scheduledDestroyFn !== null) {
        return;
      }

      // Schedule the component to be destroyed after a small timeout in case it is being
      // moved elsewhere in the DOM
      this.scheduledDestroyFn = scheduler.schedule(() => {
        if (this.componentRef !== null) {
          this.componentRef.destroy();
          this.componentRef = null;
          this.viewChangeDetectorRef = null;
        }
      }, DESTROY_DELAY);
    });
  }

  /**
   * Returns the component property value. If the component has not yet been created, the value is
   * retrieved from the cached initialization values.
   */
  getInputValue(property: string): any {
    return this.runInZone(() => {
      if (this.componentRef === null) {
        return this.initialInputValues.get(property);
      }

      const value = this.componentRef.instance[property];
      return isSignal(value) ? value() : value;
    });
  }

  /**
   * Sets the input value for the property. If the component has not yet been created, the value is
   * cached and set when the component is created.
   */
  setInputValue(property: string, value: any, transform?: (value: any) => any): void {
    this.runInZone(() => {
      if (transform) {
        value = transform.call(this.componentRef?.instance, value);
      }

      if (this.componentRef === null) {
        this.initialInputValues.set(property, value);
        return;
      }

      // Ignore the value if it is strictly equal to the current value, except if it is `undefined`
      // and this is the first change to the value (because an explicit `undefined` _is_ strictly
      // equal to not having a value set at all, but we still need to record this as a change).
      if (
        strictEquals(value, this.getInputValue(property)) &&
        !(value === undefined && this.unchangedInputs.has(property))
      ) {
        return;
      }

      // Record the changed value and update internal state to reflect the fact that this input has
      // changed.
      this.unchangedInputs.delete(property);
      this.hasInputChanges = true;

      // Update the component instance and schedule change detection.
      this.componentRef.setInput(property, value);
      this.scheduleDetectChanges();
    });
  }

  /**
   * Creates a new component through the component factory with the provided element host and
   * sets up its initial inputs, listens for outputs changes, and runs an initial change detection.
   */
  protected initializeComponent(element: HTMLElement) {
    const environmentInjector = this.injector.get(EnvironmentInjector);
    const elementInjector = Injector.create({ providers: [], parent: this.injector });
    const projectableNodes = extractProjectableNodes(element, [...this.componentMirror.ngContentSelectors]);
    this.componentRef = createComponent(this.component, {
      environmentInjector,
      elementInjector,
      projectableNodes,
      hostElement: element,
    });
    this.viewChangeDetectorRef = this.componentRef.injector.get(ChangeDetectorRef);

    this.initializeInputs();
    this.initializeOutputs(this.componentRef);

    this.detectChanges();

    const applicationRef = this.injector.get<ApplicationRef>(ApplicationRef);
    applicationRef.attachView(this.componentRef.hostView);
  }

  /** Set any stored initial inputs on the component's properties. */
  protected initializeInputs(): void {
    this.componentMirror.inputs.forEach(({ propName, transform }) => {
      if (this.initialInputValues.has(propName)) {
        // Call `setInputValue()` now that the component has been instantiated to update its
        // properties and fire `ngOnChanges()`.
        this.setInputValue(propName, this.initialInputValues.get(propName), transform);
      }
    });

    this.initialInputValues.clear();
  }

  /** Sets up listeners for the component's outputs so that the events stream emits the events. */
  protected initializeOutputs(componentRef: ComponentRef<any>): void {
    const eventEmitters: Observable<NgElementStrategyEvent>[] = this.componentMirror.outputs.map(
      ({ propName, templateName }) => {
        const emitter = componentRef.instance[propName];
        const emitterObservable = isObservable(emitter) ? emitter : outputToObservable(emitter);
        return emitterObservable.pipe(map((value) => ({ name: templateName, value })));
      },
    );

    this.eventEmitters.next(eventEmitters);
  }

  /**
   * Marks the component view for check, if necessary.
   * (NOTE: This is required when the `ChangeDetectionStrategy` is set to `OnPush`.)
   */
  protected markViewForCheck(viewChangeDetectorRef: ChangeDetectorRef): void {
    if (this.hasInputChanges) {
      this.hasInputChanges = false;
      viewChangeDetectorRef.markForCheck();
    }
  }

  /**
   * Schedules change detection to run on the component.
   * Ignores subsequent calls if already scheduled.
   */
  protected scheduleDetectChanges(): void {
    if (this.scheduledChangeDetectionFn) {
      return;
    }

    this.scheduledChangeDetectionFn = scheduler.scheduleBeforeRender(() => {
      this.scheduledChangeDetectionFn = null;
      this.detectChanges();
    });
  }

  /** Runs change detection on the component. */
  protected detectChanges(): void {
    if (this.componentRef === null) {
      return;
    }

    this.markViewForCheck(this.viewChangeDetectorRef as ChangeDetectorRef);
    this.componentRef.changeDetectorRef.detectChanges();
  }

  /** Runs in the angular zone, if present. */
  private runInZone(fn: () => unknown) {
    return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(fn) : fn();
  }
}
