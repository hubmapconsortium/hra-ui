import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { DownloadActions } from '../download';
import { ActiveFtuActions } from '../active-ftu';
import { IllustratorActions } from '../illustrator';
import { ScreenModeAction } from '../screen-mode';

/**
 * Default loggable actions
 */
export const DEFAULT_LOGGABLE_ACTIONS: unknown[] = [
  DownloadActions.Download,
  LinkRegistryActions.Navigate,
  ActiveFtuActions.Load,
  IllustratorActions.SetHover,
  IllustratorActions.SetClicked,
  ScreenModeAction.Set,
];
