import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverviewTrainingOutreachComponent } from './overview-training-outreach.component';
import { CardButtonLongModule } from 'src/app/components/card-button-long/card-button-long.module';


@NgModule({
  declarations: [
    OverviewTrainingOutreachComponent
  ],
  imports: [
    BrowserModule,
    SimpleTileModule,
    CardButtonLongModule
  ],
  providers: [],
  bootstrap: [OverviewTrainingOutreachComponent]
})
export class OverviewTrainingOutreachModule { }
