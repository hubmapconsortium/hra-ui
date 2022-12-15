import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { YoutubeModelModule } from '../../components/youtube-model/youtube-model.module';
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
