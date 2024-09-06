import { Directive } from '@angular/core';

/** Directive for Call to Action Button */
@Directive({
  selector: '[hraCallToActionButton]',
  standalone: true,
  host: {
    class: 'cta-button',
  },
})
export class CallToActionButtonDirective {}
