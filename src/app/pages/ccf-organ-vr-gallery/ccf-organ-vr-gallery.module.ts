import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { YoutubeModelModule } from 'src/app/components/youtube-model/youtube-model.module';
import { CcfOrganVrGalleryComponent } from './ccf-organ-vr-gallery.component';


@NgModule({
  declarations: [
    CcfOrganVrGalleryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    YoutubeModelModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class CcfOrganVrGalleryModule { }
