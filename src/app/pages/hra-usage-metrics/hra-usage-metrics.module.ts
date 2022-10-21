import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { HraUsageMetricsComponent } from './hra-usage-metrics.component';

@NgModule({
  declarations: [
    HraUsageMetricsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule
  ],
  providers: [],
  bootstrap: []
})
export class HraUsageMetricsModule { }
