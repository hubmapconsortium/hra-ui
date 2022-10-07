import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { OmapsComponent } from './omaps.component';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { SopLinksModule } from 'src/app/components/sop-links/sop-links.module';
import { TableModule } from 'src/app/components/table/table.module';
import { ChooseVersionModule } from 'src/app/components/choose-version/choose-version.module';

@NgModule({
  declarations: [
    OmapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    SopLinksModule,
    TableModule,
    ChooseVersionModule
  ],
  providers: [],
  bootstrap: [OmapsComponent]
})
export class OmapsModule { }
