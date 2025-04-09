import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RichTooltipDirective } from '../rich-tooltip.directive';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'hra-rich-tooltip-simple-content',
  imports: [CommonModule, ButtonsModule],
  templateUrl: './rich-tooltip-simple-content.component.html',
  styleUrl: './rich-tooltip-simple-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTooltipSimpleContentComponent {
  readonly owner = input<RichTooltipDirective>(); // TODO Try to make required
}
