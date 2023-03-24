import { NavbarComponent } from './../navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MenuTreeModule } from '../menu-tree/menu-tree.module';


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
        MatDividerModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterModule,
        MenuTreeModule
    ],
    exports: [
        ToolbarComponent
    ]
})

export class ToolbarModule { }