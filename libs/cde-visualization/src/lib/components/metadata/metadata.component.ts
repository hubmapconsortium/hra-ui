import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelComponent } from '@hra-ui/design-system/expansion-panel';
import { Metadata } from '../../models/metadata';
import { SkeletonComponent } from '../skeleton/skeleton.component';

/** List of metadata fields that can be hidden */
const HIDABLE_FIELDS: (keyof Metadata)[] = [
  'title',
  'sourceFileName',
  'colorMapFileName',
  'organ',
  'technology',
  'sex',
  'age',
  'thickness',
  'pixelSize',
  'creationTimestamp',
];

/** Fields that example datasets show only with all metadata, since their values are placeholders */
const EXAMPLE_PLACEHOLDER_FIELDS: (keyof Metadata)[] = ['creationTimestamp'];

/**
 * Checks whether a field holds a placeholder value, which example datasets have in place of real metadata
 *
 * @param metadata Metadata to check
 * @param field Field to check
 * @returns Whether the field holds a placeholder
 */
function isPlaceholder(metadata: Metadata, field: keyof Metadata): boolean {
  return metadata.sampleExtra !== undefined && EXAMPLE_PLACEHOLDER_FIELDS.includes(field);
}

/**
 * Checks whether the metadata has fields that only show with all metadata: empty ones and placeholders
 *
 * @param metadata Metadata to check
 * @returns Whether any field is hidden until all metadata shows
 */
export function hasHiddenFields(metadata: Metadata): boolean {
  return HIDABLE_FIELDS.some((field) => metadata[field] === undefined || isPlaceholder(metadata, field));
}

/** Label and value widths of the skeleton rows shown while the metadata loads, varied like real rows */
const SKELETON_ROWS = [
  { label: '8.5rem', value: '90%' },
  { label: '6rem', value: '70%' },
  { label: '3.5rem', value: '45%' },
  { label: '6.5rem', value: '30%' },
  { label: '8rem', value: '15%' },
  { label: '7rem', value: '55%' },
];

/** Defines a pipe that provides a default value if the input is undefined or empty */
@Pipe({
  name: 'defaultTo',
  pure: true,
})
export class DefaultToPipe implements PipeTransform {
  transform<T, D>(value: T | undefined, defaultValue: D): T | D {
    return value !== undefined && value !== '' ? value : defaultValue;
  }
}

/** Defines a pipe that drops a URL's protocol, so a link reads as `doi.org/...` instead of `https://doi.org/...` */
@Pipe({
  name: 'withoutProtocol',
  pure: true,
})
export class WithoutProtocolPipe implements PipeTransform {
  transform(url: string): string {
    return url.replace(/^https?:\/\//, '');
  }
}

/**
 * Metadata Component
 */
@Component({
  selector: 'cde-metadata',
  imports: [
    HraCommonModule,
    MatExpansionModule,
    DefaultToPipe,
    WithoutProtocolPipe,
    ButtonsModule,
    ExpansionPanelComponent,
    SkeletonComponent,
  ],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  /** Input for Metadata Component */
  readonly metadata = input.required<Metadata>();

  /** Whether the metadata is loading, which shows skeleton rows in place of the fields */
  readonly loading = input(false);

  /** Skeleton rows shown while the metadata loads */
  protected readonly skeletonRows = SKELETON_ROWS;

  /** Whether every field shows, including empty ones and placeholders. Set from the toolbar's Display menu. */
  readonly showEmptyFields = input(false);

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

  /** Checks if a field is visible based on its value and the showEmptyFields signal */
  isFieldVisible(field: keyof Metadata): boolean {
    if (this.loading()) {
      return false;
    }

    const value = this.metadata()[field];
    return this.showEmptyFields() || (value !== undefined && value !== '' && !isPlaceholder(this.metadata(), field));
  }

  /** Formats the creation timestamp using a given formatter */
  formatCreationTimestamp(format: Intl.DateTimeFormat): string | undefined {
    if (this.metadata().creationTimestamp === undefined) {
      return undefined;
    }

    return format.format(this.metadata().creationTimestamp);
  }
}
