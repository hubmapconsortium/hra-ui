import { ChangeDetectionStrategy, Component, computed, input, isSignal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';
import { NgxMaskDirective } from 'ngx-mask';
import { derivedAsync } from 'ngxtension/derived-async';
import { distinctUntilChanged, map, Observable, startWith, Subject } from 'rxjs';
import { removeDoiBase } from '../../../shared/utils/doi';

export interface DonorFormControls {
  organ: FormControl<OrganInfo | string | null>;
  sex: FormControl<string>;
  consortium: FormControl<string>;
  doi: FormControl<string>;
}

const DEFAULT_CONSORTIUMS = ['HuBMAP', 'SenNet'];

function filterAutocompleteOptions<T>(
  options: Signal<T[]>,
  input: Signal<FormControl<T | string | null>> | Observable<T | string | null>,
  getValue: (option: T) => string,
): Signal<T[]> {
  const sorted = computed(() => {
    const opts = [...options()];
    const collator = new Intl.Collator();
    opts.sort((opt1, opt2) => collator.compare(getValue(opt1), getValue(opt2)));
    return opts;
  });

  const filter = (value: T | string | null, opts: T[]) => {
    if (value === null || value === '') {
      return opts;
    } else if (typeof value !== 'string') {
      value = getValue(value);
    }

    value = value.toLowerCase();
    return opts.filter((opt) => getValue(opt).toLowerCase().includes(value));
  };

  return derivedAsync(
    () => {
      const opts = sorted();
      const inputSource$ = isSignal(input) ? input().valueChanges : input;
      return inputSource$.pipe(
        startWith(''),
        distinctUntilChanged(),
        map((value) => filter(value, opts)),
      );
    },
    { initialValue: [] },
  );
}

@Component({
  selector: 'ccf-metadata-donor-form',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgxMaskDirective,
    ButtonModule,
  ],
  templateUrl: './metadata-donor-form.component.html',
  styleUrls: ['./metadata-donor-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataDonorFormComponent {
  readonly form = input.required<FormGroup<DonorFormControls>>();

  readonly organs = input<OrganInfo[]>(ALL_ORGANS);
  readonly consortiums = input<string[]>(DEFAULT_CONSORTIUMS);

  protected readonly getOrganName = (organ: OrganInfo | null) => organ?.name ?? '';
  protected readonly organInput = new Subject<string>();
  protected readonly filteredOrgans = filterAutocompleteOptions(this.organs, this.organInput, this.getOrganName);

  private readonly consortiumControl = computed(() => this.form().controls.consortium);
  protected readonly filteredConsortiums = filterAutocompleteOptions(
    this.consortiums,
    this.consortiumControl,
    (value) => value,
  );

  protected readonly doiInputFn = (value: unknown) => removeDoiBase(String(value));
  protected readonly doiPatterns = { A: { pattern: /[\w.]/ } };
}
