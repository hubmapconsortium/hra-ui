// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../src/typings/@analytics/session-storage-utils/index.d.ts" />
import { getSessionItem, setSessionItem } from '@analytics/session-storage-utils';
// import { nanoid } from 'nanoid';

/** Session id storage key */
const SESSION_ID_KEY = 'hraAnalytics_SessionId';

/** Get a session id */
export function getSessionId(): string {
  let id = getSessionItem(SESSION_ID_KEY);
  if (!id) {
    id = 'TODO'; // nanoid(8);
    setSessionItem(SESSION_ID_KEY, id);
  }

  return id;
}
