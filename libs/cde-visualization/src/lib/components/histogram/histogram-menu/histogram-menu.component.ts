import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

@Component({
  selector: 'cde-histogram-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, IconButtonSizeDirective, ButtonModule],
  templateUrl: './histogram-menu.component.html',
  styleUrl: './histogram-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramMenuComponent {
  dialogOpen = input(false, { transform: booleanAttribute });
  readonly open = output();
  readonly download = output<string>();
}
