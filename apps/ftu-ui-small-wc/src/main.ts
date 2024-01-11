import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, createApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { FTU_DATA_IMPL_ENDPOINTS, HraServiceModule } from '@hra-ui/services';
import { HraStateModule } from '@hra-ui/state';
import { ThemingModule } from '@hra-ui/theming';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { initFactory } from './app/app.init';
import { NavigationLessRouter } from './app/routing/simple-router.service';
import { ReplaySubject } from 'rxjs';

(async () => {
  const app = await createApplication({
    providers: [
      importProvidersFrom(
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatIconModule,

        InlineSVGModule.forRoot(),
        MarkdownModule.forRoot({
          loader: HttpClient,
        }),
        NgxsModule.forRoot(),

        ThemingModule,
        CdkStateModule,
        HraServiceModule,
        HraStateModule,
      ),
      {
        provide: APP_INITIALIZER,
        useFactory: initFactory,
        multi: true,
      },
      {
        // Replace full routing with a partial implementation
        provide: Router,
        useExisting: NavigationLessRouter,
      },
      {
        provide: FTU_DATA_IMPL_ENDPOINTS,
        useValue: new ReplaySubject(1),
      },
    ],
  });

  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('ftu-hra-small-wc', element);
})();
