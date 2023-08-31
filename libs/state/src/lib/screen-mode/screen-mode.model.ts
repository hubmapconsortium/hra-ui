/** Screen mode state model */
export interface ScreenModeModel {
  /** Whether in fullscreen */
  isFullScreen: boolean;

  /** Wheather footer should be in small screen mode: Logo visibility */
  size: 'small' | 'large';
}
