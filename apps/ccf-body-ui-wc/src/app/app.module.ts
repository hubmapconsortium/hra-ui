import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BodyUiComponent } from 'ccf-body-ui';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { StoreModule } from './core/store/store.module';

@NgModule({
  imports: [BrowserModule, StoreModule, BodyUiComponent],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideHttpClient()],
})
export class AppModule {}
