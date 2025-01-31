import { Directive } from '@angular/core';

/** Applies hyperlink styles when placed on an <a> tag */
@Directive({
  selector: 'a[hraHyperlink]',
  standalone: true,
  host: {
    class: 'hra-text-hyperlink',
  },
})
export class TextHyperlinkDirective {}
