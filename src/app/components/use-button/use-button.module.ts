
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UseButtonComponent } from './use-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [UseButtonComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        RouterModule,
        MatIconModule
    ],
    exports: [UseButtonComponent]
})

export class UseButtonModule { }