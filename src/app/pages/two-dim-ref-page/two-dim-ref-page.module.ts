import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TwoDimRefPageComponent } from './two-dim-ref-page.component';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { SopLinksModule } from '../../components/sop-links/sop-links.module'
import { OrganTabsModule } from '../../components/organ-tabs/organ-tabs.module';
import { TwoDimImageModule } from '../../components/two-dim-image/two-dim-image.module';
import { ChooseVersionModule } from '../../components/choose-version/choose-version.module';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { TableModule } from 'src/app/components/table/table.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TwoDimRefPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    SopLinksModule,
    OrganTabsModule,
    TwoDimImageModule,
    ChooseVersionModule,
    AnnouncementCardModule,
    TableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: []
})
export class TwoDimRefPageModule { }
