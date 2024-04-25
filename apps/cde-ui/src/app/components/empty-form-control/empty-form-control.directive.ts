import { ChangeDetectorRef, Directive, OnInit, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cdeMarkEmptyFormControl]',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.empty]': 'empty',
  },
})
export class MarkEmptyFormControlDirective implements OnInit {
  empty = true;

  private readonly control = inject(NgControl, { self: true });
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.control.valueChanges?.subscribe((value) => {
      this.empty = !value;
      this.cdr.markForCheck();
    });
  }
}
