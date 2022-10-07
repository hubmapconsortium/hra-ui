import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TissueInfoPageComponent } from './tissue-info-page.component';
import { TissueInfoTableModule } from 'src/app/components/tissue-info-table/tissue-info.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';

@NgModule({
  declarations: [
    TissueInfoPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TissueInfoTableModule,
    PageDataModule
  ],
  providers: [],
  bootstrap: [TissueInfoPageComponent]
})
export class TissueInfoPageModule { }
