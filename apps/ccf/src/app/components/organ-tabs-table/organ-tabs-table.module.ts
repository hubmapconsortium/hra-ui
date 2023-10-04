import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OrganTabsTableComponent } from './organ-tabs-table.component';

@NgModule({
  declarations: [OrganTabsTableComponent],
  imports: [BrowserModule],
  exports: [OrganTabsTableComponent],
})
export class OrganTabsTableModule {}
