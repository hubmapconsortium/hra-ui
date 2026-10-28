import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ABOUT_CONTENT } from './about.content';

/** Counter to keep track of distinct instances */
let idCounter = 0;

/**
 * Describes each panel of the visualization. Rendered inside the drawer when the toolbar's Info item is clicked.
 */
@Component({
  selector: 'cde-about',
  imports: [HraCommonModule, MatIconModule, ButtonsModule, PlainTooltipDirective, ScrollingModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  /** Emits the origin of the interaction when the close button is clicked */
  readonly closeClick = output<FocusOrigin>();

  /** Id attribute for the title, used to label the drawer */
  readonly titleId = `cde-about-title-${idCounter}`;

  /** Id attribute for the description, used to describe the drawer */
  readonly descriptionId = `cde-about-description-${idCounter++}`;

  /** Text content */
  protected readonly content = ABOUT_CONTENT;

  /** Emits a close event with the origin of the click */
  protected close(event: MouseEvent): void {
    // Clicks triggered by the keyboard have no screen coordinates
    const origin = event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse';
    this.closeClick.emit(origin);
  }
}
