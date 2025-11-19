import { Directive, inject, input, TemplateRef } from '@angular/core';

/** Gallery grid item context */
export interface GalleryGridItemContext<T> {
  /** Item data */
  $implicit: T;
  /** Item index */
  index: number;
}

/** Gallery grid item directive */
@Directive({
  selector: '[hraGalleryGridItem]',
  standalone: true,
})
export class GalleryGridItemDirective<T> {
  /** Data source reference */
  readonly hraGalleryGridItemOf = input<T[]>();

  /** Template reference */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly templateRef = inject<TemplateRef<GalleryGridItemContext<T>>>(TemplateRef as any);

  /** Type guard for template type checking */
  static ngTemplateContextGuard<T>(dir: GalleryGridItemDirective<T>, ctx: unknown): ctx is GalleryGridItemContext<T> {
    return true;
  }
}
