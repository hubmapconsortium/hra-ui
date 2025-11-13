import { Directive } from '@angular/core';
import { ClickEventDirective } from '@hra-ui/common/analytics';

/**
 * Applies hyperlink styles when placed on an <a> tag.
 * Also attaches a click event for analytics.
 */
@Directive({
  selector: 'a[hraHyperlink]',
  host: {
    class: 'hra-text-hyperlink',
  },
  hostDirectives: [
    {
      directive: ClickEventDirective,
      inputs: ['hraClickEvent: hraHyperlink'],
    },
  ],
})
export class TextHyperlinkDirective {}
