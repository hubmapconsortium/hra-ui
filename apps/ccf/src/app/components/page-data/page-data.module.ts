import { MarkdownModule } from 'ngx-markdown';
import { PageDataComponent } from './page-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

@NgModule({
  declarations: [PageDataComponent],
  imports: [BrowserModule, MarkdownModule],
  exports: [PageDataComponent],
})
export class PageDataModule {}
