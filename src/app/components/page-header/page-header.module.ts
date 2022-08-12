import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from './page-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [PageHeaderComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule
    ],
    exports: [PageHeaderComponent]
})

export class PageHeaderModule{}