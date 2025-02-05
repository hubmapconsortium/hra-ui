import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

@Component({
  selector: 'cde-histogram-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, IconButtonSizeDirective, ButtonsModule],
  templateUrl: './histogram-menu.component.html',
  styleUrl: './histogram-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramMenuComponent {
  /** Flag to check if dialog is opened */
  readonly dialogOpen = input(false, { transform: booleanAttribute });
  /** Event to emit when dialog is opened */
  readonly open = output();
  /** Event to emit to download assets */
  readonly download = output<string>();
}
