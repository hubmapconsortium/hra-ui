import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SectionCardComponent } from "./section-card.component";
@NgModule({
    declarations: [SectionCardComponent],
    imports: [
        MatCardModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [SectionCardComponent]
})

export class SectionCardModule { }