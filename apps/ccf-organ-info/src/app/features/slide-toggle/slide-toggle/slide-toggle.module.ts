import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SlideToggleComponent } from './slide-toggle.component';

@NgModule({
  declarations: [SlideToggleComponent],
  imports: [CommonModule, MatSlideToggleModule],
  exports: [SlideToggleComponent],
})
export class SlideToggleModule {}
