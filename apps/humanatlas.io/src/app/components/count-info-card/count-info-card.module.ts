import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CountInfoCardComponent } from './count-info-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CountInfoCardComponent],
  imports: [BrowserModule, MatCardModule],
  exports: [CountInfoCardComponent],
})
export class CountInfoCardModule {}
