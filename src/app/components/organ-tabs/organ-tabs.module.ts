import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrganTabsComponent } from './organ-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
    declarations: [OrganTabsComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule
    ],
    exports: [OrganTabsComponent]
})

export class OrganTabsModule{}