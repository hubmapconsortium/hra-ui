/* eslint-disable @angular-eslint/no-output-on-prefix */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NodeMapEntry } from '@hra-ui/components/molecules';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { CellEntry, JsonLd, OrganData } from './models';

@Component({
  selector: 'hra-root-wc',
  template:
    '<hra-interactive-svg [url]="(url$ | async) || undefined" [mapping]="(mapping$ | async) || undefined" (nodeHover)="onHover.emit($event)" (nodeClick)="onClick.emit($event)"></hra-interactive-svg>',
  styleUrls: ['app-web-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent implements OnInit {
  /** Http client */
  private readonly http = inject(HttpClient);

  @Input() src: OrganData | string = '';

  @Input() lookupSrc: string | JsonLd = '';

  @Output() readonly onHover = new EventEmitter<NodeMapEntry>();

  @Output() readonly onClick = new EventEmitter<NodeMapEntry>();

  readonly url$ = new BehaviorSubject<string>('');

  readonly mapping$ = new BehaviorSubject<NodeMapEntry[]>([]);

  ngOnInit() {
    this.setData().subscribe();
  }

  setData(): Observable<JsonLd> {
    return this.http.get<JsonLd>('../assets/TEMP/2d-ftu-illustrations.jsonld').pipe(
      tap((result) => {
        if (typeof this.src === 'string') {
          //input is id
          const currentOrganData = result['@graph'].find((entry) => entry['@id'] === this.src);
          if (currentOrganData) {
            const illustrationFile = currentOrganData.illustration_files.find(
              (file) => file['file_format'] === 'image/svg+xml'
            );
            if (illustrationFile) {
              this.url$.next(illustrationFile.file);
            }
            this.mapping$.next(this.cellEntryToNodeEntry(currentOrganData.mapping));
          }
        } else {
          //input is organ data
          this.url$.next(this.src.illustration_files[0].file);
          this.mapping$.next(this.cellEntryToNodeEntry(this.src.mapping));
        }
      })
    );
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
