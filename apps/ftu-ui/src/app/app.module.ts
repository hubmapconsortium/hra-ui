import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InteractiveSvgComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
