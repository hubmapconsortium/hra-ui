import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { ContactActions } from '../contact';
import { DownloadActions } from '../download';
import { ActiveFtuActions } from '../active-ftu';
import { CellSummaryActions } from '../cell-summary';
import { IllustratorActions } from '../illustrator';
import { ScreenModeAction } from '../screen-mode';
import { SourceRefsActions } from '../source-refs';
import { TissueLibraryActions } from '../tissue-library';

/**
 * Default loggable actions
 */
export const DEFAULT_LOGGABLE_ACTIONS: unknown[] = [
  ContactActions.SendMessage,
  DownloadActions.Download,
  LinkRegistryActions.Navigate,
  ActiveFtuActions.Load,
  CellSummaryActions.ComputeAggregates,
  IllustratorActions.SetSelection,
  ScreenModeAction.Set,
  SourceRefsActions.Load,
  TissueLibraryActions.Load,
];
