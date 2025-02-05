import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'cde-violin-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, IconButtonSizeDirective, ButtonsModule],
  templateUrl: './violin-menu.component.html',
  styleUrl: './violin-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolinMenuComponent {
  /** Flag to check if dialog is opened */
  readonly dialogOpen = input(false, { transform: booleanAttribute });
  /** Event to emit when dialog is opened */
  readonly open = output();
  /** Event to emit to download assets */
  readonly download = output<string>();
}
