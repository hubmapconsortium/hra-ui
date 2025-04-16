import { NgModule } from '@angular/core';
import { RichTooltipDirective } from './rich-tooltip.directive';
import {
  RichTooltipActionsComponent,
  RichTooltipCloseDirective,
  RichTooltipContainerComponent,
  RichTooltipContentComponent,
  RichTooltipTaglineComponent,
} from './content/rich-tooltip-content.component';

@NgModule({
  imports: [
    RichTooltipDirective,
    RichTooltipTaglineComponent,
    RichTooltipContentComponent,
    RichTooltipActionsComponent,
    RichTooltipCloseDirective,
    RichTooltipContainerComponent,
  ],
  exports: [
    RichTooltipDirective,
    RichTooltipTaglineComponent,
    RichTooltipContentComponent,
    RichTooltipActionsComponent,
    RichTooltipCloseDirective,
    RichTooltipContainerComponent,
  ],
})
export class RichTooltipModule {}
