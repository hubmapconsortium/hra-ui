import { Type } from '@angular/core';
import { AnyContentTemplateSpec } from './content-template.schema';

/** A content template definition */
export interface ContentTemplateDef<T> {
  /** Component class */
  component: Type<T>;
  /** Data spec */
  spec: AnyContentTemplateSpec;
  /** Mapping from ng-content selector to property to project as content */
  projectedProperties?: Record<string, string>;
}

/** Any content template defination */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyContentTemplateDef = ContentTemplateDef<any>;
