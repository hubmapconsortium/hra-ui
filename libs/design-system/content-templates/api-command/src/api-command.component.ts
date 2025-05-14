import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';

import { APICommandButton } from './lib/api-command.schema';

/** Displays a card for users to copy and access API information */
@Component({
  selector: 'hra-api-command',
  templateUrl: './api-command.component.html',
  styleUrl: './api-command.component.scss',
  imports: [MatCardModule, ButtonsModule, MatIconModule, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APICommandComponent {
  /** Service for copying text to clipboard */
  private readonly clipboard = inject(Clipboard);

  /** Details of the APIs and buttons */
  readonly url = input.required<string>();

  /** API function to use */
  readonly function = input.required<string>();

  /** Left button info */
  readonly leftButton = input.required<APICommandButton>();

  /** Right button info */
  readonly rightButton = input.required<APICommandButton>();

  /** Copies data inside the card to clipboard */
  copyData(request: string) {
    this.clipboard.copy(request);
  }
}
