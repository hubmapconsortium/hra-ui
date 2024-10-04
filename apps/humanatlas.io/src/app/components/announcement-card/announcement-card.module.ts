import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AnnouncementCardComponent } from './announcement-card.component';

@NgModule({
  declarations: [AnnouncementCardComponent],
  imports: [BrowserModule, MatCardModule, RouterModule],
  exports: [AnnouncementCardComponent],
})
export class AnnouncementCardModule {}
