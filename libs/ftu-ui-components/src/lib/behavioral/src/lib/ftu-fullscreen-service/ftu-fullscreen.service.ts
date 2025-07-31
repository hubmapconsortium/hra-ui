import { Injectable, signal } from '@angular/core';

/**
 * Full screen tab index enum
 */
export enum FullscreenTab {
  Illustration = 0,
  BiomarkerDetails = 1,
  SourceList = 2,
}

/**
 * Ftu Full screen service
 */
@Injectable({
  providedIn: 'root',
})
export class FtuFullScreenService {
  /**
   * Boolean input signal to determine if full screen is enabled
   */
  readonly isFullscreen = signal<boolean>(false);

  /**
   * Input signal to store the current fullscreen tab index
   */
  readonly fullscreentabIndex = signal<FullscreenTab>(0);
}
