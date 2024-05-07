/* eslint-disable @angular-eslint/no-output-rename -- Allow rename for custom element events */
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, of, ReplaySubject, share, switchAll, tap } from 'rxjs';
import {
  CellEntry,
  CellEntryNode,
  ILLUSTRATION,
  Illustration,
  IllustrationFile,
  ILLUSTRATIONS_JSONLD,
  IllustrationsJsonld,
} from './medical-illustration.models';

/** Empty illustration object used as fallback in observable pipelines */
const EMPTY_ILLUSTRATION: Illustration = {
  '@id': '',
  mapping: [],
  illustration_files: [],
};

/** Input properties that affect the data source */
const DATA_SOURCE_INPUT_PROPERTIES: (keyof MedicalIllustrationComponent)[] = [
  'selectedIllustration',
  'illustrations',
  'remoteApiEndpoint',
];

/**
 * Medical illustration web component
 */
@Component({
  selector: 'hra-medical-illustration-wc',
  templateUrl: 'medical-illustration.component.html',
  styleUrls: ['medical-illustration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationComponent implements OnChanges {
  /** Displayed illustration or an iri to lookup in either the illustrations or fetch from the remote api */
  @Input() selectedIllustration: string | Illustration = '';

  /** Optional set of all illustrations. Used when selectedIllustration is an iri */
  @Input() illustrations?: IllustrationsJsonld;

  /** Remote endpoint to fetch all illustrations from. Used when selectedIllustration is an iri */
  @Input() remoteApiEndpoint?: string;

  /** A cell or id to highlight in the illustration */
  @Input() highlight?: string | CellEntry;

  /** Emits when the user hover into or out of a cell in the illustration */
  @Output('node-hover') readonly nodeHover = new EventEmitter<CellEntry | undefined>();

  /** Emits when the user clicks a cell in the illustration */
  @Output('node-click') readonly nodeClick = new EventEmitter<CellEntry>();

  /** Get the normalized id for the highlight input */
  get highlightId(): string | undefined {
    const { highlight } = this;
    if (typeof highlight === 'object') {
      return highlight.representation_of;
    }

    return highlight;
  }

  /** Higher order observable of illustration data */
  private readonly illustration$$ = new ReplaySubject<Observable<Illustration>>(1);

  /** Current illustration data */
  private readonly illustration$ = this.illustration$$.pipe(switchAll(), distinctUntilChanged(), share());

  /** Url to the illustration svg */
  readonly url$ = this.illustration$.pipe(map(({ illustration_files: files }) => this.findSvgFile(files)));

  /** Nodes used for illustration hover and click events */
  readonly mapping$ = this.illustration$.pipe(map(({ mapping }) => mapping.map(this.cellToNode)));

  /** Http client */
  private readonly http = inject(HttpClient);

  /** Cached data from remote api requests */
  private cachedRemoteApiData?: IllustrationsJsonld = undefined;

  /**
   * Updates the data source when inputs change
   *
   * @param changes Changed properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('remoteApiEndpoint' in changes) {
      this.cachedRemoteApiData = undefined;
    }

    if (DATA_SOURCE_INPUT_PROPERTIES.some((input) => input in changes)) {
      this.updateDataSource();
    }
  }

  /**
   * Updates the data source based on user inputs
   */
  private updateDataSource(): void {
    const { selectedIllustration, illustration$$ } = this;
    let dataSource: Observable<Illustration>;

    if (!selectedIllustration) {
      dataSource = of(EMPTY_ILLUSTRATION);
    } else if (typeof selectedIllustration !== 'string') {
      dataSource = of(ILLUSTRATION.parse(selectedIllustration));
    } else {
      dataSource = this.loadIllustrations().pipe(
        map(({ '@graph': graph }) => this.findIllustration(graph, selectedIllustration)),
        map((value) => value ?? EMPTY_ILLUSTRATION),
      );
    }

    illustration$$.next(dataSource);
  }

  /**
   * Loads illustrations jsonld data
   *
   * @returns Validated jsonld data
   */
  private loadIllustrations(): Observable<IllustrationsJsonld> {
    const { illustrations, remoteApiEndpoint, cachedRemoteApiData } = this;

    if (illustrations) {
      return of(ILLUSTRATIONS_JSONLD.parse(illustrations));
    } else if (cachedRemoteApiData) {
      return of(cachedRemoteApiData);
    } else if (remoteApiEndpoint) {
      return this.http.get<IllustrationsJsonld>(remoteApiEndpoint, { responseType: 'json' }).pipe(
        map((jsonld) => ILLUSTRATIONS_JSONLD.parse(jsonld)),
        tap((data) => {
          if (this.remoteApiEndpoint === remoteApiEndpoint) {
            this.cachedRemoteApiData = data;
          }
        }),
      );
    }

    throw new Error('selectedIllustration is an id but neither illustrations or remoteApiEndpoint is set');
  }

  /**
   * Finds the first illustration with a matching id
   *
   * @param illustrations Data to search
   * @param id Id of illustration to find
   * @returns Illustration data or undefined if not found
   */
  private findIllustration(illustrations: Illustration[], id: string): Illustration | undefined {
    return illustrations.find((item) => item['@id'] === id);
  }

  /**
   * Finds the first file in a svg format
   *
   * @param files Files to search
   * @returns Url to svg file or undefined if not found
   */
  private findSvgFile(files: IllustrationFile[]): string | undefined {
    const svgFile = files.find(({ file_format: format }) => format === 'image/svg+xml');
    return svgFile?.file;
  }

  /**
   * Converts a cell into an internal NodeMapEntry
   *
   * @param cell Cell to convert
   * @returns A new node with a reference to the original cell
   */
  private cellToNode(cell: CellEntry): CellEntryNode {
    const { label, svg_id: id, svg_group_id: groupId, representation_of: ontologyId } = cell;
    return { label, id, groupId, ontologyId, cell };
  }
}
