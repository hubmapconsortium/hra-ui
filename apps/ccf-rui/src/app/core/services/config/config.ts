import { InjectionToken } from '@angular/core';
import { GlobalsService } from 'ccf-shared';
import { ObservableInput } from 'rxjs';

/**
 * Interface representing the global configuration options.
 */
export interface GlobalConfig {
  /** Base URL for the application. */
  baseHref?: string;

  /** Configuration for editing registration. */
  editRegistration?: Record<string, unknown>;

  /** Configuration for the organ or a string representing the organ. */
  organ?: OrganConfig | string;

  /** User information. */
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };

  /** Name of the consortium. */
  consortium?: string;

  /** Function to register data. */
  register?: (data: string) => void;

  /** Flag indicating if download functionality is used. */
  useDownload?: boolean;

  /** Function to fetch previous registrations. */
  fetchPreviousRegistrations?: () => ObservableInput<Record<string, unknown>[]>;

  /** Flag indicating if registration has started. */
  registrationStarted?: boolean;

  /** Function to cancel registration. */
  cancelRegistration?: () => void;

  /** Flag to skip confirmation for unsaved changes. */
  skipUnsavedChangesConfirmation?: boolean;

  /** URL for the home page. */
  homeUrl?: string;

  /** Options for organ selection. */
  organOptions?: string[];

  /** Endpoint for collision detection. */
  collisionsEndpoint?: string;
}

/** Valid organ names. */
export type OrganName = 'large intestine' | 'heart' | 'kidney' | 'spleen';

/**
 * Interface representing the configuration for an organ.
 */
export interface OrganConfig {
  /** Name of the organ. */
  name: OrganName;
  /** Ontology ID for the organ. */
  ontologyId?: string;
  /** Sex of the organ donor. */
  sex?: 'male' | 'female';
  /** Side of the body where the organ is located. */
  side?: 'left' | 'right';
}

declare global {
  /** Global config for rui config */
  let ruiConfig: GlobalConfig;
}

/** Injection token for the global configuration object. */
export const GLOBAL_CONFIG = new InjectionToken<GlobalConfig>('Global configuration object');

/**
 * Factory function to create the global configuration object.
 * @param globals The GlobalsService instance.
 * @returns The global configuration object.
 */
export function globalConfigFactory(globals: GlobalsService): GlobalConfig {
  return globals.get('ruiConfig', { user: { firstName: '', lastName: '', email: '' } });
}
