import { NgModule } from '@angular/core';
import { TableVersionComponent } from './table-version.component';
import { ChooseVersionModule } from '../choose-version/choose-version.module';
import { TableModule } from '../table/table.module';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';


@NgModule({
    declarations: [TableVersionComponent],
    imports: [
        CommonModule,
        CdkScrollableModule,
        ChooseVersionModule,
        TableModule
    ],
    exports: [TableVersionComponent]
})

export class TableVersionModule { }