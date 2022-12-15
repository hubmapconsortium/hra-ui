import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CellPopulationGraphsComponent } from './cell-population-graphs.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { UseButtonModule } from 'src/app/components/use-button/use-button.module';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';


@NgModule({
  declarations: [
    CellPopulationGraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    UseButtonModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class CellPopulationGraphsModule { }
