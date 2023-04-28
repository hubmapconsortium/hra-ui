import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CellPopulationGraphsComponent } from './cell-population-graphs.component';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { UseButtonModule } from '../../components/use-button/use-button.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';


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
    AnnouncementCardModule,
    PageRendererModule
  ],
  providers: [],
  bootstrap: []
})
export class CellPopulationGraphsModule { }
