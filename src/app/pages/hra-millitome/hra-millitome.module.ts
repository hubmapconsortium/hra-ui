import { TableModule } from '../../components/table/table.module';
import { ChooseVersionModule } from '../../components/choose-version/choose-version.module';
import { SopLinksModule } from 'src/app/components/sop-links/sop-links.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { BottomToolbarModule } from '../../components/bottom-toolbar/bottom-toolbar.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { HraMillitomeComponent } from './hra-millitome.component';


@NgModule({
  declarations: [
    HraMillitomeComponent
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
    MarkdownModule
  ],
  providers: [],
  bootstrap: []
})
export class HraMillitomeModule { }
