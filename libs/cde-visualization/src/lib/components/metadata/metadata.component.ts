import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Metadata } from '../../models/metadata';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';

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
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule, OverlayModule, DefaultToPipe],
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

  isFieldVisible(field: keyof Metadata): boolean {
    return this.showEmptyFields() || this.metadata()[field] !== undefined;
  }

  /** Toggle function for the show/hide buttons */
  toggleEmptyFields(): void {
    this.showEmptyFields.set(!this.showEmptyFields());
  }

  /** Formats the creation timestamp using a given formatter */
  formatCreationTimestamp(format: Intl.DateTimeFormat): string | undefined {
    return format.format(this.metadata().creationTimestamp);
  }
}
