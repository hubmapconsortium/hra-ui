import { FocusOrigin } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  Pipe,
  PipeTransform,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { Metadata } from '../../models/metadata';
import { DOWNLOADS_CONTENT } from '../downloads/downloads.content';
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
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    DefaultToPipe,
    WithoutProtocolPipe,
    MatMenuModule,
    PlainTooltipDirective,
    ButtonsModule,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    SkeletonComponent,
  ],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  /** Input for Metadata Component */
  readonly metadata = input.required<Metadata>();

  /** Whether the downloads drawer is open */
  readonly downloadsOpen = input(false);

  /** Whether the metadata is loading, which shows skeleton rows in place of the fields */
  readonly loading = input(false);

  /** Emits when the downloads button is clicked */
  readonly downloadsClick = output<void>();

  /** Skeleton rows shown while the metadata loads */
  protected readonly skeletonRows = SKELETON_ROWS;

  /** Label and tooltip for the downloads button */
  protected readonly downloadsLabel = DOWNLOADS_CONTENT.title;

  /** Downloads button */
  private readonly downloadsButton = viewChild.required('downloadsButton', { read: MatIconButton });

  /** Defines a reactive signal to track the visibility of empty fields */
  readonly showEmptyFields = signal(false);

  /** Defines a computed property to check for fields that show only with all metadata: empty ones and placeholders */
  readonly hasEmptyFields = computed(() => {
    const metadata = this.metadata();
    return HIDABLE_FIELDS.some((field) => metadata[field] === undefined || this.isPlaceholder(field));
  });

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
    return this.showEmptyFields() || (value !== undefined && value !== '' && !this.isPlaceholder(field));
  }

  /** Checks if a field holds a placeholder value, which example datasets have in place of real metadata */
  private isPlaceholder(field: keyof Metadata): boolean {
    return this.metadata().sampleExtra !== undefined && EXAMPLE_PLACEHOLDER_FIELDS.includes(field);
  }

  /** Toggle function for the show/hide buttons */
  toggleEmptyFields(): void {
    this.showEmptyFields.set(!this.showEmptyFields());
  }

  /** Moves focus to the downloads button */
  focusDownloadsButton(origin: FocusOrigin): void {
    this.downloadsButton().focus(origin);
  }

  /** Formats the creation timestamp using a given formatter */
  formatCreationTimestamp(format: Intl.DateTimeFormat): string | undefined {
    if (this.metadata().creationTimestamp === undefined) {
      return undefined;
    }

    return format.format(this.metadata().creationTimestamp);
  }
}
