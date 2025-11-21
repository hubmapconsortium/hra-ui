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
  readonly templateRef = inject(TemplateRef<GalleryGridItemContext<T>>);

  /** Type guard for template type checking */
  static ngTemplateContextGuard<T>(dir: GalleryGridItemDirective<T>, ctx: unknown): ctx is GalleryGridItemContext<T> {
    return true;
  }
}
