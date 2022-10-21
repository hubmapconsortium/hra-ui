import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HraSopComponent } from './hra-sop.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { TableModule } from 'src/app/components/table/table.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';

@NgModule({
  declarations: [
    HraSopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    TableModule,
    PageDataModule
  ],
  providers: [],
  bootstrap: []
})
export class HraSopModule { }
