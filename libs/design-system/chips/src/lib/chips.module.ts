import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ChipSizeDirective } from './chip-size.directive';

@NgModule({
  imports: [MatChipsModule, ChipSizeDirective],
  exports: [MatChipsModule, ChipSizeDirective],
})
export class ChipsModule {}
