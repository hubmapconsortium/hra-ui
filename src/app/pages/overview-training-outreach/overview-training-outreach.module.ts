import { SimpleTileModule } from './../../components/simple-tile/simple-tile.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverviewTrainingOutreachComponent } from './overview-training-outreach.component';
import { CardButtonLongModule } from '../../components/card-button-long/card-button-long.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { CardWithHeaderModule } from 'src/app/components/card-with-header/card-with-header.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';


@NgModule({
  declarations: [
    OverviewTrainingOutreachComponent
  ],
  imports: [
    BrowserModule,
    SimpleTileModule,
    CardButtonLongModule,
    AnnouncementCardModule,
    CardWithHeaderModule,
    PageRendererModule
  ],
  providers: [],
  bootstrap: []
})
export class OverviewTrainingOutreachModule { }
