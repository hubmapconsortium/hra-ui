import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContactCardComponent } from './contact-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [ContactCardComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule
    ],
    exports: [ContactCardComponent]
})

export class ContactCardModule { }