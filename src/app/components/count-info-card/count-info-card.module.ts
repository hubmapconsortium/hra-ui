import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CountInfoCardComponent } from './count-info-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [CountInfoCardComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule
    ],
    exports: [CountInfoCardComponent]
})

export class CountInfoCardModule { }