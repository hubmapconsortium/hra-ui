import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NodeClickEvent } from 'ccf-body-ui';
import { BaseWebComponent, BUILTIN_PARSERS } from 'ccf-shared/web-components';
import { environment } from '../environments/environment';

/**
 * Parses user supplied data sources
 *
 * @param value Raw data
 * @returns Data sources
 */
function parseDataSources(value: unknown): string[] {
  const isString = (val: unknown): val is string => typeof val === 'string';
  const isStringArray = (val: unknown): val is string[] => Array.isArray(val) && val.every(isString);

  if (typeof value === 'string') {
    const json = BUILTIN_PARSERS.json(value);
    if (isStringArray(json)) {
      return json;
    }
  } else if (isStringArray(value)) {
    return value;
  }

  throw new Error('Invalid data sources');
}

/**
 * Parses user supplied data as an array of strings
 *
 * @param value Raw data
 * @returns An array of strings
 */
function parseStringArray(value: unknown): string[] {
  const isString = (val: unknown): val is string => typeof val === 'string';
  const isStringArray = (val: unknown): val is string[] => Array.isArray(val) && val.every(isString);

  if (typeof value === 'string') {
    if (value?.startsWith('[')) {
      const json = BUILTIN_PARSERS.json(value);
      if (isStringArray(json)) {
        return json;
      }
    } else {
      return [value];
    }
  } else if (isStringArray(value)) {
    return value;
  }

  throw new Error('Invalid data sources');
}

/** Web component */
@Component({
  selector: 'ccf-root-wc',
  template: `<ccf-root
    *ngIf="initialized"
    (sexChange)="sexChange.emit($event)"
    (nodeClicked)="nodeClicked.emit($event)"
    (sideChange)="sideChange.emit($event)"
  ></ccf-root>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppWebComponent extends BaseWebComponent {
  /** Organ iri */
  @Input() organIri?: string;
  /** Model sex */
  @Input() sex?: 'Both' | 'Male' | 'Female' = 'Female';
  /** Organ side */
  @Input() side?: 'Left' | 'Right' = 'Left';
  /** Data sources */
  @Input() dataSources!: string | string[];
  /** Highlight */
  @Input() highlightProviders!: string | string[];

  /** Api token */
  @Input() token!: string;

  /** Api endpoint */
  @Input() remoteApiEndpoint!: string;

  /** Donor label */
  @Input() donorLabel!: string;
  /** Rui app url */
  @Input() ruiUrl!: string;
  /** Eui app url */
  @Input() euiUrl!: string;
  /** Asctb app url */
  @Input() asctbUrl!: string;
  /** Hra portal url */
  @Input() hraPortalUrl!: string;
  /** Course url */
  @Input() onlineCourseUrl!: string;
  /** Paper url */
  @Input() paperUrl!: string;

  /** Emits when the user switches the model sex */
  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  /** Emits when the user switches organ side */
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();
  /** Emits when the user clicks a node */
  @Output() readonly nodeClicked = new EventEmitter<NodeClickEvent>();

  /** Initializes the component */
  constructor() {
    super({
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...(globalThis['dbOptions' as never] as object),
      },
      parse: {
        dataSources: parseDataSources,
        highlightProviders: parseStringArray,
      },
    });
  }
}
