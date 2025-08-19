import Click from './events/click';
import Error from './events/error';
import Hover from './events/hover';
import PageView from './events/page-view';

/** Core events for use in all applications */
export const CoreEvents = {
  PageView,
  Click,
  Hover,
  Error,
} as const;
