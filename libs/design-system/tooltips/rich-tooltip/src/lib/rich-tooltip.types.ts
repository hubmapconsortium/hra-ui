import { OutputEmitterRef } from '@angular/core';

export interface RichTooltipController {
  tagline: () => string | undefined;
  description: () => string | undefined;
  actionText: () => string | undefined;
  actionClick: OutputEmitterRef<void>;

  open(): void;
  close(): void;
  toggle(): void;
}
