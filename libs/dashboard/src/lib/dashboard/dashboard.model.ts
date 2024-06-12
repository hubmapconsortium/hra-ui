import { Signal, Type } from '@angular/core';
import { SafeParseReturnType, ZodLiteral, ZodTypeAny, z } from 'zod';

/** Type representing any DashboardComponent specification */
export type DashboardComponentAnySpec = { type: string };

/** Type representing the definition of any DashboardComponent */
export type DashboardComponentAnyDef = z.ZodObject<{ type: ZodLiteral<string> }>;

/** Extracts the definition type from a DashboardComponent class */
export type DashboardComponentDefFor<ClassT> = ClassT extends { def: infer DefT extends ZodTypeAny } ? DefT : never;

/** Infers the specification type from a DashboardComponent class */
export type DashboardComponentSpecFor<ClassT> = z.infer<DashboardComponentDefFor<ClassT>>;

/** Type representing any DashboardComponent class */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Use `any` to break circular definition
export type DashboardComponentAnyClass = DashboardComponentClass<DashboardComponentAnyDef, DashboardComponent<any>>;

/** Type representing any DashboardComponent instance */
export type DashboardComponentAny = DashboardComponent<DashboardComponentAnyClass>;

/** Interface representing the structure of a DashboardComponent class */
export interface DashboardComponentClass<
  DefT extends DashboardComponentAnyDef,
  InstanceT extends DashboardComponent<DashboardComponentClass<DefT, InstanceT>>,
> extends Type<InstanceT> {
  /** Definition of the DashboardComponent */
  readonly def: DefT;
}

/** Interface representing the structure of a DashboardComponent instance */
export interface DashboardComponent<ClassT extends DashboardComponentAnyClass> {
  /** Specification signal for the DashboardComponent */
  readonly spec: Signal<DashboardComponentSpecFor<ClassT>>;
}

/** Zod schema for validating any DashboardComponent definition */
export const DASHBOARD_COMPONENT_ANY_DEF = z
  .object({
    type: z.string(),
  })
  .passthrough();

/** Retrieves the definition from a given DashboardComponent class */
export function defFor(cls: DashboardComponentAnyClass): DashboardComponentAnyDef {
  return cls.def;
}

/** Retrieves the type from a given DashboardComponent class */
export function typeFor(cls: DashboardComponentAnyClass): string {
  return defFor(cls).shape.type.value;
}

/** Validates the given specification against the definition of a DashboardComponent class */
export function validateSpec(
  cls: DashboardComponentAnyClass,
  spec: DashboardComponentAnySpec,
): DashboardComponentAnySpec {
  return defFor(cls).parse(spec);
}

/** Safely validates the given specification against the definition of a DashboardComponent class */
export function safeValidateSpec(
  cls: DashboardComponentAnyClass,
  spec: DashboardComponentAnySpec,
): SafeParseReturnType<DashboardComponentAnySpec, DashboardComponentAnySpec> {
  return defFor(cls).safeParse(spec);
}
