import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/** An item which defines a string label and a string value */
export interface DataItem {
  /** A string property that represents the label */
  label: string;
  /** A string property that represents the value */
  value: string;
}

/**
 * Modal to display all available information about specific areas of a dataset.
 * The title names the modal for screen readers and doesn't show.
 */
@Component({
  selector: 'hra-info-modal',
  imports: [HraCommonModule, MatIconModule, MatButtonModule, PlainTooltipDirective],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    '[attr.aria-label]': 'title()',
    // A static title also lands on the host as a native title attribute, which shows a browser tooltip over the modal
    '[attr.title]': 'null',
  },
})
export class InfoModalComponent {
  /** List of data items to display */
  readonly data = input<DataItem[]>([]);

  /** Title of modal, which names it for screen readers */
  readonly title = input.required<string>();

  /** Label and tooltip of the close button */
  readonly closeLabel = input('Close');

  /** Emits when close icon clicked */
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly close = output<void>();
}
