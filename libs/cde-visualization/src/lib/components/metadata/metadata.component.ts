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

/** Simple pipe that returns 'N/A' when the passed value is undefined */
@Pipe({
  name: 'orNA',
  standalone: true,
  pure: true,
})
export class NotAvailablePipe implements PipeTransform {
  /**
   * Replaces undefined values with the string 'N/A'
   *
   * @param value Original value
   * @returns The original value unchanged or 'N/A' if it was undefined
   */
  transform(value: unknown): unknown {
    return value !== undefined ? value : 'N/A';
  }
}

@Pipe({
  name: 'defaultTo',
  standalone: true,
  pure: true,
})
export class DefaultToPipe implements PipeTransform {
  transform<T, D>(value: T | undefined, defaultValue: D): T | D {
    return value !== undefined ? value : defaultValue;
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
    NotAvailablePipe,
    DefaultToPipe,
  ],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  readonly metadata = input.required<Metadata>();

  readonly titleLabel = computed(() => {
    const { sampleExtra } = this.metadata();
    return sampleExtra ? `Sample ${sampleExtra.type} Visualization (${sampleExtra.organ})` : 'Title';
  });

  readonly showEmptyFields = signal(false);

  readonly hasEmptyFields = computed(() => {
    const metadata = this.metadata();
    return HIDABLE_FIELDS.some((field) => metadata[field] === undefined);
  });

  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Flag to check if info tooltip is open */
  tooltipOpen = false;

  isFieldVisible(field: keyof Metadata): boolean {
    return this.showEmptyFields() || this.metadata()[field] !== undefined;
  }

  // Toggle function for the show/hide buttons
  toggleEmptyFields(): void {
    this.showEmptyFields.set(!this.showEmptyFields());
  }
}
