import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverviewTrainingOutreachComponent } from './overview-training-outreach.component';
import { CardButtonLongModule } from 'src/app/components/card-button-long/card-button-long.module';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';


@NgModule({
  declarations: [
    OverviewTrainingOutreachComponent
  ],
  imports: [
    BrowserModule,
    SimpleTileModule,
    CardButtonLongModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class OverviewTrainingOutreachModule { }
