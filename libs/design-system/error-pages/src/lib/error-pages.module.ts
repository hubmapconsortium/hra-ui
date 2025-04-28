import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

const REEXPORTS = [NotFoundPageComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class ErrorPagesModule {}
