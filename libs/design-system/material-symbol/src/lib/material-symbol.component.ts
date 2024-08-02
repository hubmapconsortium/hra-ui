import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** All material icons used in HRA */
export const ALL_ICONS = [
  'arrow_drop_up',
  'arrow_drop_down',
  'arrow_right',
  'upload',
  'download',
  'arrow_right_alt',
  'arrow_left_alt',
  'arrow_upward_alt',
  'arrow_downward_alt',
  'play_circle',
  'mail',
  'code',
  'fullscreen',
  'fullscreen_exit',
  'info',
  'expand_all',
  'collapse_all',
  'more_vert',
  'check_box',
  'check_box_outline_blank',
  'apps',
  'close',
  'keyboard_arrow_up',
  'keyboard_arrow_down',
  'remove',
  'add',
  'chevron_right',
  'filter_list',
  'link',
  'copyright',
  'search',
  'api',
  'database',
  'menu',
  'check',
  'anchor',
  'restart_alt',
];

/**
 * Component to demonstrate material symbols used in HRA interfaces
 */
@Component({
  selector: 'hra-material-symbol',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './material-symbol.component.html',
  styleUrl: './material-symbol.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.small]': 'small()',
  },
})
export class MaterialSymbolComponent {
  /** True if small size (20px) */
  readonly small = input<boolean>(false);

  /** Icon to display */
  readonly icon = input.required<string>();
}
