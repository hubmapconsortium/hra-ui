/* eslint-disable @angular-eslint/no-output-rename -- Allow rename for custom element events */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import {
  FTU_DATA_IMPL_ENDPOINTS,
  FtuDataImplEndpoints,
  FtuDataImplService,
  IllustrationMappingItem,
  Iri,
  RAW_ILLUSTRATION,
  RawCellEntry,
  RawIllustration,
  RawIllustrationFile,
  RawIllustrationsJsonld,
} from '@hra-ui/services';
import { Observable, of, OperatorFunction, ReplaySubject, switchMap } from 'rxjs';
import { z } from 'zod';

/**
 * Helper for processing data either from an url or as an object
 *
 * @param schema Data schema zod object
 * @param parse Function to call when data is directly provided
 * @param fetch Function to call when an url is provided
 * @returns Operator for getting data
 */
function selectData<T, Z extends z.ZodTypeAny>(
  schema: Z,
  parse: (data: z.infer<Z>) => T,
  fetch: (url: Iri) => Observable<T>,
): OperatorFunction<string | z.infer<Z> | undefined, T | undefined> {
  return switchMap((value) => {
    if (value === undefined) {
      return of(undefined);
    } else if (typeof value === 'string') {
      return fetch(value as Iri);
    }

    const data = schema.parse(value);
    return of(parse(data));
  });
}

/**
 * Medical illustration web component
 */
@Component({
  selector: 'hra-medical-illustration-wc',
  standalone: true,
  imports: [CommonModule, InteractiveSvgComponent],
  templateUrl: 'medical-illustration.component.html',
  styleUrls: ['medical-illustration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationComponent implements OnInit, OnChanges {
  /** Displayed illustration or an iri to lookup in either the illustrations or fetch from the remote api */
  @Input() selectedIllustration?: string | RawIllustration;

  /** Optional set of all illustrations. Used when selectedIllustration is an iri */
  @Input() illustrations: string | RawIllustrationsJsonld = '';

  /** A cell or id to highlight in the illustration */
  @Input() highlight?: string | RawCellEntry;

  /** Base href */
  @Input() baseHref = '';

  /** Emits when the user hover into or out of a cell in the illustration */
  @Output('cell-hover') readonly cellHover = new EventEmitter<RawCellEntry | undefined>();

  /** Emits when the user clicks a cell in the illustration */
  @Output('cell-click') readonly cellClick = new EventEmitter<RawCellEntry>();

  /** Get the normalized id for the highlight input */
  get highlightId(): string | undefined {
    const { highlight } = this;
    if (typeof highlight === 'object') {
      return highlight.representation_of;
    }

    return highlight;
  }

  /** Data endpoints */
  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as ReplaySubject<FtuDataImplEndpoints>;

  /** Data fetching service */
  private readonly dataService = inject(FtuDataImplService);

  /** Observable of illustration url or data */
  private readonly illustration$ = new ReplaySubject<string | RawIllustration | undefined>(1);

  /** Url to the illustration svg */
  readonly url$ = this.illustration$.pipe(
    selectData(
      RAW_ILLUSTRATION,
      ({ illustration_files: files }) => this.findSvgFile(files),
      (iri) => this.dataService.getIllustrationUrl(iri),
    ),
  );

  /** Nodes used for illustration hover and click events */
  readonly mapping$ = this.illustration$.pipe(
    selectData(
      RAW_ILLUSTRATION,
      ({ mapping }) => mapping.map(this.cellToNode),
      (iri) => this.dataService.getIllustrationMapping(iri),
    ),
  );

  /** Whether the component has run the first initialization pass */
  private initialized = false;

  /**
   * Marks the component as initialized
   */
  ngOnInit(): void {
    this.initialized = true;
  }

  /**
   * Updates the data source when inputs change
   *
   * @param changes Changed properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('baseHref' in changes || 'illustrations' in changes || !this.initialized) {
      const { baseHref, illustrations } = this;
      this.endpoints.next({
        baseHref,
        illustrations,
        datasets: '',
        summaries: '',
      });
    }

    if ('selectedIllustration' in changes) {
      this.illustration$.next(this.selectedIllustration);
    }
  }

  /**
   * Finds the first file in a svg format
   *
   * @param files Files to search
   * @returns Url to svg file or undefined if not found
   */
  private findSvgFile(files: RawIllustrationFile[]): string | undefined {
    const svgFile = files.find(({ file_format: format }) => format === 'image/svg+xml');
    return svgFile?.file;
  }

  /**
   * Converts a cell into an internal IllustrationMappingItem
   *
   * @param cell Cell to convert
   * @returns A new node with a reference to the original cell
   */
  private cellToNode(cell: RawCellEntry): IllustrationMappingItem {
    const { label, svg_id: id, svg_group_id: groupId, representation_of: ontologyId } = cell;
    return { label, id, groupId, ontologyId, source: cell };
  }
}
