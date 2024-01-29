import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomToolbarModule } from './components/bottom-toolbar/bottom-toolbar.module';
import { PageRendererModule } from './components/page-renderer/page-renderer.module';
import { PageModule } from './components/page/page.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { TissueInfoPageModule } from './pages/tissue-info-page/tissue-info-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { gfmHeadingId } from 'marked-gfm-heading-id';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ToolbarModule,
    BottomToolbarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TissueInfoPageModule,
    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsToken),
    NgxGoogleAnalyticsRouterModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
      markedExtensions: [gfmHeadingId()],
    }),
    PageRendererModule,
    PageModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
