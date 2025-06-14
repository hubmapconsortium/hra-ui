import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, provideAppInitializer } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { FTU_DATA_IMPL_ENDPOINTS, HraServiceModule } from '@hra-ui/services';
import { HraStateModule } from '@hra-ui/state';
import { ThemingModule } from '@hra-ui/theming';
import { createCustomElement } from '@hra-ui/webcomponents';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { ReplaySubject } from 'rxjs';
import { AppComponent } from './app/app.component';
import { initFactory } from './app/app.init';
import { NavigationLessRouter } from './app/routing/simple-router.service';

createCustomElement('hra-ftu-ui-small', AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
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
    provideAnimations(),
    provideHttpClient(),
    provideAppInitializer(() => {
      const initializerFn = initFactory();
      return initializerFn();
    }),
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
