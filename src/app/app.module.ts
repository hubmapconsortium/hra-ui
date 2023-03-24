import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementCardModule } from './components/announcement-card/announcement-card.module';
import { BottomToolbarModule } from './components/bottom-toolbar/bottom-toolbar.module';
import { CountInfoCardModule } from './components/count-info-card/count-info-card.module';
import { MenuTreeModule } from './components/menu-tree/menu-tree.module';
import { PageDataModule } from './components/page-data/page-data.module';
import { PageHeaderModule } from './components/page-header/page-header.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { YoutubeModelModule } from './components/youtube-model/youtube-model.module';
import { AboutModule } from './pages/about/about.module';
import { CcfAsctbAzimuthModule } from './pages/ccf-asctb-azimuth/ccf-asctb-azimuth.module';
import { CcfReporterPageModule } from './pages/ccf-asctb-reporter-page/ccf-asctb-reporter-page.module';
import { CcfTablePageModule } from './pages/ccf-asctb-table-page/ccf-asctb-table-page.module';
import { CcfExplorationUserInterfaceModule } from './pages/ccf-exploration-user-interface/ccf-exploration-user-interface.module';
import { CcfOntologyModule } from './pages/ccf-ontology/ccf-ontology.module';
import { CcfOrganVrGalleryModule } from './pages/ccf-organ-vr-gallery/ccf-organ-vr-gallery.module';
import { CellPopulationGraphsModule } from './pages/cell-population-graphs/cell-population-graphs.module';
import { FourthReleaseNotesModule } from './pages/fourth-release-notes/fourth-release-notes.module';
import { HraApiModule } from './pages/hra-api/hra-api.module';
import { HraEditorialBoardModule } from './pages/hra-editorial-board/hra-editorial-board.module';
import { HraMillitomeModule } from './pages/hra-millitome/hra-millitome.module';
import { HraSopModule } from './pages/hra-sop/hra-sop.module';
import { HraUsageMetricsModule } from './pages/hra-usage-metrics/hra-usage-metrics.module';
import { KaggleTwentyoneModule } from './pages/kaggle-twentyone/kaggle-twentyone.module';
import { KaggleTwoModule } from './pages/kaggle-two/kaggle-two.module';
import { LandingPageModule } from './pages/landing-page/landing-page.module';
import { OmapFaqModule } from './pages/omap-faq/omap-faq.module';
import { OmapsModule } from './pages/omaps/omaps.module';
import { OverviewDataModule } from './pages/overview-data/overview-data.module';
import { OverviewToolsModule } from './pages/overview-tools/overview-tools.module';
import { OverviewTrainingOutreachModule } from './pages/overview-training-outreach/overview-training-outreach.module';
import { RegistrationUserInterfaceModule } from './pages/registration-user-interface/registration-user-interface.module';
import { ThreeDimRefPageModule } from './pages/three-dim-ref-page/three-dim-ref-page.module';
import { TissueInfoPageModule } from './pages/tissue-info-page/tissue-info-page.module';
import { TwoDimRefPageModule } from './pages/two-dim-ref-page/two-dim-ref-page.module';
import { VccfModule } from './pages/vccf/vccf.module';


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
    CcfReporterPageModule,
    YoutubeModelModule,
    HraMillitomeModule,
    CcfExplorationUserInterfaceModule,
    RegistrationUserInterfaceModule,
    YoutubeModelModule,
    CellPopulationGraphsModule,
    HraApiModule,
    AboutModule,
    OverviewTrainingOutreachModule,
    TissueInfoPageModule,
    HraSopModule,
    OmapsModule,
    ThreeDimRefPageModule,
    CcfAsctbAzimuthModule,
    HraUsageMetricsModule,
    KaggleTwentyoneModule,
    KaggleTwoModule,
    HraEditorialBoardModule,
    CcfOrganVrGalleryModule,
    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsToken),
    NgxGoogleAnalyticsRouterModule,
    OmapFaqModule,
    FourthReleaseNotesModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    AnnouncementCardModule,
    VccfModule,
    CountInfoCardModule,
    MenuTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
