import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { AboutComponent } from './about.component';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class AboutModule { }
