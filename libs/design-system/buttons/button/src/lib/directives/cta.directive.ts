import { Directive } from '@angular/core';

/** Turns a mat-button into a call-to-action styled button */
@Directive({
  selector: 'button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]',
  standalone: true,
  host: {
    class: 'hra-cta-button',
  },
})
export class CtaButtonDirective {}
