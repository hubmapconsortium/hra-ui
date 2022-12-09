import { MarkdownModule } from 'ngx-markdown';
import { PageDataComponent } from './page-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

@NgModule({
    declarations: [PageDataComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MarkdownModule
    ],
    exports: [PageDataComponent]
})

export class PageDataModule { }