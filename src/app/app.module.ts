import { BottomToolbarModule } from './components/bottom-toolbar/bottom-toolbar.module';
import { SectionCardModule } from './components/section-card/section-card.module';
import { CarouselModule } from './components/carousel/carousel.module';
import { SimpleTileModule } from './components/simple-tile/simple-tile.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    SimpleTileModule,
    CarouselModule,
    SectionCardModule,
    BottomToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
