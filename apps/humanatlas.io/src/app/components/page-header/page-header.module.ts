import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from './page-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [PageHeaderComponent],
  imports: [BrowserModule, MatCardModule],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
