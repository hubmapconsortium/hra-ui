import { NgModule } from '@angular/core';
import { AppLabelComponent } from '@hra-ui/design-system/content-templates/app-label';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { UiSectionComponent } from '@hra-ui/design-system/content-templates/ui-section';

@NgModule({
  imports: [UiSectionComponent, AppLabelComponent, PageSectionComponent],
  declarations: [],
  exports: [UiSectionComponent, AppLabelComponent, PageSectionComponent],
})
export class ContentTemplatesModule {}
