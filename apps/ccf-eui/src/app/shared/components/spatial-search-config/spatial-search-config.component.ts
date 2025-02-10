import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { OrganInfo } from 'ccf-shared';
import { map, Observable, startWith } from 'rxjs';

/** Sex can either be male or female */
export type Sex = 'male' | 'female';

/**
 * Config popup for spatial search
 */
@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    ButtonsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    AsyncPipe,
    MatFormFieldModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  /** Selectable organs */
  @Input() organs!: OrganInfo[];

  /** Currently selected organ */
  @Input() selectedOrgan?: OrganInfo;

  /** Currently selected sex */
  @Input() sex!: Sex;

  /** Emits when sex is updated */
  @Output() readonly updateSex = new EventEmitter<Sex>();

  /** Emits when organ is updated */
  @Output() readonly updateOrgan = new EventEmitter<OrganInfo>();

  /** Emits when the continue button is clicked */
  @Output() readonly buttonClicked = new EventEmitter();

  /** Emits when the close button is clicked */
  @Output() readonly closeDialog = new EventEmitter();

  /** Emits when the info button is clicked */
  @Output() readonly infoClicked = new EventEmitter();

  myControl = new FormControl('');
  filteredOrgans: Observable<OrganInfo[]>;

  constructor() {
    this.filteredOrgans = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): OrganInfo[] {
    const filterValue = value.toLowerCase();

    return this.organs.filter((organ) => organ.name.toLowerCase().includes(filterValue));
  }
}
