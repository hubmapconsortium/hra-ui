import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { RichTooltipDirective } from '../rich-tooltip.directive';

/**
 * HRA Rich Tooltip
 * Simple Content Variant
 */
@Component({
  selector: 'hra-rich-tooltip-simple-content',
  imports: [CommonModule, ButtonsModule],
  templateUrl: './rich-tooltip-simple-content.component.html',
  styleUrl: './rich-tooltip-simple-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTooltipSimpleContentComponent {
  /**
   * Owner directive input variable
   * TODO: Try to make it required input
   */
  readonly owner = input<RichTooltipDirective>();

  /**
   * Title text for the tooltip (required)
   */
  readonly title = input.required<string>();

  /**
   * Description text for the tooltip (required)
   */
  readonly description = input.required<string>();

  /**
   * Action button text for the tooltip (optional)
   */
  readonly actionText = input<string>();

  /**
   * Output variable for the action button click event
   */
  readonly actionClick = output<void>();
}
