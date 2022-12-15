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
        AnnouncementCardModule
    ],
    providers: [],
    bootstrap: []
})
export class KaggleTwoModule { }
