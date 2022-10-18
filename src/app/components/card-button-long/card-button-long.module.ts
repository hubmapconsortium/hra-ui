import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CardButtonLongComponent } from './card-button-long.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [CardButtonLongComponent],
    imports: [
        BrowserModule,
        MatCardModule,
        MatRippleModule,
        MatIconModule
    ],
    exports: [
        CardButtonLongComponent
    ]
})

export class CardButtonLongModule { }