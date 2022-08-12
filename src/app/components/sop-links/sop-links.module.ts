import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SopLinksComponent } from './sop-links.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [SopLinksComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule
    ],
    exports: [SopLinksComponent]
})

export class SopLinksModule{}