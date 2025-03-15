import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

/** Reexported components, modules, etc. */
const REEXPORTS = [MatSliderModule];

/** Components, modules, etc. for sliders */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class SliderModule {}
