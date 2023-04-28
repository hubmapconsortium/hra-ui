import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { UseButtonModule } from '../../components/use-button/use-button.module';
import { OmapFaqComponent } from './omap-faq.component';

@NgModule({
  declarations: [
    OmapFaqComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    UseButtonModule,
    PageRendererModule
  ],
  providers: [],
  bootstrap: []
})
export class OmapFaqModule { }
