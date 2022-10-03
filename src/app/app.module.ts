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
import { CellPopulationGraphsModule } from './pages/cell-population-graphs/cell-population-graphs.module';
import { HraApiModule } from './pages/hra-api/hra-api.module';
import { AboutModule } from './pages/about/about.module';
import { OverviewTrainingOutreachModule } from './pages/overview-training-outreach/overview-training-outreach.module';
import { TissueInfoPageModule } from './pages/tissue-info-page/tissue-info-page.module';
import { HraSopModule } from './pages/hra-sop/hra-sop.module';
import { OmapsModule } from './pages/omaps/omaps.module';
import { ThreeDimRefPageModule } from './pages/three-dim-ref-page/three-dim-ref-page.module';

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
    OverviewToolsModule,
    CellPopulationGraphsModule,
    HraApiModule,
    AboutModule,
    OverviewTrainingOutreachModule,
    TissueInfoPageModule,
    HraSopModule,
    OmapsModule,
    ThreeDimRefPageModule
  ],
  providers: [TableDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
