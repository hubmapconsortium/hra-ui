import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

const REEXPORTS = [NotFoundPageComponent];

/**
 * Error Pages Module - Contains components for displaying error pages
 */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class ErrorPagesModule {}
