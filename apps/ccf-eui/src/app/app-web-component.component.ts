import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Filter } from '@hra-api/ng-client';
import { BaseWebComponent, BUILTIN_PARSERS } from 'ccf-shared/web-components';

import { environment } from '../environments/environment';

/**
 * Determines whether value is a number
 * @param value A value to check
 * @returns If value is number
 */
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Determines whether value is an array of numbers
 * @param value A value to check
 * @returns If value is an array of numbers
 */
function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isNumber);
}

/**
 * Determines whether value is a string
 * @param value A value to check
 * @returns If value is a string
 */
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Determines whether value is an array of strings
 * @param value A value to check
 * @returns If value is an array of strings
 */
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

/**
 * Checks if property is present in the object and applies the validator function
 * @param name Name
 * @param obj The object to check
 * @param prop Property to check for
 * @param validator Validator function
 */
function checkOptionalProperty(
  name: string,
  obj: object,
  prop: string,
  validator: (value: unknown) => boolean, // returns boolean after being called. Logic is passed as an argument when 'checkProp()' is called.
): void {
  /** first check if prop(property name) is present in the obj(value) and then apply the validator function whose
   *logic is passed when the checkProp() is called.
   */
  if (prop in obj) {
    //obj[prop] is value for eg. 'Male' in sex
    if (!validator(obj[prop as never])) {
      throw new Error(`Invalid property ${prop} in ${name}`);
    }
  }
}

/**
 * Parses data to an array of strings using the appropriate parser
 * @param value Value to parse
 * @returns Parsed values
 */
function parseDataSources(value: unknown): string[] {
  if (typeof value === 'string') {
    const json = BUILTIN_PARSERS.json(value);
    if (isStringArray(json)) {
      return json;
    }
  } else if (isStringArray(value)) {
    return value;
  }

  throw new Error('Invalid type for string array');
}

/**
 * Parses filter value
 * @param value Value to parse
 * @returns String or a Filter object
 */
function parseFilter(value: unknown): string | Partial<Filter> {
  if (typeof value === 'string') {
    value = BUILTIN_PARSERS.json(value);
    if (isString(value)) {
      return value;
    }
  }

  if (typeof value === 'object' && value !== null) {
    const sexOptions = ['Both', 'Male', 'Female'];
    // predefine name as 'filter' and obj as value. 'this' is set to undefined
    const checkProp = checkOptionalProperty.bind(undefined, 'filter', value);
    checkProp('sex', (val) => isString(val) && sexOptions.includes(val));
    checkProp('ageRange', (val) => isNumberArray(val) && val.length === 2);
    checkProp('bmiRange', (val) => isNumberArray(val) && val.length === 2);
    checkProp('consortiums', isStringArray);
    checkProp('tmc', isStringArray);
    checkProp('technologies', (val) => isStringArray(val));
    checkProp('ontologyTerms', (val) => isStringArray(val));
    checkProp('cellTypeTerms', (val) => isStringArray(val));
    checkProp('biomarkerTerms', (val) => isStringArray(val));
    checkProp('spatialSearches', (val) => isStringArray(val));
    return value as Filter;
  }

  throw new Error('Invalid filter');
}

/**
 * Root web component for the EUI
 */
@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppWebComponent extends BaseWebComponent {
  /** Base url to fetch relative links */
  baseHref = input<string>();

  /** Data sources from which data is queried */
  dataSources = input<string | string[]>();

  /** The initially enabled organs */
  selectedOrgans = input<string[]>();

  /** Api token passed during data queries */
  token = input<string>();

  /** The api endpoint from which data is queried */
  remoteApiEndpoint = input<string>();

  /** Whether to show the header bar */
  header = input<string | boolean>();

  /** Url visited when the user clicks the EUI logo */
  homeUrl = input<string>();

  /** Tooltip displayed when the user hover over the logo */
  logoTooltip = input<string>();

  /** Whether login is disabled */
  loginDisabled = input<boolean>();

  /** Initial data filter */
  filter = input<string | Partial<Filter>>();

  /** Whether the component is fully initialized */
  override initialized!: boolean;

  /**
   * Creates an instance of app web component and parses the initial configuration
   */
  constructor() {
    super({
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...(globalThis['dbOptions' as never] as object),
        ...environment.customization,
      },
      parse: {
        dataSources: parseDataSources,
        header: BUILTIN_PARSERS.boolean,
        loginDisabled: BUILTIN_PARSERS.boolean,
        filter: parseFilter,
        selectedOrgans: BUILTIN_PARSERS.json,
      },
    });
  }
}
