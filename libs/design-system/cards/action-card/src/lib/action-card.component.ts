import { coerceArray } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { FilledIconDirective } from '@hra-ui/design-system/icons';
import { ActionCardVariant } from './action-card.schema';

@Component({
  selector: 'hra-action-card-action',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardActionComponent {
  readonly alignment = input<'left' | 'right'>();
}

@Component({
  selector: 'hra-action-card',
  imports: [HraCommonModule, MatDividerModule, MatIconModule, FilledIconDirective],
  templateUrl: './action-card.component.html',
  styleUrl: './action-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-action-card-variant-" + variant()',
  },
})
export class ActionCardComponent {
  readonly variant = input.required<ActionCardVariant>();
  readonly tagline = input.required<string>();
  readonly subtagline = input<string>();
  readonly image = input<string>();
  readonly icons = input([], { transform: (value: string | string[] = []) => coerceArray(value) });
}
