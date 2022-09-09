import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { OverviewToolsComponent } from './overview-tools.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardButtonLongModule } from 'src/app/components/card-button-long/card-button-long.module';


@NgModule({
  declarations: [
    OverviewToolsComponent
  ],
  imports: [
    BrowserModule,
    SimpleTileModule,
    CardButtonLongModule
  ],
  providers: [],
  bootstrap: [OverviewToolsComponent]
})
export class OverviewToolsModule { }
