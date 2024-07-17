import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MarkdownModule } from 'ngx-markdown';
import { withNgxsResetPlugin } from 'ngxs-reset-plugin';

import { environment } from '../environments/environment';
import { ConfigService } from './app-config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadModule } from './components/file-upload/file-upload.module';
import { FooterModule } from './components/footer/footer.module';
import { HomeModule } from './components/home/home.module';
import { OrganTableSelectorModule } from './components/organ-table-selector/organ-table-selector.module';
import { TrackingPopupModule } from './components/tracking-popup/tracking-popup.module';
import { DocsModule } from './modules/docs/docs.module';
import { RootModule } from './modules/root/root.module';
import { AnalyticsModule } from './services/analytics.module';
import { MousePositionTrackerModule } from './services/mouse-position-tracker.module';
import { LogsState } from './store/logs.state';
import { SheetState } from './store/sheet.state';
import { TreeState } from './store/tree.state';
import { UIState } from './store/ui.state';

export function initializeApp(configService: ConfigService): () => Promise<void> {
  return () =>
    Promise.all([configService.sheetConfiguration$.toPromise(), configService.config$.toPromise()]).then(
      () => undefined,
    );
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot([SheetState, TreeState, UIState, LogsState]),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    MarkdownModule.forRoot(),
    DocsModule,
    RootModule,
    HomeModule,
    FileUploadModule,
    OrganTableSelectorModule,
    FooterModule,
    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsId,
      appName: 'reporter',
    }),
    TrackingPopupModule,
    MousePositionTrackerModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    withNgxsResetPlugin(),
  ],
})
export class AppModule {}
