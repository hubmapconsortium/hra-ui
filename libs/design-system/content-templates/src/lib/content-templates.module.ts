import { NgModule } from '@angular/core';
import { AppLabelComponent } from '@hra-ui/design-system/content-templates/app-label';
import { UiSectionComponent } from '@hra-ui/design-system/content-templates/ui-section';

@NgModule({
  declarations: [],
  imports: [UiSectionComponent, AppLabelComponent],
  exports: [UiSectionComponent, AppLabelComponent],
})
export class ContentTemplatesModule {}
