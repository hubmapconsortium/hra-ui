/* eslint-disable @angular-eslint/no-output-on-prefix */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { dispatch } from '@hra-ui/cdk/injectors';
import { NodeMapEntry } from '@hra-ui/components/molecules';
import { IllustratorActions } from '@hra-ui/state';

import AllIllustrationData from '../assets/TEMP/illustration-data.json';

export interface OrganData {
  [key: string]: unknown;
  illustration_files: IllustrationFileData[];
  mapping: CellEntry[];
}

export interface IllustrationFileData {
  [key: string]: unknown;
  file: string;
}

export interface CellEntry {
  [key: string]: unknown;
  label: string;
  svgId: string;
}

@Component({
  selector: 'hra-root-wc',
  template:
    '<hra-interactive-svg [url]="url" [mapping]="mapping" (nodeHover)="onHover.emit($event)"></hra-interactive-svg>',
  styleUrls: ['app-web-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent implements OnChanges {
  readonly updateNode = dispatch(IllustratorActions.SetSelection);

  @Input() input: OrganData | string = '';

  @Output() readonly onHover = new EventEmitter<NodeMapEntry>();

  url = '';

  mapping: NodeMapEntry[] = [];

  ngOnChanges() {
    if (typeof this.input === 'string') {
      //input is id
      const currentOrganData = AllIllustrationData['@graph'].find((entry) => entry['@id'] === this.input);
      if (currentOrganData) {
        this.url = currentOrganData.illustration_files[0].file;
        this.mapping = this.cellEntryToNodeEntry(currentOrganData.mapping);
      }
    } else {
      //input is organ data
      this.url = this.input.illustration_files[0].file;
      this.mapping = this.cellEntryToNodeEntry(this.input.mapping);
    }
  }

  private cellEntryToNodeEntry(data: CellEntry[]): NodeMapEntry[] {
    return data.map((entry) => {
      return {
        label: entry.label,
        name: entry.svgId,
      };
    });
  }
}
