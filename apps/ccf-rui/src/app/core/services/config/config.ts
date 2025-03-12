import { InjectionToken } from '@angular/core';
import { GlobalsService } from 'ccf-shared';
import { ObservableInput } from 'rxjs';

export interface GlobalConfig {
  baseHref?: string;
  editRegistration?: Record<string, unknown>;
  organ?: OrganConfig | string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  consortium?: string;

  register?: (data: string) => void;
  useDownload?: boolean;

  fetchPreviousRegistrations?: () => ObservableInput<Record<string, unknown>[]>;
  registrationStarted?: boolean;

  cancelRegistration?: () => void;

  skipUnsavedChangesConfirmation?: boolean;

  homeUrl?: string;
  organOptions?: string[];

  collisionsEndpoint?: string;
}

export type OrganName = 'large intestine' | 'heart' | 'kidney' | 'spleen';

export interface OrganConfig {
  name: OrganName;
  ontologyId?: string;
  sex?: 'male' | 'female';
  side?: 'left' | 'right';
}

declare global {
  let ruiConfig: GlobalConfig;
}

export const GLOBAL_CONFIG = new InjectionToken<GlobalConfig>('Global configuration object');

export function globalConfigFactory(globals: GlobalsService): GlobalConfig {
  return globals.get('ruiConfig', { user: { firstName: '', lastName: '', email: '' } });
}
