import { ChangeDetectionStrategy, Component, computed, input, isSignal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';
import { NgxMaskDirective } from 'ngx-mask';
import { derivedAsync } from 'ngxtension/derived-async';
import { distinctUntilChanged, map, Observable, startWith, Subject } from 'rxjs';
import { removeDoiBase } from '../../../shared/utils/doi';

/** Donor form controls */
export interface DonorFormControls {
  /** Organ control */
  organ: FormControl<OrganInfo | string | null>;
  /** Sex control */
  sex: FormControl<string>;
  /** Consortium control */
  consortium: FormControl<string>;
  /** DOI id control */
  doi: FormControl<string>;
}

/** Default consortium options */
const DEFAULT_CONSORTIUMS = ['HuBMAP', 'SenNet'];

/**
 * Filters a set of options based on the user input.
 * The filtering is case insensitive and ptions are returned in alphabetical order using the default locale.
 * Empty inputs (`null`, `undefined`, or `''`) return all options.
 *
 * @param options Autocomplete options
 * @param source User input
 * @param getValue Accessor to get the search text for an item
 * @returns The options that matches the current user input
 */
function filterAutocompleteOptions<T>(
  options: Signal<T[]>,
  source: Signal<FormControl<T | string | null>> | Observable<T | string | null>,
  getValue: (option: T) => string,
): Signal<T[]> {
  const sorted = computed(() => {
    const opts = [...options()];
    const collator = new Intl.Collator();
    opts.sort((opt1, opt2) => collator.compare(getValue(opt1), getValue(opt2)));
    return opts;
  });

  const filter = (value: T | string | null | undefined, opts: T[]) => {
    if (value === null || value === undefined || value === '') {
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
      const inputSource$ = isSignal(source) ? source().valueChanges : source;
      return inputSource$.pipe(
        startWith(isSignal(source) ? source().value : ''),
        distinctUntilChanged(),
        map((value) => filter(value, opts)),
      );
    },
    { initialValue: [] },
  );
}

/** Metadata donor subform */
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
    ButtonsModule,
  ],
  templateUrl: './metadata-donor-form.component.html',
  styleUrls: ['./metadata-donor-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataDonorFormComponent {
  /** Parent form controller */
  readonly form = input.required<FormGroup<DonorFormControls>>();

  /** Available organs the user can select from */
  readonly organs = input<OrganInfo[]>(ALL_ORGANS);
  /** Default consortiums shown during autocomplete */
  readonly consortiums = input<string[]>(DEFAULT_CONSORTIUMS);

  /** Accessor for an organ's name */
  protected readonly getOrganName = (organ: OrganInfo | null) => organ?.name ?? '';
  /** Current user input in the organ field */
  protected readonly organInput = new Subject<string>();
  /** Autocomplete organ options based on the current user input */
  protected readonly filteredOrgans = filterAutocompleteOptions(this.organs, this.organInput, this.getOrganName);

  /** Consortium field controller */
  private readonly consortiumControl = computed(() => this.form().controls.consortium);
  /** Autocomplete consortium options based on the current user input */
  protected readonly filteredConsortiums = filterAutocompleteOptions(
    this.consortiums,
    this.consortiumControl,
    (value) => value,
  );

  /** Transformer applied to input in the doi field */
  protected readonly doiInputFn = (value: unknown) => removeDoiBase(String(value));
  /** Valid doi id characters */
  protected readonly doiPatterns = { A: { pattern: /[\w.\-_~#[\]'()*%]/ } };
}
