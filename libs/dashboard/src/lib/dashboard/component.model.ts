import { InputSignal, Type } from '@angular/core';
import { z, ZodAny } from 'zod';

export interface DashboardComponent<SpecT> {
  readonly spec: InputSignal<SpecT | undefined>;
}

export interface DashboardComponentType<DefT extends ZodAny, T extends DashboardComponent<z.infer<DefT>>>
  extends Type<T> {
  readonly name: string;
  readonly def: DefT;
}

export type AnyDashboardComponentType = DashboardComponentType<ZodAny, DashboardComponent<unknown>>;
