import { ApplicationConfig, InputSignal, Type } from '@angular/core';
import { NgElementConstructor, createCustomElement as createCustomElementImpl } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ComponentNgElementStrategyFactory } from './element-strategy/component-factory-strategy';

type InputProps<CompT> = {
  [KeyT in keyof CompT]: CompT[KeyT] extends InputSignal<infer ValueT> ? ValueT : never;
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
