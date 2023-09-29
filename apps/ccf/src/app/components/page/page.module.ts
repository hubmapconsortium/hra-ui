import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { PageRendererModule } from '../page-renderer/page-renderer.module';

@NgModule({
  declarations: [PageComponent],
  imports: [BrowserModule, PageRendererModule],
  exports: [PageComponent],
})
export class PageModule {}
