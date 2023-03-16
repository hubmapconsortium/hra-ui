import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuTreeComponent } from './menu-tree.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [MenuTreeComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CdkTreeModule,
        MatIconModule,
        OverlayModule,
        MatButtonModule,
        MatTreeModule,
        RouterModule,
        MatDividerModule,
        ScrollingModule
    ],
    exports: [MenuTreeComponent]
})

export class MenuTreeModule { }