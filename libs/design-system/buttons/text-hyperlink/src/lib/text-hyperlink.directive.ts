import { Directive } from '@angular/core';

@Directive({
  selector: 'a[hraHyperlink]',
  standalone: true,
  host: {
    class: 'hra-text-hyperlink',
  },
})
export class TextHyperlinkDirective {}
