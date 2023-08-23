import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { createCustomElement } from '@angular/elements';
import { ThemingModule } from '@hra-ui/theming';

(async () => {
  const app = await createApplication({
    providers: [
      importProvidersFrom(
        InlineSVGModule.forRoot(),
        NgxsModule.forRoot(),
        MarkdownModule.forRoot({
          loader: HttpClient,
        }),
        ThemingModule,
        HttpClientModule
      ),
    ],
  });

  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('ftu-hra-small-wc', element);
})();
