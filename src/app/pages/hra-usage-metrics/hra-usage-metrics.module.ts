import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { HraUsageMetricsComponent } from './hra-usage-metrics.component';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';

@NgModule({
  declarations: [
    HraUsageMetricsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class HraUsageMetricsModule { }
