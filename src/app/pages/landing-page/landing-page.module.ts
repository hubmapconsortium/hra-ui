import { BottomToolbarModule } from '../../components/bottom-toolbar/bottom-toolbar.module';
import { SectionCardModule } from '../../components/section-card/section-card.module';
import { CarouselModule } from '../../components/carousel/carousel.module';
import { SimpleTileModule } from '../../components/simple-tile/simple-tile.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from '../../pages/landing-page/landing-page.component';
import { AnnouncementCardModule } from 'src/app/components/announcement-card/announcement-card.module';

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    SimpleTileModule,
    CarouselModule,
    SectionCardModule,
    BottomToolbarModule,
    AnnouncementCardModule
  ],
  providers: [],
  bootstrap: []
})
export class LandingPageModule { }
