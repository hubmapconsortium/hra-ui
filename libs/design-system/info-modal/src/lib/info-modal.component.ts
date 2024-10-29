import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

/** An item which defines a string label and a string value */
export interface DataItem {
  /** A string property that represents the label */
  label: string;
  /** A string property that represents the value */
  value: string;
}

export type InfoModalVariant = 'tabular' | 'center';

@Component({
  selector: 'hra-info-modal',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.center]': 'variant() == "center"',
  },
})
export class InfoModalComponent {
  data = input<DataItem[]>([]);
  variant = input<InfoModalVariant>('tabular');
  title = input<string>();
  close = output<void>();
}
