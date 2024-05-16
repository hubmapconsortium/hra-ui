import { Directive, OnInit, inject, signal } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directive that adds an `empty` class to form control elements
 * when the control has no value.
 */
@Directive({
  selector: '[cdeMarkEmptyFormControl]',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.empty]': 'isEmpty()',
  },
})
export class MarkEmptyFormControlDirective implements OnInit {
  /** Whether the form is empty */
  readonly isEmpty = signal(true);

  /** Reference to the form control */
  private readonly control = inject(NgControl, { self: true });

  /** Binds the form control state to the isEmpty signal */
  ngOnInit(): void {
    this.control.valueChanges?.subscribe((value) => this.isEmpty.set(!value));
  }
}
