import { StateContext } from '@ngxs/store';
/**
 * StorageId - enum with values as Local, Session - identifier for storage types
 */
export enum StorageId {
  Local = 'local',
  Session = 'session',
}

/** Type alias for the array of Storage objects */
export type StorageModel = Record<StorageId, number>;

/** Helper alias for action handler's ctx argument */
export type StorageContext = StateContext<StorageModel>;
