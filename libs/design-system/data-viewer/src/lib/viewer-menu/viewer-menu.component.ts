import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ReleaseVersionData } from '../types/data-viewer.schema';

/**
 * Menu to be used to access/download data in the data viewer header
 */
@Component({
  selector: 'hra-viewer-menu',
  imports: [HraCommonModule, ButtonsModule, MatDividerModule, MatIconModule, MatMenuModule],
  templateUrl: './viewer-menu.component.html',
  styleUrl: './viewer-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerMenuComponent {
  /** Link to the HRA Organ Icons GitHub repository */
  readonly githubIconsUrl = input.required<string>();

  /** Current selected release version */
  readonly currentVersion = input.required<ReleaseVersionData>();

  /** Reference to menu component */
  readonly menu = viewChild.required('menu', { read: MatMenu });
}
