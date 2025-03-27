import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  InjectionToken,
  Input,
  Output,
  inject,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable, ObservableInput, from, lastValueFrom } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, take } from 'rxjs/operators';

import { DecoratedRange } from '../decorated-text/decorated-range';

/** A single suggestion to show in autocomplete  */
export interface AutoCompleteOption {
  /** A unique id */
  id: unknown;
  /** The displayed label */
  label: string;
  /** Optional styling of the label */
  decorations?: Partial<DecoratedRange>[];
}

/**
 * Token to provide a default for the maximum number of
 * autocomplete suggestions to show at the same time.
 */
export const DEFAULT_MAX_OPTIONS = new InjectionToken('Maximum number of autocomplete options displayed', {
  providedIn: 'root',
  factory(): number {
    return 10;
  },
});

/**
 * A text search bar with optional autocompletion functionality.
 */
@Component({
  selector: 'ccf-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TextSearchComponent {
  private readonly defaultMaxOptions = inject(DEFAULT_MAX_OPTIONS);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-text-search';

  /**
   * Placeholder text for the search bar
   */
  @Input() placeholder = 'Search...';

  /**
   * The text to show on the search bar
   */
  @Input()
  get value(): string {
    return this.controller.value as string;
  }

  set value(val: string) {
    this.controller.setValue(val, { emitEvent: false });
  }

  /**
   * Maximum number of autocomplete suggestions to show simultaneously
   */
  @Input() maxOptions?: number;

  /**
   * Function providing the autocomplete suggestions.
   * Receives the latest search bar text and the maximum of suggestions to provide.
   */
  @Input() autoCompleter?: (search: string, max: number) => ObservableInput<AutoCompleteOption[]>;

  /**
   * Emits when the search bar text changes
   */
  @Output() readonly valueChange: Observable<string>;

  /**
   * Emits when an autocomplete option has been selected
   */
  @Output() readonly optionSelected = new EventEmitter<AutoCompleteOption>();

  /**
   * Form controller for search bar
   */
  readonly controller = new UntypedFormControl();

  /**
   * Fetches the latest autocomplete suggestions for the provided search text.
   *
   * @param search The search text to find suggestions for
   * @returns The found suggestions
   */
  private readonly getOptions = async (search: string): Promise<AutoCompleteOption[]> => {
    const { autoCompleter, maxOptions = this.defaultMaxOptions } = this;
    if (!autoCompleter || maxOptions < 1) {
      return [];
    }

    const options = autoCompleter(search, maxOptions);
    return lastValueFrom(
      from(options).pipe(
        take(1),
        map((array) => (array.length <= maxOptions ? array : array.slice(0, maxOptions))),
      ),
    );
  };

  /**
   * Emits the latest autocomplete suggestions
   */
  readonly options = (this.controller.valueChanges as Observable<string>).pipe(
    startWith(''),
    distinctUntilChanged(),
    switchMap(this.getOptions),
  );

  /**
   * Creates an instance of text search component.
   *
   * @param defaultMaxOptions The default value for `maxOptions`
   */
  constructor() {
    this.valueChange = this.controller.valueChanges;
  }

  /**
   * Text to show in search bar when an autocomplete option is selected.
   *
   * @param option The autocomplete option
   * @returns The displayed text
   */
  optionDisplay(option: AutoCompleteOption | null): string {
    return option?.label ?? '';
  }

  /**
   * Gets an unique identifier for an autocomplete option object.
   *
   * @param _index Unused
   * @param option The option object
   * @returns The unique identifier
   */
  optionId(_index: number, option: AutoCompleteOption): unknown {
    return option.id;
  }
}
