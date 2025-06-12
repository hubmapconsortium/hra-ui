import { OutputEmitterRef } from '@angular/core';

/**
 * Interface for the Rich Tooltip Directive.
 * (used in providing context to the tooltip component)
 */
export interface RichTooltipController {
  /**
   * Signal for the tagline text.
   * @returns Tagline text.
   */
  tagline: () => string | undefined;

  /**
   * Signal for the description text.
   * @returns Description text.
   */
  description: () => string | undefined;

  /**
   * Signal for the action button text.
   * @returns Action button text.
   */
  actionText: () => string | undefined;

  /**
   * Output emitter reference for emitting action button click event.
   */
  actionClick: OutputEmitterRef<void>;

  /**
   * Function to open the tooltip.
   */
  open(): void;

  /**
   * Function to close the tooltip.
   */
  close(): void;

  /**
   * Function to toggle the visibility of the tooltip.
   */
  toggle(): void;
}
