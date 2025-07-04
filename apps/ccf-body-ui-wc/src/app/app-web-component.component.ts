/* eslint-disable @angular-eslint/no-output-on-prefix */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { NodeClickEvent } from 'ccf-body-ui';
import { BaseWebComponent } from 'ccf-shared/web-components';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { environment } from '../environments/environment';

/** User data format */
export interface InputDataFormat {
  /** Id */
  id: string;
  /** Rui location */
  rui_location: JsonLdObj;
}

/** Parser raw user data into jsonld */
function toJsonLd(data: unknown): JsonLdObj[] {
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  return (data as InputDataFormat[]).map((d) => ({
    '@id': `http://purl.org/ccf/1.5/entity/${d.id}`,
    '@type': 'http://purl.org/ccf/latest/ccf-entity.owl#Sample',
    'http://purl.org/ccf/latest/ccf-entity.owl#has_spatial_entity': d.rui_location,
  })) as unknown as JsonLdObj[];
}

/** Web component */
@Component({
  selector: 'ccf-root-wc',
  template:
    '<ccf-root *ngIf="initialized" (onMouseEnter)="onMouseEnter.emit($event)" (onMouseLeave)="onMouseLeave.emit($event)" (onClick)="onClick.emit($event)"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppWebComponent extends BaseWebComponent {
  /** Data */
  @Input() data!: InputDataFormat[];
  /** Highlight */
  @Input() highlightID!: string;
  /** Zoom */
  @Input() zoomToID!: string;

  /** Emits when the user starts hovering a node */
  @Output() readonly onMouseEnter = new EventEmitter<SpatialSceneNode>();
  /** Emits when the user stops hovering a node */
  @Output() readonly onMouseLeave = new EventEmitter<SpatialSceneNode>();
  /** Emits when the user clicks a node */
  @Output() readonly onClick = new EventEmitter<NodeClickEvent>();

  /** Initialize the component */
  constructor() {
    super({
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...(globalThis['dbOptions' as never] as object),
      },
      parse: {
        data: toJsonLd,
      },
    });
  }
}
