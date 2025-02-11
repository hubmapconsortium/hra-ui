import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ALL_ORGANS } from 'ccf-shared';

import { SceneState } from '../../../core/store/scene/scene.state';

@Component({
  selector: 'ccf-organ-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatAutocompleteModule, MatChipsModule, MatIconModule, FormsModule],
  templateUrl: './organ-select.component.html',
  styleUrl: './organ-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganSelectComponent {
  readonly organs = model<string[]>([]);

  readonly currentOrganInput = model('');
  readonly filteredOrgans = computed(() => {
    const currentOrganInput = this.currentOrganInput().toLowerCase();
    return currentOrganInput
      ? ALL_ORGANS.filter((organ) => organ.name.toLowerCase().includes(currentOrganInput))
      : ALL_ORGANS.slice();
  });
  readonly searchTextField = computed(
    () => `${this.organs().length} Organ${this.organs().length > 1 ? 's' : ''} Visible`,
  );

  constructor(readonly scene: SceneState) {
    scene.selectedReferenceOrgans$.subscribe((selected) => {
      this.organs.set(selected.map((organ) => organ.name));
    });
  }

  remove(organ: string): void {
    this.organs.update((organs) => {
      const index = organs.indexOf(organ);
      if (index < 0) {
        return organs;
      }

      organs.splice(index, 1);
      return [...organs];
    });

    const selectedOrgans = ALL_ORGANS.filter((organ) => this.organs().includes(organ.name));
    this.scene.setSelectedReferenceOrgans(selectedOrgans);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.organs.update((organs) => [...organs, event.option.viewValue]);
    const selectedOrgans = ALL_ORGANS.filter((organ) => this.organs().includes(organ.name));
    this.scene.setSelectedReferenceOrgans(selectedOrgans);
    this.currentOrganInput.set('');
    event.option.deselect();
  }
}
