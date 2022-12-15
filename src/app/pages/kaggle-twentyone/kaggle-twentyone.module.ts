import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { KaggleTwentyoneComponent } from './kaggle-twentyone.component';
import { MatCardModule } from '@angular/material/card';
import { PrizeCardModule } from 'src/app/components/prize-card/prize-card.module';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';

@NgModule({
    declarations: [
        KaggleTwentyoneComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PageHeaderModule,
        PageDataModule,
        MatCardModule,
        PrizeCardModule,
        AnnouncementCardModule
    ],
    providers: [],
    bootstrap: []
})
export class KaggleTwentyoneModule { }
