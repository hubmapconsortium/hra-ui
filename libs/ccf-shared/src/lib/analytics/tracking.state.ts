import { DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

/** Tracking state */
export interface TrackingStateModel {
  /** Whether telemetry is enabled */
  allowTelemetry?: boolean;
}

/** Telemetry key in local storage */
export const LOCAL_STORAGE_ALLOW_TELEMETRY_KEY = 'ALLOW_TELEMETRY';
/** Initial telemetry value */
export const INITIAL_TELEMETRY_SETTING = getTelemetryStorageSetting();

/**
 * Gets the current telemetry value from local storage
 *
 * @returns The current local storage value
 */
function getTelemetryStorageSetting(): boolean | undefined {
  const value = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY);
  return value === null ? undefined : value.toLowerCase() === 'true';
}

/** Tracking state */
@StateRepository()
@State<TrackingStateModel>({
  name: 'tracking',
  defaults: {
    allowTelemetry: INITIAL_TELEMETRY_SETTING,
  },
})
@Injectable()
export class TrackingState extends NgxsImmutableDataRepository<TrackingStateModel> {
  /**
   * Updates the telemetry setting
   *
   * @param allowTelemetry Whether to enable/disable telemetry
   */
  @DataAction()
  setAllowTelemetry(allowTelemetry: boolean): void {
    const oldValue = getTelemetryStorageSetting();
    localStorage.setItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY, allowTelemetry.toString());
    this.ctx.patchState({ allowTelemetry });

    if (oldValue !== undefined || allowTelemetry === false) {
      // This ensures that if telemetry is disabled that it _WONT_ send anything to Google Analytics
      location.reload();
    }
  }
}
