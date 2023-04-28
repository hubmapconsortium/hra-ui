import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableVersionComponent } from './table-version.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ChooseVersionModule } from '../choose-version/choose-version.module';
import { TableModule } from '../table/table.module';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [TableVersionComponent],
    imports: [
        CommonModule,
        ChooseVersionModule,
        TableModule
    ],
    exports: [TableVersionComponent]
})

export class TableVersionModule { }