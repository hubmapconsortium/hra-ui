import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Metadata } from '../../models/metadata';
import { TOOLTIP_POSITION_HORIZONTAL } from '../../shared/tooltip-position';

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

/**
 * Metadata Component
 */
@Component({
  selector: 'cde-metadata',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule, OverlayModule, NotAvailablePipe],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  readonly metadata = input.required<Metadata>();

  readonly tooltipPosition = TOOLTIP_POSITION_HORIZONTAL;

  /** Flag to check if info tooltip is open */
  tooltipOpen = false;
}
