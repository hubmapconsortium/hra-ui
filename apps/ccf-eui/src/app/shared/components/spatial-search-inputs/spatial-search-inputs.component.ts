import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { OrganInfo } from 'ccf-shared';
import { map, Observable, startWith } from 'rxjs';
import { SpatialSearchSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

@Component({
  selector: 'ccf-spatial-search-inputs',
  standalone: true,
  imports: [
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
export class SpatialSearchInputsComponent implements OnInit {
  /** Selectable organs */
  @Input() organs!: OrganInfo[];

  /** Currently selected organ */
  @Input() selectedOrgan?: OrganInfo;

  /** Currently selected sex */
  @Input() sex!: SpatialSearchSex;

  /** Emits when sex is updated */
  @Output() readonly updateSex = new EventEmitter<SpatialSearchSex>();

  /** Emits when organ is updated */
  @Output() readonly updateOrgan = new EventEmitter<OrganInfo>();

  organControl = new FormControl<string | OrganInfo>('');

  filteredOrgans!: Observable<OrganInfo[]>;

  ngOnInit() {
    this.organControl.patchValue(this.selectedOrgan as OrganInfo);
    this.filteredOrgans = this.organControl.valueChanges.pipe(
      startWith([]),
      map((value) => {
        const name = typeof value === 'string' ? value : '';
        return name ? this._filter(name as string) : this.organs.slice();
      }),
    );
  }

  displayFn(organ: OrganInfo): string {
    return organ && organ.name ? organ.name : '';
  }

  private _filter(name: string): OrganInfo[] {
    const filterValue = name.toLowerCase();
    return this.organs.filter((organ) => organ.name.toLowerCase().includes(filterValue));
  }
}
