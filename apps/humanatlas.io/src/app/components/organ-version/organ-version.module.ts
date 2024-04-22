import { NgModule } from '@angular/core';
import { ChooseVersionModule } from '../choose-version/choose-version.module';
import { CommonModule } from '@angular/common';
import { OrganVersionComponent } from './organ-version.component';
import { OrganTabsModule } from '../organ-tabs/organ-tabs.module';
import { TwoDimImageModule } from '../two-dim-image/two-dim-image.module';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [OrganVersionComponent],
  imports: [CommonModule, ChooseVersionModule, OrganTabsModule, TwoDimImageModule, TableModule],
  exports: [OrganVersionComponent],
})
export class OrganVersionModule {}
