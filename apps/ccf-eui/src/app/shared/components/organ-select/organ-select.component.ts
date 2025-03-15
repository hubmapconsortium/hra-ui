import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';

import { SceneState } from '../../../core/store/scene/scene.state';

/**
 * Organ select form with autocomplete and chips
 */
@Component({
  selector: 'ccf-organ-select',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ScrollingModule,
    MatCheckboxModule,
  ],
  templateUrl: './organ-select.component.html',
  styleUrl: './organ-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganSelectComponent {
  /** Scene state */
  private readonly scene = inject(SceneState);
  /** Currently selected organs */
  protected readonly selectedOrgans = toSignal(this.scene.selectedReferenceOrgans$, { requireSync: true });
  /** Current search input */
  protected readonly searchInput = signal('');

  /** Organs to display in autocomplete dropdown */
  protected readonly filteredOrgans = computed(() => {
    const search = this.searchInput().toLowerCase();
    const options: OrganInfo[] = [];
    for (const organ of ALL_ORGANS) {
      if (organ.name.toLowerCase().includes(search)) {
        options.push(organ);
      }
    }

    return options;
  });

  /**
   * Hides placeholder text when input is focused or when there are no selected organs
   * If only one organ is selected use singular form
   */
  protected readonly searchTextPlaceholder = computed(() => {
    if (this.hidePlaceholder() || this.selectedOrgans().length === 0) {
      return '';
    } else {
      return `${this.selectedOrgans().length} Organ${this.selectedOrgans().length > 1 ? 's' : ''} Visible`;
    }
  });

  /** Floats the input label when organs are selected */
  protected readonly floatToggle = computed(() => (this.selectedOrgans().length > 0 ? 'always' : 'auto'));

  /** Shows placeholder text when organs are selected, hides when input is focused  */
  protected readonly hidePlaceholder = signal(false);

  /**
   * Toggles placeholder text visibility
   */
  togglePlaceholder() {
    this.hidePlaceholder.set(!this.hidePlaceholder());
  }

  /**
   * Removes organ from selection and updates scene
   * @param organ Organ to remove
   */
  remove(organ: OrganInfo): void {
    const index = this.selectedOrgans().indexOf(organ);
    const newSelection = [...this.selectedOrgans()];
    newSelection.splice(index, 1);
    this.scene.setSelectedReferenceOrgans(newSelection);
  }

  /**
   * Handles option selection from autocomplete dropdown and updates scene
   * @param event Autocomplete selected event
   */
  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.searchInput.set('');
    if (
      this.selectedOrgans()
        .map((organ) => organ.name)
        .includes(event.option.value.name)
    ) {
      return;
    }
    this.scene.setSelectedReferenceOrgans([...this.selectedOrgans(), event.option.value]);
  }

  /**
   * Toggles checkbox selection when clicked and updates organ selection
   * @param event Checkbox change event
   * @param option Organ option
   */
  checkboxSelected(event: MatCheckboxChange, option: OrganInfo): void {
    if (!event.checked) {
      this.remove(option);
      return;
    }
    this.scene.setSelectedReferenceOrgans([...this.selectedOrgans(), option]);
    this.searchInput.set('');
  }

  /**
   * Determines whether organ option is checked
   * @param organ Organ option
   * @returns True if checked
   */
  isChecked(organ: OrganInfo): boolean {
    return this.selectedOrgans()
      .map((organ) => organ.name)
      .includes(organ.name);
  }
}
