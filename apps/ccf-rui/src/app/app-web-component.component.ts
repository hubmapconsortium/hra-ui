import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { BaseWebComponent, BUILTIN_PARSERS } from 'ccf-shared/web-components';
import { ObservableInput } from 'rxjs';

import { environment } from '../environments/environment';
import { GlobalConfig } from './core/services/config/config';
import { ViewSide, ViewType } from './core/store/model/model.state';

/** Non-nullable type for user from GlobalConfig. */
export type User = NonNullable<GlobalConfig['user']>;
/** Non-nullable type for organ from GlobalConfig. */
export type Organ = NonNullable<GlobalConfig['organ']>;
/** Function type for registration callback. */
export type RegistrationCallback = (data: unknown) => void;
/** Function type for cancel registration callback. */
export type CancelRegistrationCallback = () => void;
/** Function type for fetching previous registrations. */
export type FetchPreviousRegistrationsCallback = () => ObservableInput<Record<string, unknown>[]>;

/**
 * Tries to parse the input value as an Organ using BUILTIN_PARSERS.json. If parsing fails, returns the value as a string.
 * @param value input value
 * @returns organ
 */
function parseOrgan(value: unknown): string | Organ {
  try {
    return BUILTIN_PARSERS.json(value) as Organ;
  } catch {
    return '' + value;
  }
}

/**
 * RUI web component
 */
@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppWebComponent extends BaseWebComponent {
  /** Base url to fetch relative links */
  @Input() baseHref!: string;
  /** Whether to download the registration on review */
  @Input() useDownload!: string | boolean;
  /** Reference data api endpoint */
  @Input() referenceData!: string;
  /** Prepopulated user object */
  @Input() user!: string | User;
  /** Prepopulated organ object */
  @Input() organ!: string | Organ;
  /** Prepopulated consortium */
  @Input() consortium!: string;
  /** Prepopulated registration */
  @Input() editRegistration!: string | SpatialEntityJsonLd;
  /** Callback that recieves the registration on review */
  @Input() register!: string | RegistrationCallback;
  /** Callback when the user leaves the application */
  @Input() cancelRegistration!: string | CancelRegistrationCallback;
  /** A callback to fetch previous registrations */
  @Input() fetchPreviousRegistrations!: string | FetchPreviousRegistrationsCallback;
  /** Whether to disable the unsaved changes prompt when the user leaves the application */
  @Input() skipUnsavedChangesConfirmation!: string | boolean;
  /** Url visited when the user clicks the RUI logo */
  @Input() homeUrl!: string;
  /** A list of enabled organs */
  @Input() organOptions!: string | string[];
  /** Collision query api endpoint */
  @Input() collisionsEndpoint!: string;
  /** Initial view mode */
  @Input() view!: ViewType;
  /** Initial view side */
  @Input() viewSide!: ViewSide;

  /**
   * Initializes the component with default configurations and parsers. Merges environment options, global configuration, and customizations.
   */
  constructor() {
    const BP = BUILTIN_PARSERS;

    super({
      initialConfig: {
        ...environment.dbOptions,
        ...(globalThis['ruiConfig' as never] as object),
        ...environment.customization,
      },
      parse: {
        useDownload: BP.boolean,
        user: BP.json,
        organ: parseOrgan,
        editRegistration: BP.json,
        register: BP.function,
        cancelRegistration: BP.function,
        fetchPreviousRegistrations: BP.function,
        skipUnsavedChangesConfirmation: BP.boolean,
        organOptions: BP.stringArray,
      },
    });
  }
}
