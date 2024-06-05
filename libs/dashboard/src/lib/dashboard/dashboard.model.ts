import { Signal, Type } from '@angular/core';
import { SafeParseReturnType, ZodLiteral, ZodTypeAny, z } from 'zod';

export type DashboardComponentAnySpec = { type: string };
export type DashboardComponentAnyDef = z.ZodObject<{ type: ZodLiteral<string> }>;

export type DashboardComponentDefFor<ClassT> = ClassT extends { def: infer DefT extends ZodTypeAny } ? DefT : never;
export type DashboardComponentSpecFor<ClassT> = z.infer<DashboardComponentDefFor<ClassT>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Use `any` to break circular definition
export type DashboardComponentAnyClass = DashboardComponentClass<DashboardComponentAnyDef, DashboardComponent<any>>;
export type DashboardComponentAny = DashboardComponent<DashboardComponentAnyClass>;

export interface DashboardComponentClass<
  DefT extends DashboardComponentAnyDef,
  InstanceT extends DashboardComponent<DashboardComponentClass<DefT, InstanceT>>,
> extends Type<InstanceT> {
  readonly def: DefT;
}

export interface DashboardComponent<ClassT extends DashboardComponentAnyClass> {
  readonly spec: Signal<DashboardComponentSpecFor<ClassT>>;
}

export const DASHBOARD_COMPONENT_ANY_DEF = z
  .object({
    type: z.string(),
  })
  .passthrough();

export function defFor(cls: DashboardComponentAnyClass): DashboardComponentAnyDef {
  return cls.def;
}

export function typeFor(cls: DashboardComponentAnyClass): string {
  return defFor(cls).shape.type.value;
}

export function validateSpec(
  cls: DashboardComponentAnyClass,
  spec: DashboardComponentAnySpec,
): DashboardComponentAnySpec {
  return defFor(cls).parse(spec);
}

export function safeValidateSpec(
  cls: DashboardComponentAnyClass,
  spec: DashboardComponentAnySpec,
): SafeParseReturnType<DashboardComponentAnySpec, DashboardComponentAnySpec> {
  return defFor(cls).safeParse(spec);
}
