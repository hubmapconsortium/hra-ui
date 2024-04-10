import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { PageDataComponent } from './page-data.component';

@NgModule({
  declarations: [PageDataComponent],
  imports: [BrowserModule, MarkdownModule],
  exports: [PageDataComponent],
})
export class PageDataModule {}
