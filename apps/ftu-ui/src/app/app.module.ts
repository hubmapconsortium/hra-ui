import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ThemingModule } from '@hra-ui/theming';
import { NgxsModule } from '@ngxs/store';
import { LinkRegistryState, ResourceRegistryState } from '@hra-ui/cdk/state';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([ResourceRegistryState, LinkRegistryState]),
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    InlineSVGModule.forRoot(),
    ThemingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
