import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderBehaviorComponent } from '@hra-ui/components/behavioral';
import { ThemingModule } from '@hra-ui/theming';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { states } from './app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    NgxsModule.forRoot([...states]),
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    InlineSVGModule.forRoot(),
    ThemingModule,

    HeaderBehaviorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
