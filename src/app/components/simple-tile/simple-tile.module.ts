import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SimpleTileComponent } from "./simple-tile.component";
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';
@NgModule({
    declarations: [SimpleTileComponent],
    imports: [
        MatCardModule,
        BrowserModule,
        MarkdownModule.forRoot()
    ],
    exports: [SimpleTileComponent]
})

export class SimpleTileModule { }