import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { HeaderBehaviorComponent, TissueLibraryBehaviorComponent } from '@hra-ui/components/behavioral';
import { HraServiceModule } from '@hra-ui/services';
import { HraStateModule } from '@hra-ui/state';
import { ThemingModule } from '@hra-ui/theming';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    InlineSVGModule.forRoot(),
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    NgxsModule.forRoot(),
    ThemingModule,

    AppRoutingModule,
    CdkStateModule,
    HraServiceModule,
    HraStateModule,

    HeaderBehaviorComponent,
    TissueLibraryBehaviorComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
