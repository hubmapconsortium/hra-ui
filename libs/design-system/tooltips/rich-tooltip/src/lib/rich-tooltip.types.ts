import { OutputRef } from '@angular/core';

export interface RichTooltipController {
  tagline: () => string | undefined;
  description: () => string | undefined;
  actionText: () => string | undefined;
  actionClick: OutputRef<void>;

  open(): void;
  close(): void;
  toggle(): void;
}
