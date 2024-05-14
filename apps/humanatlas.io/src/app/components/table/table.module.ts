import { TableComponent } from './table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [TableComponent],
  imports: [BrowserModule, MatTableModule, MatSortModule],
  exports: [TableComponent],
})
export class TableModule {}
