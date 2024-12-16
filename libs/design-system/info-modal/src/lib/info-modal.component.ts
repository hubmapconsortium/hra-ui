import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

/** An item which defines a string label and a string value */
export interface DataItem {
  /** A string property that represents the label */
  label: string;
  /** A string property that represents the value */
  value: string;
}

/** Info modal variants */
export type InfoModalVariant = 'tabular' | 'center';

/**
 * Modal to display all available information about specific areas of a dataset.
 */
@Component({
  selector: 'hra-info-modal',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.center]': 'variant() == "center"',
  },
})
export class InfoModalComponent {
  /** List of data items to display */
  data = input<DataItem[]>([]);

  /** Variant of info modal to use */
  variant = input<InfoModalVariant>('tabular');

  /** Title of modal */
  title = input.required<string>();

  /** Emits when close icon clicked */
  close = output<void>();
}
