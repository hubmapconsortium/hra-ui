import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InteractiveSvgComponent } from './interactive-svg.component';

@NgModule({
  declarations: [InteractiveSvgComponent],
  imports: [CommonModule, BrowserModule],
  providers: [],
})
export class InteractiveSvgModule {}
