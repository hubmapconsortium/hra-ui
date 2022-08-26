import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TwoDimRefPageComponent } from './two-dim-ref-page.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { SopLinksModule } from 'src/app/components/sop-links/sop-links.module';

@NgModule({
  declarations: [
    TwoDimRefPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    SopLinksModule
  ],
  providers: [],
  bootstrap: [TwoDimRefPageComponent]
})
export class TwoDimRefPageModule { }
