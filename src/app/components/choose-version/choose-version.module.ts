import { ChooseVersionComponent } from './choose-version.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
    declarations: [ChooseVersionComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    exports: [ChooseVersionComponent]
})

export class ChooseVersionModule { }