import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganComponent } from './organ.component';

import { BodyUiModule } from 'ccf-shared';
import { provideDesignSystem } from '@hra-ui/design-system';

@NgModule({
  declarations: [OrganComponent],
  imports: [CommonModule, BodyUiModule],
  exports: [OrganComponent],
  providers: [provideDesignSystem()],
})
export class OrganModule {}
