import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TwoDimRefPageComponent } from './two-dim-ref-page.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { SopLinksModule } from 'src/app/components/sop-links/sop-links.module'
import { OrganTabsModule } from 'src/app/components/organ-tabs/organ-tabs.module';
import { TwoDimImageModule } from 'src/app/components/two-dim-image/two-dim-image.module';

@NgModule({
  declarations: [
    TwoDimRefPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    SopLinksModule,
    OrganTabsModule,
    TwoDimImageModule

  ],
  providers: [],
  bootstrap: [TwoDimRefPageComponent]
})
export class TwoDimRefPageModule { }
