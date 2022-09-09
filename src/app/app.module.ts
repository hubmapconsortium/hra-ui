import { PageDataModule } from './components/page-data/page-data.module';
import { CcfTablePageModule } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.module';
import { PageHeaderModule } from './components/page-header/page-header.module';
import { AppRoutingModule } from './app-routing.module';
import { OverviewDataModule } from './pages/overview-data/overview-data.module';
import { BottomToolbarModule } from './components/bottom-toolbar/bottom-toolbar.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { LandingPageModule } from './pages/landing-page/landing-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TableDataService } from './services/table-data/tabledata.service';
import { HttpClientModule } from '@angular/common/http';
import { TwoDimRefPageModule } from './pages/two-dim-ref-page/two-dim-ref-page.module';
import { CcfOntologyModule } from './pages/ccf-ontology/ccf-ontology.module';
import { OverviewToolsModule } from './pages/overview-tools/overview-tools.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    LandingPageModule,
    BottomToolbarModule,
    PageHeaderModule,
    OverviewDataModule,
    CcfTablePageModule,
    PageDataModule,
    AppRoutingModule,
    HttpClientModule,
    TwoDimRefPageModule,
    CcfOntologyModule,
    OverviewToolsModule
  ],
  providers: [TableDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
