import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';

import { ApiCommandButton } from './lib/api-command.schema';

/** Displays a card for users to copy and access API information */
@Component({
  selector: 'hra-api-command',
  templateUrl: './api-command.component.html',
  styleUrl: './api-command.component.scss',
  imports: [MatCardModule, ButtonsModule, MatIconModule, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiCommandComponent {
  /** Service for copying text to clipboard */
  readonly clipboard = inject(Clipboard);

  /** The request url */
  readonly request = input.required<string>();

  /** API method to use */
  readonly method = input.required<string>();

  /** Right button info */
  readonly rightButton = input.required<ApiCommandButton>();
}
