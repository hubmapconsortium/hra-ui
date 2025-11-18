import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { RedirectPageComponent } from '@hra-ui/design-system/error-pages/redirect-page';

/**
 * Error Pages Module - Contains components for displaying error pages
 */
@NgModule({
  imports: [NotFoundPageComponent, RedirectPageComponent],
  exports: [NotFoundPageComponent, RedirectPageComponent],
})
export class ErrorPagesModule {}
