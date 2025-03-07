import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { BaseWebComponent, BUILTIN_PARSERS } from 'ccf-shared/web-components';
import { ObservableInput } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';

import { environment } from '../environments/environment';
import { ViewSide, ViewType } from './core/store/model/model.state';

export type User = NonNullable<GlobalConfig['user']>;
export type Organ = NonNullable<GlobalConfig['organ']>;
export type RegistrationCallback = (data: unknown) => void;
export type CancelRegistrationCallback = () => void;
export type FetchPreviousRegistrationsCallback = () => ObservableInput<Record<string, unknown>[]>;

function parseOrgan(value: unknown): string | Organ {
  try {
    return BUILTIN_PARSERS.json(value) as Organ;
  } catch {
    return '' + value;
  }
}

@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppWebComponent extends BaseWebComponent {
  @Input() baseHref!: string;
  @Input() useDownload!: string | boolean;
  @Input() referenceData!: string;
  @Input() user!: string | User;
  @Input() organ!: string | Organ;
  @Input() consortium!: string;
  @Input() editRegistration!: string | SpatialEntityJsonLd;
  @Input() register!: string | RegistrationCallback;
  @Input() cancelRegistration!: string | CancelRegistrationCallback;
  @Input() fetchPreviousRegistrations!: string | FetchPreviousRegistrationsCallback;
  @Input() skipUnsavedChangesConfirmation!: string | boolean;
  @Input() theme!: string;
  @Input() homeUrl!: string;
  @Input() organOptions!: string | string[];
  @Input() collisionsEndpoint!: string;
  @Input() view!: ViewType;
  @Input() viewSide!: ViewSide;

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
