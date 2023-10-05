import { ChooseVersionComponent } from './choose-version.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ChooseVersionComponent],
  imports: [BrowserModule, MatSelectModule, MatFormFieldModule],
  exports: [ChooseVersionComponent],
})
export class ChooseVersionModule {}
