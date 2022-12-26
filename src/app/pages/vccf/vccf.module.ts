import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { VccfComponent } from './vccf.component';

@NgModule({
  declarations: [
    VccfComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    AnnouncementCardModule

  ],
  providers: [],
  bootstrap: []
})
export class VccfModule { }
