import { ApplicationConfig, ApplicationRef, ComponentRef, Injector, Type } from '@angular/core';
import { createCustomElement as createCustomElementImpl, NgElement, NgElementConstructor } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { filter, firstValueFrom } from 'rxjs';
import { ComponentNgElementStrategyFactory } from './element-strategy/component-factory-strategy';
import { InputProps, NgElementExtensions } from './interfaces';

/**
 * Adds additional methods to an NgElement class
 *
 * @param base Base element class
 * @param injector Application injector
 * @returns A new class with extension methods added
 */
function mixinExtensions<T>(base: new (injector?: Injector) => NgElement, injector: Injector) {
  abstract class NgElementWithExtensions extends base implements NgElementExtensions<T> {
    get instance(): T | undefined {
      // componentRef is not public...
      const strategy = this.ngElementStrategy as unknown as Record<'componentRef', ComponentRef<T> | null>;
      return strategy.componentRef?.instance;
    }

    async whenStable(): Promise<void> {
      const appRef = injector.get(ApplicationRef);
      await firstValueFrom(appRef.isStable.pipe(filter((stable) => stable)));
    }
  }

  return NgElementWithExtensions as NgElementConstructor<InputProps<T> & NgElementExtensions<T>>;
}

/**
 * Converts and registers an angular component as a custom element
 *
 * @param name Tag name for custom element
 * @param component Angular component to convert into a custom element
 * @param applicationConfig Additional application configuration
 * @returns A custom element class
 */
export async function createCustomElement<T>(
  name: string,
  component: Type<T>,
  applicationConfig?: ApplicationConfig,
): Promise<NgElementConstructor<InputProps<T> & NgElementExtensions<T>>> {
  const { injector } = await createApplication(applicationConfig);
  const strategyFactory = new ComponentNgElementStrategyFactory(component);
  const base = createCustomElementImpl<InputProps<T>>(component, { injector, strategyFactory });
  const element = mixinExtensions<T>(base, injector);

  customElements.define(name, element);
  return element;
}
