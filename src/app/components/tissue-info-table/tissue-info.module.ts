
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TissueInfoTableComponent } from './tissue-info-table.component';
import { MatTableModule } from '@angular/material/table';
import { MarkdownModule } from 'ngx-markdown';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations: [TissueInfoTableComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MarkdownModule.forChild()
    ],
    exports: [TissueInfoTableComponent]
})

export class TissueInfoTableModule { }