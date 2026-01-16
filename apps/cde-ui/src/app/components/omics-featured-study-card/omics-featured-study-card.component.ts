import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { AnalyticsModule } from '@hra-ui/common/analytics';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CollectionCardActionComponent, CollectionCardComponent } from '@hra-ui/design-system/cards/collection-card';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/** Wrapper component for featuring spatial omics studies */
@Component({
  selector: 'cde-omics-featured-study-card',
  imports: [
    HraCommonModule,
    CollectionCardComponent,
    CollectionCardActionComponent,
    MatIconModule,
    ButtonsModule,
    MatMenuModule,
    AnalyticsModule,
    LinkDirective,
    PlainTooltipDirective,
  ],
  templateUrl: './omics-featured-study-card.component.html',
  styleUrl: './omics-featured-study-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmicsFeaturedStudyCardComponent {
  /** The tagline to display */
  readonly tagline = input.required<string>();

  /** The image to display */
  readonly image = input<string>();

  /** The tagline chips to display */
  readonly taglineChips = input<string[]>([]);

  /** The label to display */
  readonly label = input<string>();

  /** The supporting text to display */
  readonly supportingText = input<string>();

  /** The tags to display */
  readonly tags = input<{ icon: string; text: string }[]>([]);
}
