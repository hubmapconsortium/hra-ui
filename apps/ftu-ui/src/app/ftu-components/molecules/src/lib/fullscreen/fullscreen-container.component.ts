import { ChangeDetectionStrategy, Component, input, model, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { IconsModule } from '@hra-ui/design-system/icons';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/** A component that wraps any child components of type FullscreenContentComponent and
 * sets their isFullScreen property to true or false based on its own fullscreen input property
 */
@Component({
  selector: 'ftu-fullscreen-container',
  imports: [CommonModule, MatTabsModule, IconsModule, MatIconModule, ButtonsModule],
  templateUrl: './fullscreen-container.component.html',
  styleUrl: './fullscreen-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenContainerComponent {
  readonly illustrationTemplate = input<TemplateRef<unknown> | null>(null);
  readonly biomarkerTemplate = input<TemplateRef<unknown> | null>(null);
  readonly sourceListTemplate = input<TemplateRef<unknown> | null>(null);

  /** A boolean input property that controls the fullscreen mode */
  readonly fullscreen = input<boolean>(false);

  readonly fullscreentabIndex = model<number>(0);

  readonly closeFullscreen = output();
}
