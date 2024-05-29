import { ApplicationConfig, InputSignal, InputSignalWithTransform, Type } from '@angular/core';
import { NgElementConstructor, createCustomElement as createCustomElementImpl } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ComponentNgElementStrategyFactory } from './element-strategy/component-factory-strategy';

type InputSignalValue<SignalT> = SignalT extends InputSignal<infer ValueT>
  ? ValueT
  : SignalT extends InputSignalWithTransform<infer ValueT, unknown>
    ? ValueT
    : never;

export type InputProps<CompT> = {
  -readonly [KeyT in keyof CompT]: InputSignalValue<CompT[KeyT]>;
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
