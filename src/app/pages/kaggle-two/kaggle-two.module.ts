import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { KaggleTwoComponent } from './kaggle-two.component';
import { MatCardModule } from '@angular/material/card';
import { PrizeCardModule } from '../../components/prize-card/prize-card.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { YoutubeModelModule } from 'src/app/components/youtube-model/youtube-model.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';

@NgModule({
    declarations: [
        KaggleTwoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PageHeaderModule,
        PageDataModule,
        MatCardModule,
        PrizeCardModule,
        AnnouncementCardModule,
        YoutubeModelModule,
        PageRendererModule
    ],
    providers: [],
    bootstrap: []
})
export class KaggleTwoModule { }
