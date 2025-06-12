import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

/**
 * Button to give users an option to delete their file if they upload the wrong file
 */
@Component({
  selector: 'hra-delete-file-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, IconButtonSizeDirective],
  templateUrl: './delete-file-button.component.html',
  styleUrl: './delete-file-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFileButtonComponent {
  /** File name */
  readonly fileName = input.required<string>();

  /** Cancels load */
  readonly cancelLoad = output<void>();
}
