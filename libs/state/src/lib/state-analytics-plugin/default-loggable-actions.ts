import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { ContactActions } from '../contact';
import { DownloadActions } from '../download';
import { ActiveFtuActions } from '../active-ftu';
import { IllustratorActions } from '../illustrator';
import { ScreenModeAction } from '../screen-mode';

/**
 * Default loggable actions
 */
export const DEFAULT_LOGGABLE_ACTIONS: unknown[] = [
  ContactActions.SendMessage,
  DownloadActions.Download,
  LinkRegistryActions.Navigate,
  ActiveFtuActions.Load,
  IllustratorActions.SetSelection,
  ScreenModeAction.Set,
];
