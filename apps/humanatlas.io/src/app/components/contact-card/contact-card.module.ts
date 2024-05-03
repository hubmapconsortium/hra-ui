import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContactCardComponent } from './contact-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ContactCardComponent],
  imports: [BrowserModule, MatCardModule, MatDividerModule],
  exports: [ContactCardComponent],
})
export class ContactCardModule {}
