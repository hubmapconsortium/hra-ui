import { Type } from '@angular/core';
import { AnyContentTemplateSpec } from './content-template.schema';

/** A content template definition */
export interface ContentTemplateDef<T> {
  /** Component class */
  component: Type<T>;
  /** Data spec */
  spec: AnyContentTemplateSpec;
}

/** Any content template defination */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyContentTemplateDef = ContentTemplateDef<any>;
