import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FilterSexEnum } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { OrganInfo } from 'ccf-shared';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'ccf-spatial-search-inputs',
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ButtonsModule,
    ScrollingModule,
  ],
  templateUrl: './spatial-search-inputs.component.html',
  styleUrl: './spatial-search-inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchInputsComponent {
  /** Selectable organs */
  readonly organs = input.required<OrganInfo[]>();

  /** Currently selected organ */
  readonly selectedOrgan = input<OrganInfo>();

  /** Currently selected sex */
  readonly sex = input.required<FilterSexEnum>();

  /** Emits when sex is updated */
  readonly updateSex = output<FilterSexEnum>();

  /** Emits when organ is updated */
  readonly updateOrgan = output<OrganInfo>();

  readonly organControl = new FormControl<string | OrganInfo>('');

  readonly filteredOrgans: Observable<OrganInfo[]> = this.organControl.valueChanges.pipe(
    startWith(''),
    map((value) => {
      const name = typeof value === 'string' ? value : '';
      return name ? this._filter(name as string) : this.organs().slice();
    }),
  );

  protected readonly sexOptions = [FilterSexEnum.Female, FilterSexEnum.Male];

  constructor() {
    effect(() => {
      this.organControl.patchValue(this.selectedOrgan() as OrganInfo);
    });
  }

  displayFn(organ: OrganInfo): string {
    return organ && organ.name ? organ.name : '';
  }

  private _filter(name: string): OrganInfo[] {
    const filterValue = name.toLowerCase();
    return this.organs().filter((organ) => organ.name.toLowerCase().includes(filterValue));
  }
}
