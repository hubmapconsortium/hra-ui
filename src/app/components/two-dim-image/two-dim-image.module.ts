
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TwoDimImageComponent } from './two-dim-image.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [TwoDimImageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    exports: [TwoDimImageComponent]
})

export class TwoDimImageModule { }