import { computed, Directive, input, isSignal, Signal } from '@angular/core';

/** Named button variants */
export type ButtonVariant = 'primary' | 'secondary';

/** Base class for variant directives */
@Directive({
  standalone: true,
  host: {
    '[class]': 'variantClass()',
  },
})
export abstract class BaseButtonVariantDirective {
  /** Button variant */
  abstract readonly variant: ButtonVariant | Signal<ButtonVariant>;

  /** Variant class applied to the button */
  protected readonly variantClass = computed(() => {
    const { variant } = this;
    const variantValue = isSignal(variant) ? variant() : variant;
    return `hra-button-variant-${variantValue}`;
  });
}

/** Style a mat-button to a specific named variant */
@Directive({
  selector: 'button[mat-button][hraButtonVariant], a[mat-button][hraButtonVariant]',
  standalone: true,
})
export class ButtonVariantDirective extends BaseButtonVariantDirective {
  /** Button variant */
  readonly variant = input.required<ButtonVariant>({ alias: 'hraButtonVariant' });
}

/** Style a mat-button as a primary variant button */
@Directive({
  selector: 'button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]',
  standalone: true,
})
export class PrimaryButtonVariantDirective extends BaseButtonVariantDirective {
  /** Button variant */
  readonly variant = 'primary';
}

/** Style a mat-button as a secondary variant button */
@Directive({
  selector: 'button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]',
  standalone: true,
})
export class SecondaryButtonVariantDirective extends BaseButtonVariantDirective {
  /** Button variant */
  readonly variant = 'secondary';
}
