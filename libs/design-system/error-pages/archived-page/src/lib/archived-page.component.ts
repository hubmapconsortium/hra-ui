import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Highlight } from 'ngx-highlightjs';

/**
 * Redirect Page Component
 * - Displays a loading page with an indeterminate progress spinner while redirecting
 */
@Component({
  selector: 'hra-archived-page',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, RouterModule, Highlight],
  templateUrl: './archived-page.component.html',
  styleUrl: './archived-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedPageComponent {
  /** Path of the archived page that the user is requesting */
  readonly archivedPath = input.required<string>();
}
