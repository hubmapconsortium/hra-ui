import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

/**
 * Error Pages Module - Contains components for displaying error pages
 */
@NgModule({
  imports: [NotFoundPageComponent],
  exports: [NotFoundPageComponent],
})
export class ErrorPagesModule {}
