import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardWithHeaderComponent } from './card-with-header.component';
import { CardButtonLongModule } from '../card-button-long/card-button-long.module';

@NgModule({
  declarations: [CardWithHeaderComponent],
  imports: [BrowserModule, CardButtonLongModule],
  exports: [CardWithHeaderComponent],
})
export class CardWithHeaderModule {}
