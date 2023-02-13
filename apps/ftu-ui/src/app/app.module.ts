import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InteractiveSvgModule } from '@hra-ui/components/molecules';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InteractiveSvgModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
