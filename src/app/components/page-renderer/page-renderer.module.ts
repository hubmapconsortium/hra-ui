import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageRendererComponent } from './page-renderer.component';
import { PageElementModule } from '../page-element/page-element.module';
@NgModule({
    declarations: [PageRendererComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PageElementModule
    ],
    exports: [PageRendererComponent]
})

export class PageRendererModule { }