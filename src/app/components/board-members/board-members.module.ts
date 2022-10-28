import { NgModule } from '@angular/core';
import { BoardMembersComponent } from './board-members.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
    declarations: [BoardMembersComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MarkdownModule.forChild()
    ],
    exports: [
        BoardMembersComponent
    ]
})

export class BoardMembersModule { }