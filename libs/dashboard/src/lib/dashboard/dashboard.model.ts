import { InputSignal, Type } from '@angular/core';
import { z } from 'zod';

export type DashboardComponentSpecAny = { type: string };
export type DashboardComponentDefAny = z.ZodType<DashboardComponentSpecAny>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DashboardComponentTypeAny = DashboardComponentType<DashboardComponentDefAny, any>;
export type DashboardComponentAny = DashboardComponent<DashboardComponentTypeAny>;

export interface DashboardComponentType<
  DefT extends DashboardComponentDefAny,
  InstanceT extends DashboardComponent<DashboardComponentType<DefT, InstanceT>>,
> extends Type<InstanceT> {
  readonly type: string;
  readonly def: DefT;
}

export interface DashboardComponent<ClassT extends DashboardComponentTypeAny> {
  readonly spec: InputSignal<z.infer<ClassT['def']> | undefined>;
}
