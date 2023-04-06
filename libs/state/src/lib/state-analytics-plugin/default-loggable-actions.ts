import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { ContactActions } from '../contact';
import { DownloadActions } from '../download';

/**
 * Default loggable actions
 */
export const DEFAULT_LOGGABLE_ACTIONS: unknown[] = [
  ContactActions.SendMessage,
  DownloadActions.Download,
  LinkRegistryActions.Navigate,
];
