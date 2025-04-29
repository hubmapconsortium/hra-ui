import { NgModule } from '@angular/core';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { UiSectionComponent } from '@hra-ui/design-system/content-templates/ui-section';

@NgModule({
  declarations: [],
  imports: [UiSectionComponent, PageSectionComponent],
  exports: [UiSectionComponent, PageSectionComponent],
})
export class ContentTemplatesModule {}
