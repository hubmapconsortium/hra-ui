import { Click } from './events/click';
import { Error } from './events/error';
import { Hover } from './events/hover';
import { PageView } from './events/page-view';

export const CoreEventType = {
  PageView,
  Click,
  Hover,
  Error,
} as const;
