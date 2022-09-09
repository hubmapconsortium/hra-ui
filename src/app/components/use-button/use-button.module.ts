
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UseButtonComponent } from './use-button.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [UseButtonComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule
    ],
    exports: [UseButtonComponent]
})

export class UseButtonModule{}