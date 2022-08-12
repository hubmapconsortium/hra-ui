import { NavbarComponent } from './../navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    declarations: [
        ToolbarComponent,
        NavbarComponent],
    imports: [
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatDividerModule
    ],
    exports: [
        ToolbarComponent
    ]
})

export class ToolbarModule { }