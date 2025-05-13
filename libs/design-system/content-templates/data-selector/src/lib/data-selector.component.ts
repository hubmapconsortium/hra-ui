import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { DataSelector } from './types/data-selector.schema';

/**
 * Data Selector Component
 *
 * This component allows the user to select an item from a list of items.
 * The items are passed as an object, where the keys are the labels and the values are the items.
 */
@Component({
  selector: 'hra-data-selector',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ContentTemplateOutletDirective],
  templateUrl: './data-selector.component.html',
  styleUrl: './data-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSelectorComponent {
  /** Label for the selector */
  readonly label = input.required<string>();

  /** An array of “payload” objects, of any shape */
  readonly data = input.required<DataSelector['data']>();

  /** The initial selection */
  readonly initialSelection = input<string>();

  /** Labels or keys for the given data */
  protected readonly labels = computed(() => Object.keys(this.data()));

  /** Initial selected item key or the first item key*/
  protected readonly selection = linkedSignal(() => {
    const initial = this.initialSelection();
    if (initial) {
      return initial;
    }

    return this.labels()[0] ?? '';
  });

  /** Item with the selected key */
  protected readonly item = computed(() => {
    return this.data()[this.selection()];
  });
}
