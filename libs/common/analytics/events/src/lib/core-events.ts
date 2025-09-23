import Click from './events/click';
import DoubleClick from './events/double-click';
import Error from './events/error';
import Hover from './events/hover';
import ModelChange from './events/model-change';
import PageView from './events/page-view';

/** Core events type map */
export type CoreEvents = typeof CoreEvents;

/** Core events for use in all applications */
export const CoreEvents = {
  Click,
  DoubleClick,
  Error,
  Hover,
  ModelChange,
  PageView,
} as const;
