import { A11yModule } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostAttributeToken,
  inject,
  input,
  model,
  numberAttribute,
  OnDestroy,
  Renderer2,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderRangeThumb } from '@angular/material/slider';
import { SliderModule } from '@hra-ui/design-system/slider';
import { explicitEffect } from 'ngxtension/explicit-effect';
import { skip, Subject } from 'rxjs';

/** A slider range */
export type DualSliderRange = [number, number];

/** Counter used to generate unique ids for each dual slider */
let nextId = 0;

/**
 * Form field that shows a slider that can be used to change a range.
 */
@Component({
  selector: 'ccf-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.scss'],
  imports: [
    A11yModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    ReactiveFormsModule,
    SliderModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: DualSliderComponent }],
  host: {
    role: 'combobox',
    'aria-haspopup': 'dialog',
    '[attr.id]': 'id',
    '[attr.tabindex]': 'disabled ? -1 : tabIndex()',
    '[attr.aria-controls]': 'panelOpen() ? panelId : null',
    '[attr.aria-expanded]': 'panelOpen()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'ariaLabel() && ariaLabelledBy() || null',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class DualSliderComponent implements ControlValueAccessor, MatFormFieldControl<DualSliderRange>, OnDestroy {
  /* eslint-disable @angular-eslint/no-input-rename */

  /** Range minimum value (inclusive) */
  readonly min = input.required({ transform: numberAttribute });
  /** Range maximim value (inclusive) */
  readonly max = input.required({ transform: numberAttribute });
  /** Current value */
  readonly _value = model<DualSliderRange | null>(null, { alias: 'value' });
  /** Whether the field is required */
  readonly _required = input(false, { alias: 'required', transform: booleanAttribute });
  /** Whether the field is disabled */
  readonly _disabled = input(false, { alias: 'disabled', transform: booleanAttribute });
  /** Tab index */
  readonly tabIndex = input(this.getTabIndexFromHost(), { transform: numberAttribute });
  /** Field accessible label */
  readonly ariaLabel = input('', { alias: 'aria-label' });
  /** Field accessible labelled by */
  readonly ariaLabelledBy = input('', { alias: 'aria-labelledby' });
  /** Field accessible described by */
  readonly _userAriaDescribedBy = input('', { alias: 'aria-describedby' });

  /** Unique field id */
  readonly id = `dual-slider-input-${nextId++}`;
  /** Unique id for the associated panel with the slider */
  readonly panelId = `${this.id}-panel`;
  /** Control type */
  readonly controlType = 'dual-slider';
  /** Empty placeholder (since it is never shown) */
  readonly placeholder = '';
  /** Always float the label (since it always displays a value) */
  readonly shouldLabelFloat = true;
  /** Never empty */
  readonly empty = false;
  /** No error states */
  readonly errorState = false;
  /** Subject emitting when the state changes */
  readonly stateChanges = new Subject<void>();
  /** Reference to the NgControl for this form field */
  readonly ngControl = inject(NgControl, { optional: true, self: true });

  /** Get the current value */
  get value(): DualSliderRange | null {
    return this._value();
  }

  /** Get whether this field is required */
  get required(): boolean {
    return this._required();
  }

  /** Get whether this field is disabled */
  get disabled(): boolean {
    return this._disabled();
  }

  /** Get whether this field is focused */
  get focused(): boolean {
    return this._focused() || this.panelOpen();
  }

  /** Get accessible described by */
  get userAriaDescribedBy(): string {
    return this._userAriaDescribedBy();
  }

  /** The current low value of the range */
  protected readonly low = computed(() => this._value()?.[0] ?? this.min());
  /** The current high value of the range */
  protected readonly high = computed(() => this._value()?.[1] ?? this.max());
  /** Label displaying the current range */
  protected readonly label = computed(() => `${this.low()}-${this.high()}`);

  /** Whether the slider panel is open */
  protected readonly panelOpen = signal(false);
  /** Reference to the panel element */
  protected readonly panelOrigin = signal<ElementRef | undefined>(undefined);
  /** Panel's accessible labelled by value */
  protected readonly panelLabelledBy = computed(() => {
    if (this.ariaLabel()) {
      return null;
    }

    const id = this.formField?.getLabelId() ?? null;
    const labelledBy = this.ariaLabelledBy();
    return id && labelledBy ? `${id} ${labelledBy}` : labelledBy || id;
  });
  /** Panel scroll strategy that repositions the panel on scroll, etc. */
  protected readonly scrollStrategy = inject(Overlay).scrollStrategies.reposition();

  /** Form builder */
  protected readonly nnfb = inject(NonNullableFormBuilder);
  /** Form control for the range value */
  protected readonly range = this.nnfb.group(
    {
      low: [0],
      high: [0],
    },
    { updateOn: 'blur' },
  );

  /** Whether the field is focused */
  private readonly _focused = signal(false);
  /** Reference to the associated dom element */
  private readonly elementRef = inject(ElementRef);
  /** Reference to the renderer for dom manipulation */
  private readonly renderer = inject(Renderer2);
  /** Reference to the owning form field */
  private readonly formField = inject(MAT_FORM_FIELD, { optional: true });
  /** Reference to the slider's thumb instances */
  private readonly sliderThumbs = viewChildren(MatSliderRangeThumb);

  /** Callback invoked whenever the field changes */
  private onChange: (value: unknown) => void = () => undefined;
  /** Callback invoked whenever the field is touched */
  private onTouched: () => void = () => undefined;

  /** Initialize the field - setting up effects and subscriptions */
  constructor() {
    const {
      _disabled,
      _focused,
      _required,
      _userAriaDescribedBy,
      _value,
      max,
      min,
      ngControl,
      panelOpen,
      range,
      sliderThumbs,
      stateChanges,
    } = this;

    if (ngControl) {
      ngControl.valueAccessor = this;
    }

    explicitEffect([_required, _disabled, _focused, _userAriaDescribedBy, panelOpen], () => {
      stateChanges.next();
    });
    explicitEffect([_disabled], ([disabled]) => {
      if (disabled) {
        range.disable();
      } else {
        range.enable();
      }
    });
    explicitEffect([_value, min, max], ([value, minValue, maxValue]) => {
      const [low, high] = this.normalizeValue(value, value, minValue, maxValue);
      range.setValue({ low, high });
    });

    const updateLow = (value: number) => this.updateLowHighAndSync(value, undefined);
    const updateHigh = (value: number) => this.updateLowHighAndSync(undefined, value);
    explicitEffect([sliderThumbs], ([thumbs]) => {
      if (thumbs.length === 2) {
        thumbs[0].registerOnChange(updateLow);
        thumbs[1].registerOnChange(updateHigh);
      }
    });

    range.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      stateChanges.next();
    });

    range.valueChanges.pipe(takeUntilDestroyed(), skip(1)).subscribe((value) => {
      const { low, high } = value;
      this.updateLowHighAndSync(low, high);
    });
  }

  /** Clean up subscriptions */
  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  /**
   * Open the slider panel
   */
  open(): void {
    if (this.formField) {
      this.panelOrigin.set(this.formField.getConnectedOverlayOrigin());
    }

    this.panelOpen.set(true);
  }

  /**
   * Updates the component state once the slider panel has closed
   */
  afterClose(): void {
    this.panelOpen.set(false);
    this.onTouched();
  }

  /**
   * Handle focus events
   */
  onFocus(): void {
    if (!this.disabled) {
      this._focused.set(true);
    }
  }

  /**
   * Handle blur events
   */
  onBlur(): void {
    this._focused.set(false);
    if (!this.disabled && !this.panelOpen()) {
      this.onTouched();
    }
  }

  /**
   * Handle keyboard events targeting the field (excluding the panel)
   *
   * @param event Keyboard event
   */
  onKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    const isOpenKey = event.key === 'Enter' || event.key === ' ';
    if (isOpenKey && !hasModifierKey(event)) {
      event.preventDefault();
      this.open();
    }
  }

  /**
   * Handle mouse clicks on the field (excluding the panel)
   */
  onContainerClick(): void {
    this.open();
  }

  /**
   * Sets aria-describedby on this field
   *
   * @param ids Ids to add to the described by attribute
   */
  setDescribedByIds(ids: string[]): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-describedby', ids.join(' '));
  }

  /**
   * Sets a new value on this field
   *
   * @param value The new value
   */
  writeValue(value: DualSliderRange | null): void {
    this.updateValue(this.normalizeValue(value));
  }

  /**
   * Registers a callback that will be invoked whenever the field's value changes
   *
   * @param fn Callback function
   */
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback that will be invoked whenever the field is touched
   *
   * @param fn Callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Update the field's value. If the new value matches the current value no additional changes are
   * made and false is returned.
   *
   * @param value The new value
   * @returns true if the field's value was updated, false otherwise
   */
  private updateValue(value: DualSliderRange): boolean {
    const current = this._value();
    if (current !== null && current[0] === value[0] && current[1] === value[1]) {
      return false;
    }

    this._value.set(value);
    return true;
  }

  /**
   * Updates the range value and syncs form controls with the new value
   *
   * @param low New low range value
   * @param high New high range value
   */
  private updateLowHighAndSync(low: number | undefined, high: number | undefined): void {
    const normalized = this.normalizeValue([low, high]);
    const changed = this.updateValue(normalized);
    if (changed) {
      this.onChange(normalized);
    } else {
      this.range.setValue({ low: normalized[0], high: normalized[1] }, { emitEvent: false });
    }
  }

  /**
   * Normalizes a range value. Missing `low`/`high` values are replaced with
   * the current value or `min`/`max` respectively if the current value is null.
   * Values are also clamped into the range [`min`, `max`] and ordered such that `low` <= `high`.
   *
   * @param value Value to normalize
   * @param current Current value in the field
   * @param min Minimum value allowed
   * @param max Maximum value allowed
   * @returns A normalized range value
   */
  private normalizeValue(
    value: Partial<DualSliderRange> | null,
    current: DualSliderRange | null = this._value(),
    min = this.min(),
    max = this.max(),
  ): DualSliderRange {
    const currentOrDefaultValue = (index: 0 | 1, defaultValue: number) => {
      return current?.[index] ?? defaultValue;
    };
    const getNormalizedValueAt = (index: 0 | 1, defaultValue: number) => {
      if (value === null || value[index] === undefined) {
        return currentOrDefaultValue(index, defaultValue);
      }
      const result = Math.round(value[index]);
      return result >= min && result <= max ? result : currentOrDefaultValue(index, defaultValue);
    };

    const result: DualSliderRange = [getNormalizedValueAt(0, min), getNormalizedValueAt(1, max)];
    if (result[0] > result[1]) {
      result.reverse();
    }
    return result;
  }

  /**
   * Reads the `tabindex` attribute from the host element and parses it into an integer
   *
   * @returns The tabindex attribute's value or 0
   */
  private getTabIndexFromHost(): number {
    const tabIndex = inject(new HostAttributeToken('tabindex'), { optional: true });
    return (tabIndex && parseInt(tabIndex)) || 0;
  }
}
