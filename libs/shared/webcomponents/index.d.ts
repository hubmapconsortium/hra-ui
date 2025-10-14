import { InputSignalWithTransform, Type, ApplicationConfig } from '@angular/core';
import { NgElementConstructor } from '@angular/elements';

/** Returns KeyT unchanged if SignalT is a input otherwise never */
type InputPropKey<KeyT, SignalT> = [InputPropValue<SignalT>] extends [never] ? never : KeyT;
/** Returns the value type of an input SignalT or never if it is not an input */
type InputPropValue<SignalT> = SignalT extends InputSignalWithTransform<infer ValueT, infer _Unused> ? ValueT : never;
/** Extracts the input/model properties and their corresponding value types for a component */
type InputProps<CompT> = {
    -readonly [KeyT in keyof CompT as InputPropKey<KeyT, CompT[KeyT]>]: InputPropValue<CompT[KeyT]>;
};
/**
 * Additional methods and properties added to custom elements
 */
interface NgElementExtensions<T> {
    /** Reference to the angular component instance */
    readonly instance: T | undefined;
    /**
     * Resolves when the angular zone becomes stable.
     * This usually indicates that rendering has completed, etc.
     * Note that if any part of the component has started a recurring task
     * (setInterval, rxjs' interval, etc.) the returned promise may never resolve
     * so don't exclusively rely on this when waiting for stability.
     */
    whenStable(): Promise<void>;
}

/**
 * Converts and registers an angular component as a custom element
 *
 * @param name Tag name for custom element
 * @param component Angular component to convert into a custom element
 * @param applicationConfig Additional application configuration
 * @returns A custom element class
 */
declare function createCustomElement<T>(name: string, component: Type<T>, applicationConfig?: ApplicationConfig): Promise<NgElementConstructor<InputProps<T> & NgElementExtensions<T>>>;

export { createCustomElement };
export type { InputProps, NgElementExtensions };
