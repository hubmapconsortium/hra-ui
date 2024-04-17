import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TissueInfoPageComponent } from './tissue-info-page.component';
import { TissueInfoTableModule } from '../../components/tissue-info-table/tissue-info-table.module';
import { PageDataModule } from '../../components/page-data/page-data.module';

@NgModule({
  declarations: [TissueInfoPageComponent],
  imports: [BrowserModule, TissueInfoTableModule, PageDataModule],
  providers: [],
  bootstrap: [],
})
export class TissueInfoPageModule {}
