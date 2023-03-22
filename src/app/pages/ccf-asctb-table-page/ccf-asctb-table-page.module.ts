import { TableModule } from '../../components/table/table.module';
import { ChooseVersionModule } from '../../components/choose-version/choose-version.module';
import { SopLinksModule } from '../../components/sop-links/sop-links.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { BottomToolbarModule } from '../../components/bottom-toolbar/bottom-toolbar.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CcfTablePageComponent } from './ccf-asctb-table-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { UseButtonModule } from 'src/app/components/use-button/use-button.module';

@NgModule({
  declarations: [
    CcfTablePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    BottomToolbarModule,
    PageDataModule,
    SopLinksModule,
    ChooseVersionModule,
    TableModule,
    MarkdownModule,
    AnnouncementCardModule,
    UseButtonModule
  ],
  providers: [],
  bootstrap: []
})
export class CcfTablePageModule { }
