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

export type DualSliderRange = [number, number];

let nextId = 0;

/**
 * Component containing a button that when clicked will show a slider popover.
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
  standalone: true,
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

  readonly min = input.required({ transform: numberAttribute });
  readonly max = input.required({ transform: numberAttribute });
  readonly _value = model<DualSliderRange | null>(null, { alias: 'value' });
  readonly _required = input(false, { alias: 'required', transform: booleanAttribute });
  readonly _disabled = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly tabIndex = input(this.getTabIndexFromHost(), { transform: numberAttribute });
  readonly ariaLabel = input('', { alias: 'aria-label' });
  readonly ariaLabelledBy = input('', { alias: 'aria-labelledby' });
  readonly _userAriaDescribedBy = input('', { alias: 'aria-describedby' });

  readonly id = `dual-slider-input-${nextId++}`;
  readonly panelId = `${this.id}-panel`;
  readonly controlType = 'dual-slider';
  readonly placeholder = '';
  readonly shouldLabelFloat = true;
  readonly empty = true;
  readonly errorState = false;
  readonly stateChanges = new Subject<void>();
  readonly ngControl = inject(NgControl, { optional: true, self: true });

  get value(): DualSliderRange | null {
    return this._value();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get focused(): boolean {
    return this._focused() || this.panelOpen();
  }

  get userAriaDescribedBy(): string {
    return this._userAriaDescribedBy();
  }

  protected readonly low = computed(() => this._value()?.[0] ?? this.min());
  protected readonly high = computed(() => this._value()?.[1] ?? this.max());
  protected readonly label = computed(() => `${this.low()}-${this.high()}`);

  protected readonly panelOpen = signal(false);
  protected readonly panelOrigin = signal<ElementRef | undefined>(undefined);
  protected readonly panelLabelledBy = computed(() => {
    if (this.ariaLabel()) {
      return null;
    }

    const id = this.formField?.getLabelId() ?? null;
    const labelledBy = this.ariaLabelledBy();
    return id && labelledBy ? `${id} ${labelledBy}` : labelledBy || id;
  });
  protected readonly scrollStrategy = inject(Overlay).scrollStrategies.reposition();

  protected readonly nnfb = inject(NonNullableFormBuilder);
  protected readonly range = this.nnfb.group(
    {
      low: [0],
      high: [0],
    },
    { updateOn: 'blur' },
  );

  private readonly _focused = signal(false);
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly formField = inject(MAT_FORM_FIELD, { optional: true });
  private readonly sliderThumbs = viewChildren(MatSliderRangeThumb);

  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

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
    explicitEffect([_value, min, max], ([value, min, max]) => {
      const [low, high] = this.normalizeValue(value, value, min, max);
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

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  open(): void {
    if (this.formField) {
      this.panelOrigin.set(this.formField.getConnectedOverlayOrigin());
    }

    this.panelOpen.set(true);
  }

  afteClose(): void {
    this.panelOpen.set(false);
    this.onTouched();
  }

  onFocus(): void {
    if (!this.disabled) {
      this._focused.set(true);
    }
  }

  onBlur(): void {
    this._focused.set(false);
    if (!this.disabled && !this.panelOpen()) {
      this.onTouched();
    }
  }

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

  onContainerClick(_event: MouseEvent): void {
    this.open();
  }

  setDescribedByIds(ids: string[]): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-describedby', ids.join(' '));
  }

  writeValue(value: DualSliderRange | null): void {
    this.updateValue(this.normalizeValue(value));
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private updateValue(value: DualSliderRange): boolean {
    const current = this._value();
    if (current !== null && current[0] === value[0] && current[1] === value[1]) {
      return false;
    }

    this._value.set(value);
    return true;
  }

  private updateLowHighAndSync(low: number | undefined, high: number | undefined): void {
    const normalized = this.normalizeValue([low, high]);
    const changed = this.updateValue(normalized);
    if (changed) {
      this.onChange(normalized);
    } else {
      this.range.setValue({ low: normalized[0], high: normalized[1] }, { emitEvent: false });
    }
  }

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

  private getTabIndexFromHost(): number {
    const tabIndex = inject(new HostAttributeToken('tabindex'), { optional: true });
    return (tabIndex && parseInt(tabIndex)) || 0;
  }
}
