import { Directive } from '@angular/core';
import { ClickEventDirective } from '@hra-ui/common/analytics';

/**
 * Applies text hyperlink styles when placed on a <button> tag.
 * Also attaches a click event for analytics.
 */
@Directive({
  selector: 'button[hraTextButton]',
  host: {
    class: 'hra-text-button',
  },
  hostDirectives: [
    {
      directive: ClickEventDirective,
      inputs: ['hraClickEvent: hraTextButton'],
    },
  ],
})
export class TextButtonDirective {}
