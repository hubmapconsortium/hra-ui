import { NgModule } from '@angular/core';

import { HraCommonModule } from '@hra-ui/common';
import { SpatialSearchKeyboardUIModule } from '../spatial-search-keyboard-ui/spatial-search-keyboard-ui.module';
import { SpatialSearchKeyboardUIBehaviorComponent } from './spatial-search-keyboard-ui-behavior.component';

@NgModule({
  imports: [HraCommonModule, SpatialSearchKeyboardUIModule],
  declarations: [SpatialSearchKeyboardUIBehaviorComponent],
  exports: [SpatialSearchKeyboardUIBehaviorComponent],
})
export class SpatialSearchKeyboardUIBehaviorModule {}
