import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CcfAsctbAzimuthComponent } from './ccf-asctb-azimuth.component';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [
    CcfAsctbAzimuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    TableModule
  ],
  providers: [],
  bootstrap: []
})
export class CcfAsctbAzimuthModule { }
