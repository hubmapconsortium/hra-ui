import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyUiComponent } from './body-ui.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BodyUiComponent],
  exports: [BodyUiComponent],
})
export class BodyUiModule {}
