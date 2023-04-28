import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { HraUsageMetricsComponent } from './hra-usage-metrics.component';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';

@NgModule({
  declarations: [
    HraUsageMetricsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    AnnouncementCardModule,
    PageRendererModule
  ],
  providers: [],
  bootstrap: []
})
export class HraUsageMetricsModule { }
