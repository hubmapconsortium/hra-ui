import { Directive } from '@angular/core';
import { ClickEventDirective } from '@hra-ui/common/analytics';

/**
 * Applies hyperlink styles when placed on an <a> tag.
 * Also attaches a click event for analytics.
 */
@Directive({
  selector: 'a[hraHyperlink]',
  hostDirectives: [
    {
      directive: ClickEventDirective,
      inputs: ['hraClickEvent: hraHyperlink'],
    },
  ],
  host: {
    class: 'hra-text-hyperlink',
  },
})
export class TextHyperlinkDirective {}

/**
 * Applies hyperlink styles when placed on a <button> tag.
 * Styles the button as a text hyperlink with underline.
 * Also attaches a click event for analytics.
 */
@Directive({
  selector: 'button[hraTextButton]',
  hostDirectives: [
    {
      directive: ClickEventDirective,
      inputs: ['hraClickEvent: hraTextButton'],
    },
  ],
  host: {
    class: 'hra-text-hyperlink-button',
  },
})
export class TextHyperlinkButtonDirective {}
