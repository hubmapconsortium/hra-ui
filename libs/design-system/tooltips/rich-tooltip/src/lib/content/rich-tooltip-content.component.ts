import { ChangeDetectionStrategy, Component, contentChildren, Directive, TemplateRef, viewChild } from '@angular/core';
import { RichTooltipController } from '../rich-tooltip.types';

@Directive({
  selector: 'ng-template[hraRichTooltipContext]',
})
export class RichTooltipContextDirective {
  /** Types the context as `RichTooltipDirective` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(
    _dir: RichTooltipContextDirective,
    _ctx: unknown,
  ): _ctx is { $implicit: RichTooltipController } {
    return true;
  }
}

@Component({
  selector: 'hra-rich-tooltip-tagline',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTooltipTaglineComponent {}

@Component({
  selector: 'hra-rich-tooltip-content',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTooltipContentComponent {}

@Component({
  selector: 'hra-rich-tooltip-actions',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTooltipActionsComponent {}

@Directive({
  selector: '[hraRichTooltipClose]',
  host: {
    '(click)': 'controller?.close()',
  },
})
export class RichTooltipCloseDirective {
  controller?: RichTooltipController = undefined;
}

@Component({
  selector: 'hra-rich-tooltip-container',
  imports: [RichTooltipContextDirective],
  templateUrl: './rich-tooltip-content.component.html',
  styleUrl: './rich-tooltip-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'hraRichTooltipContainer',
})
export class RichTooltipContainerComponent {
  readonly template = viewChild.required('container', { read: TemplateRef<{ $implicit: RichTooltipController }> });
  readonly closeDirectives = contentChildren(RichTooltipCloseDirective, { descendants: true });
}
