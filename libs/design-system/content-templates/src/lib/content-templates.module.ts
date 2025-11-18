import { NgModule } from '@angular/core';
import { AppLabelComponent } from '@hra-ui/design-system/content-templates/app-label';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { UiSectionComponent } from '@hra-ui/design-system/content-templates/ui-section';

@NgModule({
  declarations: [],
  imports: [UiSectionComponent, AppLabelComponent, PageSectionComponent],
  exports: [UiSectionComponent, AppLabelComponent, PageSectionComponent],
})
export class ContentTemplatesModule {}
