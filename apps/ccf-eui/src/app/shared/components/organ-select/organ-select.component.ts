import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';

import { SceneState } from '../../../core/store/scene/scene.state';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ccf-organ-select',
  standalone: true,
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
  private readonly scene = inject(SceneState);
  protected readonly selectedOrgans = toSignal(this.scene.selectedReferenceOrgans$, { requireSync: true });
  protected readonly searchInput = signal('');

  protected readonly filteredOrgans = computed(() => {
    const search = this.searchInput().toLowerCase();
    const options: OrganInfo[] = [];
    for (const organ of ALL_ORGANS) {
      if (organ.name.toLowerCase().includes(search) && !this.selectedOrgans().includes(organ)) {
        options.push(organ);
      }
    }

    return options;
  });

  protected readonly searchTextField = computed(
    () => `${this.selectedOrgans().length} Organ${this.selectedOrgans().length > 1 ? 's' : ''} Visible`,
  );

  add(event: MatAutocompleteSelectedEvent): void {
    this.scene.setSelectedReferenceOrgans([...this.selectedOrgans(), event.option.value]);
    this.searchInput.set('');
  }

  remove(organ: OrganInfo): void {
    const index = this.selectedOrgans().indexOf(organ);
    const newSelection = [...this.selectedOrgans()];
    newSelection.splice(index, 1);
    this.scene.setSelectedReferenceOrgans(newSelection);
  }

  selected(event: MatCheckboxChange, option: OrganInfo): void {
    if (!event.checked) {
      this.remove(option);
      return;
    }
    this.scene.setSelectedReferenceOrgans([...this.selectedOrgans(), option]);
    this.searchInput.set('');
  }

  isChecked(organ: OrganInfo) {
    return this.selectedOrgans()
      .map((organ) => organ.name)
      .includes(organ.name);
  }
}
