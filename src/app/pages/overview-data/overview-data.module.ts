import { CardButtonLongModule } from './../../components/card-button-long/card-button-long.module';
import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { OverviewDataComponent } from './overview-data.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';


@NgModule({
  declarations: [
    OverviewDataComponent
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
export class OverviewDataModule { }
