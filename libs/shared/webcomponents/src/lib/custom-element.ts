import { ApplicationConfig, ApplicationRef, Injector, Type } from '@angular/core';
import { NgElementConstructor, createCustomElement as createCustomElementImpl } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { filter, firstValueFrom } from 'rxjs';
import { ComponentNgElementStrategyFactory } from './element-strategy/component-factory-strategy';
import { InputProps, NgElementExtensions } from './interfaces';

/**
 * Adds additional methods to an NgElement class
 *
 * @param Base Base element class
 * @param injector Application injector
 * @returns A new class with extension methods added
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mixinExtensions<TypeT extends Type<any>>(Base: TypeT, injector: Injector) {
  return class NgElementWithExtensions extends Base implements NgElementExtensions {
    async whenStable(): Promise<void> {
      const appRef = injector.get(ApplicationRef);
      await firstValueFrom(appRef.isStable.pipe(filter((stable) => stable)));
    }
  };
}

/**
 * Converts and registers an angular component as a custom element
 *
 * @param name Tag name for custom element
 * @param component Angular component to convert into a custom element
 * @param applicationConfig Additional application configuration
 * @returns A custom element class
 */
export async function createCustomElement<CompT>(
  name: string,
  component: Type<CompT>,
  applicationConfig?: ApplicationConfig,
): Promise<NgElementConstructor<InputProps<CompT> & NgElementExtensions>> {
  const { injector } = await createApplication(applicationConfig);
  const strategyFactory = new ComponentNgElementStrategyFactory(component);
  const base = createCustomElementImpl<InputProps<CompT>>(component, { injector, strategyFactory });
  const element = mixinExtensions(base, injector);

  customElements.define(name, element);
  return element as NgElementConstructor<InputProps<CompT> & NgElementExtensions>;
}
