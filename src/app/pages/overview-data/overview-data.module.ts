import { CardButtonLongModule } from './../../components/card-button-long/card-button-long.module';
import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { OverviewDataComponent } from './overview-data.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    OverviewDataComponent
  ],
  imports: [
    BrowserModule,
    SimpleTileModule,
    CardButtonLongModule
  ],
  providers: [],
  bootstrap: [OverviewDataComponent]
})
export class OverviewDataModule { }
