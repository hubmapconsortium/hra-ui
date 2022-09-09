import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SimpleImageComponent } from './simple-image.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [SimpleImageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MarkdownModule.forChild()
    ],
    exports: [SimpleImageComponent]
})

export class SimpleImageModule { }