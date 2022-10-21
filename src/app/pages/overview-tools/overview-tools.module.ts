import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { OverviewToolsComponent } from './overview-tools.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardButtonLongModule } from 'src/app/components/card-button-long/card-button-long.module';
import { TissueInfoTableModule } from 'src/app/components/tissue-info-table/tissue-info.module';


@NgModule({
  declarations: [
    OverviewToolsComponent
  ],
  imports: [
    BrowserModule,
    SimpleTileModule,
    CardButtonLongModule,
    TissueInfoTableModule
  ],
  providers: [],
  bootstrap: []
})
export class OverviewToolsModule { }
