import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { HeaderBehaviorComponent, TissueLibraryBehaviorComponent } from '@hra-ui/components/behavioral';
import { FTU_DATA_IMPL_ENDPOINTS, HraServiceModule } from '@hra-ui/services';
import { HraStateModule, MouseTrackerModule } from '@hra-ui/state';
import { ThemingModule } from '@hra-ui/theming';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { ReplaySubject } from 'rxjs';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    InlineSVGModule.forRoot(),
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    NgxsModule.forRoot(),
    ThemingModule,
    AppRoutingModule,
    CdkStateModule,
    HraServiceModule,
    HraStateModule.forRoot({
      googleAnalyticsToken: environment.googleAnalyticsToken,
    }),
    HeaderBehaviorComponent,
    TissueLibraryBehaviorComponent,
    MouseTrackerModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: new ReplaySubject(1),
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideNothrowPlatformLocation(),
  ],
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap(): void {
    const FtuWebComponent = createCustomElement(AppComponent, {
      injector: this.injector,
    });

    customElements.define('hra-ftu-ui', FtuWebComponent);
  }
}
