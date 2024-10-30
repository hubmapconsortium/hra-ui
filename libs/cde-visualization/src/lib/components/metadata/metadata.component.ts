import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Metadata } from '../../models/metadata';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { ButtonSizeDirective } from '@hra-ui/design-system/button';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { TooltipContent } from '@hra-ui/design-system/tooltip-card';

/** List of metadata fields that can be hidden */
const HIDABLE_FIELDS: (keyof Metadata)[] = [
  'title',
  'colorMap',
  'organ',
  'technology',
  'sex',
  'age',
  'thickness',
  'pixelSize',
];

/** Defines a pipe that provides a default value if the input is undefined or empty */
@Pipe({
  name: 'defaultTo',
  standalone: true,
  pure: true,
})
export class DefaultToPipe implements PipeTransform {
  transform<T, D>(value: T | undefined, defaultValue: D): T | D {
    return value !== undefined && value !== '' ? value : defaultValue;
  }
}

/**
 * Metadata Component
 */
@Component({
  selector: 'cde-metadata',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    OverlayModule,
    DefaultToPipe,
    MatMenuModule,
    IconButtonSizeDirective,
    IconButtonSizeDirective,
    MicroTooltipDirective,
    ButtonSizeDirective,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
  ],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  /** Input for Metadata Component */
  readonly metadata = input.required<Metadata>();

  /** Defines a computed property for the title label */
  readonly titleLabel = computed(() => {
    const { sampleExtra } = this.metadata();
    return sampleExtra ? `Sample ${sampleExtra.type} Visualization (${sampleExtra.organ})` : 'Title';
  });

  /** Defines a reactive signal to track the visibility of empty fields */
  readonly showEmptyFields = signal(false);

  /** Defines a computed property to check for empty fields */
  readonly hasEmptyFields = computed(() => {
    const metadata = this.metadata();
    return HIDABLE_FIELDS.some((field) => metadata[field] === undefined);
  });

  /** Sets the tooltip position to the right side */
  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Tooltip content */
  readonly tooltipContent: TooltipContent[] = [
    {
      description: 'Visualization metadata for the sample dataset. Sample files may be viewed in Google Sheets.',
    },
  ];

  /** Creates a date formatter with default locale */
  readonly dateFormat = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /** Creates a time formatter with default locale */
  readonly timeFormat = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  /** Flag to check if info tooltip is open */
  tooltipOpen = false;

  /** Checks if a field is visible based on its value and the showEmptyFields signal */
  isFieldVisible(field: keyof Metadata): boolean {
    const value = this.metadata()[field];
    return this.showEmptyFields() || (value !== undefined && value !== '');
  }

  /** Toggle function for the show/hide buttons */
  toggleEmptyFields(): void {
    this.showEmptyFields.set(!this.showEmptyFields());
  }

  /** Formats the creation timestamp using a given formatter */
  formatCreationTimestamp(format: Intl.DateTimeFormat): string | undefined {
    return format.format(this.metadata().creationTimestamp);
  }

  /** Toggles the expansion panel only if clicked on the expansion indicator */
  togglePanel(event: MouseEvent, panel: MatExpansionPanel): void {
    if (!this.isExpansionIndicator(event.target as HTMLElement)) {
      panel.toggle();
    } else {
      event.stopPropagation();
    }
  }

  /** Returns if click target contains expansion indicator class */
  private isExpansionIndicator(target: HTMLElement): boolean {
    return target.classList.contains('expansion-indicator');
  }
}
