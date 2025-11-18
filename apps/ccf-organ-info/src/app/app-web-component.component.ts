import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NodeClickEvent } from 'ccf-body-ui';
import { BaseWebComponent, BUILTIN_PARSERS } from 'ccf-shared/web-components';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

/** Type for Sex */
export type Sex = 'Both' | 'Male' | 'Female';

/** Type for Side */
export type Side = 'Left' | 'Right';

/**
 * Function to parse value of type Sex
 * @param value Value to parse
 * @returns
 */
function parseSex(value: unknown): Sex {
  const str = String(value).trim().toLowerCase();
  switch (str) {
    case 'male':
      return 'Male';
    case 'female':
      return 'Female';
    case 'both':
      return 'Both';
    default:
      return 'Female';
  }
}

/**
 * Function to parse value of type Side
 * @param value Value to parse
 * @returns
 */
function parseSide(value: unknown): Side {
  const str = String(value).trim().toLowerCase();

  if (str === 'left') {
    return 'Left';
  } else if (str === 'right') {
    return 'Right';
  }
  return 'Left';
}

/**
 * Parses user supplied data sources
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
  imports: [AppComponent, NgIf],
  template: `<ccf-root
    *ngIf="initialized"
    (sexChange)="sexChange.emit($event)"
    (nodeClicked)="nodeClicked.emit($event)"
    (sideChange)="sideChange.emit($event)"
  ></ccf-root>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent extends BaseWebComponent {
  /** Organ iri */
  readonly organIri = input<string>();
  /** Model sex */
  readonly sex = input('Female', { transform: parseSex });
  /** Organ side */
  readonly side = input('Left', { transform: parseSide });
  /** Data sources */
  readonly dataSources = input([], { transform: parseDataSources });
  /** Highlight */
  readonly highlightProviders = input([], { transform: parseStringArray });

  /** Api token */
  readonly token = input<string>();

  /** Api endpoint */
  readonly remoteApiEndpoint = input<string>();

  /** Donor label */
  readonly donorLabel = input<string>();

  /** Emits when the user switches the model sex */
  readonly sexChange = output<'Male' | 'Female'>();
  /** Emits when the user switches organ side */
  readonly sideChange = output<'Left' | 'Right'>();
  /** Emits when the user clicks a node */
  readonly nodeClicked = output<NodeClickEvent>();

  /** Initializes the component */
  constructor() {
    super({
      initialDelay: 10,

      initialConfig: {
        sex: 'Female',
        side: 'Left',
        ...environment.dbOptions,
        ...(globalThis['dbOptions' as never] as object),
      },
    });
  }
}
