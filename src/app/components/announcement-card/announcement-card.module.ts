import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { AnnouncementCardComponent } from './announcement-card.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [AnnouncementCardComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MarkdownModule.forChild(),
        MatCardModule,
        RouterModule
    ],
    exports: [
        AnnouncementCardComponent
    ]
})

export class AnnouncementCardModule { }