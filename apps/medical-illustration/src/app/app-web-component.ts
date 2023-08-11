import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { NodeMapEntry } from '@hra-ui/components/molecules';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { CellEntry, IllustrationData, JsonLd } from './models';

/**
 * Medical illustration web component
 */
@Component({
  selector: 'hra-root-wc',
  templateUrl: 'app-web-component.html',
  styleUrls: ['app-web-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent implements OnChanges {
  /** Http client */
  private readonly http = inject(HttpClient);

  /** Ftu illustrations file: can be url or file object */
  @Input() lookupSrc: string | JsonLd = '';

  /** Illustration info: can be illustration id or illustration data object */
  @Input() illustrationSrc: string | IllustrationData = '';

  @Input() highlightedNodeGroup = '';

  /** Emits node data when node hovered */
  @Output() readonly nodeHovered = new EventEmitter<NodeMapEntry>();

  /** Emits node data when node clicked */
  @Output() readonly nodeClicked = new EventEmitter<NodeMapEntry>();

  /** Illustration svg url */
  readonly url$ = new BehaviorSubject<string>('');

  /** Mapping data */
  readonly mapping$ = new BehaviorSubject<NodeMapEntry[]>([]);

  readonly highlight$ = new BehaviorSubject<string>('');

  /**
   * Sets illustration url and mapping data on input changes
   */
  ngOnChanges() {
    this.highlight$.next(this.highlightedNodeGroup);
    if (typeof this.lookupSrc === 'string') {
      this.getData(this.illustrationSrc, this.lookupSrc).subscribe();
    } else {
      // if lookupSrc is a json file
      this.setUrlAndMapping(this.lookupSrc, this.illustrationSrc);
    }
  }

  /**
   * Gets illustration data and sets illustration url and mapping data
   * @param illustrationSrc Illustration src
   * @param lookupSrc Lookup src
   * @returns Observable
   */
  private getData(illustrationSrc: IllustrationData | string, lookupSrc: string): Observable<JsonLd> {
    return this.http.get<JsonLd>(lookupSrc).pipe(
      tap((result) => {
        this.setUrlAndMapping(result, illustrationSrc);
      })
    );
  }

  /**
   * Finds and sets illustration url and mapping data
   * @param illustrationFile Illustration data file
   * @param illustrationSrc Illustration src
   */
  private setUrlAndMapping(illustrationFile: JsonLd, illustrationSrc: IllustrationData | string) {
    if (typeof illustrationSrc === 'string') {
      // input src is id
      const currentOrganData = illustrationFile['@graph'].find((entry) => entry['@id'] === this.illustrationSrc);
      if (currentOrganData) {
        const illustrationFile = currentOrganData.illustration_files.find(
          (file) => file['file_format'] === 'image/svg+xml'
        );
        if (illustrationFile) {
          this.url$.next(illustrationFile.file);
          this.mapping$.next(this.cellEntryToNodeEntry(currentOrganData.mapping));
        }
      }
    } else {
      // input src is organ data
      if (illustrationSrc) {
        const illustrationFile = illustrationSrc.illustration_files.find(
          (file) => file['file_format'] === 'image/svg+xml'
        );
        if (illustrationFile) {
          this.url$.next(illustrationFile.file);
          this.mapping$.next(this.cellEntryToNodeEntry(illustrationSrc.mapping));
        }
      }
    }
  }

  /**
   * Converts cell entry in data entry to node entry
   * @param data Array of cell entries
   * @returns Array of node entries
   */
  private cellEntryToNodeEntry(data: CellEntry[]): NodeMapEntry[] {
    return data.map((entry) => {
      return {
        label: entry.label,
        name: entry.svg_id,
      };
    });
  }
}
