import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrizeCardComponent } from './prize-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';
@NgModule({
  declarations: [PrizeCardComponent],
  imports: [BrowserModule, MatCardModule, MatButtonModule, MatDividerModule, MarkdownModule.forChild()],
  exports: [PrizeCardComponent],
})
export class PrizeCardModule {}
