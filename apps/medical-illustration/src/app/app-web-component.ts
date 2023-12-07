import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IllustrationMappingItem } from '@hra-ui/services';
import { Observable, tap } from 'rxjs';

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

  /** Ontology id to highlight */
  @Input() highlightId = '';

  /** Base url */
  @Input() baseHref = '';

  /** Emits node data when node hovered */
  @Output() readonly nodeHovered = new EventEmitter<IllustrationMappingItem>();

  /** Emits node data when node clicked */
  @Output() readonly nodeClicked = new EventEmitter<IllustrationMappingItem>();

  url = '';

  /** Mapping data */
  mapping: IllustrationMappingItem[] = [];

  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * Sets illustration url and mapping data on input changes
   */
  ngOnChanges() {
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
    return this.http.get<JsonLd>(this.baseHref + lookupSrc, { responseType: 'json' }).pipe(
      tap((result) => {
        this.setUrlAndMapping(result, illustrationSrc);
      })
    );
  }

  /**
   * Finds and sets illustration url and mapping data
   * @param illustrationFile Illustration jsonld
   * @param illustrationSrc Illustration data
   */
  private setUrlAndMapping(illustrationFile: JsonLd, illustrationSrc: IllustrationData | string) {
    if (typeof illustrationSrc === 'string') {
      // input src is id
      const currentOrganData = illustrationFile['@graph'].find((entry) => entry['@id'] === this.illustrationSrc);
      this.setUrlandMappingValues(currentOrganData);
    } else {
      // input src is organ data
      this.setUrlandMappingValues(illustrationSrc);
    }
  }

  /**
   * Sets url and mapping values
   * @param illustrationSrc Illustration data
   */
  private setUrlandMappingValues(illustrationSrc?: IllustrationData) {
    if (illustrationSrc) {
      const illustrationFile = illustrationSrc.illustration_files.find(
        (file) => file['file_format'] === 'image/svg+xml'
      );
      if (illustrationFile) {
        this.url = this.baseHref + illustrationFile.file;
        console.warn(this.url);
        this.mapping = this.cellEntryToNodeEntry(illustrationSrc.mapping);
        this.cdr.markForCheck();
      }
    }
  }

  /**
   * Converts cell entry in data entry to node entry
   * @param data Array of cell entries
   * @returns Array of node entries
   */
  private cellEntryToNodeEntry(data: CellEntry[]): IllustrationMappingItem[] {
    return data.map((entry) => {
      return {
        label: entry.label,
        id: entry.svg_id,
        groupId: entry.svg_group_id,
        ontologyId: entry.representation_of.split('/').slice(-1)[0],
      };
    });
  }
}
