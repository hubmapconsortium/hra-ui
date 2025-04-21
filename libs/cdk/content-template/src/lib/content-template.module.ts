import { NgModule } from '@angular/core';
import { ContentTemplateOutletDirective } from './content-template.directive';

/** Content template module */
@NgModule({
  imports: [ContentTemplateOutletDirective],
  exports: [ContentTemplateOutletDirective],
})
export class ContentTemplateModule {}
