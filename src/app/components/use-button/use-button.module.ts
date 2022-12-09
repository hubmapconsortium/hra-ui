
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UseButtonComponent } from './use-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [UseButtonComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        RouterModule
    ],
    exports: [UseButtonComponent]
})

export class UseButtonModule { }