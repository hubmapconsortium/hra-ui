import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { KaggleTwoComponent } from './kaggle-two.component';

@NgModule({
    declarations: [
        KaggleTwoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PageHeaderModule,
        PageDataModule
    ],
    providers: [],
    bootstrap: []
})
export class KaggleTwoModule { }
