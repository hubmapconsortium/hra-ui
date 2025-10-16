import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { SpatialSearchKeyboardUIComponent } from './spatial-search-keyboard-ui.component';

@NgModule({
  imports: [HraCommonModule, MatIconModule],
  declarations: [SpatialSearchKeyboardUIComponent],
  exports: [SpatialSearchKeyboardUIComponent],
})
export class SpatialSearchKeyboardUIModule {}
