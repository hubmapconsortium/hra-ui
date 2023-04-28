import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { OmapsComponent } from './omaps.component';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { SopLinksModule } from '../../components/sop-links/sop-links.module';
import { TableModule } from '../../components/table/table.module';
import { ChooseVersionModule } from '../../components/choose-version/choose-version.module';
import { RouterModule } from '@angular/router';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';
import { TableVersionModule } from 'src/app/components/table-version/table-version.module';

@NgModule({
  declarations: [
    OmapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    SopLinksModule,
    TableModule,
    ChooseVersionModule,
    RouterModule,
    AnnouncementCardModule,
    PageRendererModule,
    TableVersionModule
  ],
  providers: [],
  bootstrap: []
})
export class OmapsModule { }
