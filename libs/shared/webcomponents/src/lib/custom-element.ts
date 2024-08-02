import { ApplicationConfig, InputSignalWithTransform, ModelSignal, Type } from '@angular/core';
import { NgElementConstructor, createCustomElement as createCustomElementImpl } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ComponentNgElementStrategyFactory } from './element-strategy/component-factory-strategy';

type InputSignalKey<KeyT, ValueT> = [InputSignalValue<ValueT>] extends [never] ? never : KeyT;

type InputSignalValue<SignalT> =
  SignalT extends InputSignalWithTransform<infer ValueT, infer _Unused>
    ? ValueT
    : SignalT extends ModelSignal<infer ValueT>
      ? ValueT
      : never;

export type InputProps<CompT> = {
  -readonly [KeyT in keyof CompT as InputSignalKey<KeyT, CompT[KeyT]>]: InputSignalValue<CompT[KeyT]>;
};

export async function createCustomElement<CompT>(
  name: string,
  component: Type<CompT>,
  applicationConfig?: ApplicationConfig,
): Promise<NgElementConstructor<InputProps<CompT>>> {
  const { injector } = await createApplication(applicationConfig);
  const element = createCustomElementImpl<InputProps<CompT>>(component, {
    injector,
    strategyFactory: new ComponentNgElementStrategyFactory(component),
  });

  customElements.define(name, element);
  return element;
}
