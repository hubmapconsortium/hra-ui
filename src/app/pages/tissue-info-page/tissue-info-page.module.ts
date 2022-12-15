import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TissueInfoPageComponent } from './tissue-info-page.component';
import { TissueInfoTableModule } from '../../components/tissue-info-table/tissue-info.module';
import { PageDataModule } from '../../components/page-data/page-data.module';

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
  bootstrap: []
})
export class TissueInfoPageModule { }
