import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InteractiveSvgComponent, HttpClientModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
