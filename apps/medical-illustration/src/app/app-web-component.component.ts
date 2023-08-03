/* eslint-disable @angular-eslint/no-output-on-prefix */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InteractiveSvgComponent, NodeMapEntry } from '@hra-ui/components/molecules';
import { parse } from 'papaparse';

export interface IllustrationData {
  url: string;
}

@Component({
  selector: 'hra-root-wc',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent implements OnInit {
  @ViewChild('illustration', { static: true }) readonly illustration?: InteractiveSvgComponent<NodeMapEntry>;

  @Input() url = '';

  @Input() mapping: unknown[] = [];

  @Output() readonly onHover = new EventEmitter<NodeMapEntry>();

  ngOnInit() {
    if (this.illustration) {
      this.illustration.url = this.url;
      parse('../assets/TEMP/mapping.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (result) => (this.mapping = result.data),
      });
    }
  }
}
