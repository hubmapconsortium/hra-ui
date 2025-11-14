import { Directive } from '@angular/core';
import { ClickEventDirective } from '@hra-ui/common/analytics';

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
