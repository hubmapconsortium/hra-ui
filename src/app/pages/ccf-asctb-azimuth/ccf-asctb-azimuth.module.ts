import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CcfAsctbAzimuthComponent } from './ccf-asctb-azimuth.component';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { TableModule } from '../../components/table/table.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';

@NgModule({
  declarations: [
    CcfAsctbAzimuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    TableModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class CcfAsctbAzimuthModule { }
