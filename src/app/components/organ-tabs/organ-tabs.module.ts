import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrganTabsComponent } from './organ-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
    declarations: [OrganTabsComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    exports: [OrganTabsComponent]
})

export class OrganTabsModule { }