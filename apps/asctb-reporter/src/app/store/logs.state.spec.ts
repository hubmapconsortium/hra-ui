import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ClearSheetLogs, ReportLog } from '../actions/logs.actions';
import { LOG_TYPES } from '../models/logs.model';
import { LogsState, LogsStateModel } from './logs.state';

describe('LogsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([LogsState])],
    });

    store = TestBed.inject(Store);
    // Create fresh object instances to avoid shared references across tests
    store.reset({
      logsState: {
        id: 0,
        sheetLogs: {
          id: 0,
          messages: [],
          NO_OUT_LINKS: [],
          NO_IN_LINKS: [],
          MULTI_IN_LINKS: [],
          SELF_LINKS: [],
        },
        allLogs: [
          {
            id: 0,
            messages: [],
            NO_OUT_LINKS: [],
            NO_IN_LINKS: [],
            MULTI_IN_LINKS: [],
            SELF_LINKS: [],
          },
        ],
      },
    });
  });

  it('should handle ReportLog action for all log types', () => {
    // Test MSG with icon
    store.dispatch(new ReportLog(LOG_TYPES.MSG, 'Msg', 'icon', 'v1'));
    let logs = store.selectSnapshot(LogsState.getLogs);
    expect(logs.sheetLogs.messages).toEqual([{ text: 'Msg', icon: 'icon', version: 'v1' }]);
    expect(logs.allLogs[0].messages).toEqual([{ text: 'Msg', icon: 'icon', version: 'v1' }]);

    // Test MSG without icon (icon ?? '')
    store.dispatch(new ReportLog(LOG_TYPES.MSG, 'Text', undefined, 'v2'));
    logs = store.selectSnapshot(LogsState.getLogs);
    expect(logs.sheetLogs.messages[1].icon).toBe('');

    // Test all other log types
    store.dispatch(new ReportLog(LOG_TYPES.NO_OUT_LINKS, 'Out'));
    store.dispatch(new ReportLog(LOG_TYPES.NO_IN_LINKS, 'In'));
    store.dispatch(new ReportLog(LOG_TYPES.MULTI_IN_LINKS, 'Multi'));
    store.dispatch(new ReportLog(LOG_TYPES.SELF_LINKS, 'Self'));

    logs = store.selectSnapshot(LogsState.getLogs);
    expect(logs.sheetLogs.NO_OUT_LINKS).toEqual(['Out']);
    expect(logs.sheetLogs.NO_IN_LINKS).toEqual(['In']);
    expect(logs.sheetLogs.MULTI_IN_LINKS).toEqual(['Multi']);
    expect(logs.sheetLogs.SELF_LINKS).toEqual(['Self']);
    expect(logs.allLogs[0].NO_OUT_LINKS).toEqual(['Out']);
    expect(logs.allLogs[0].NO_IN_LINKS).toEqual(['In']);
    expect(logs.allLogs[0].MULTI_IN_LINKS).toEqual(['Multi']);
    expect(logs.allLogs[0].SELF_LINKS).toEqual(['Self']);
  });

  it('should handle ClearSheetLogs action', () => {
    // Add logs to first sheet
    store.dispatch(new ReportLog(LOG_TYPES.MSG, 'S1', '', 'v1'));
    store.dispatch(new ReportLog(LOG_TYPES.NO_OUT_LINKS, 'O1'));

    // Clear and verify
    store.dispatch(new ClearSheetLogs());
    const state = store.selectSnapshot((s: { logsState: LogsStateModel }) => s.logsState);
    let logs = store.selectSnapshot(LogsState.getLogs);

    expect(state.id).toBe(1);
    expect(logs.sheetLogs.id).toBe(1);
    expect(logs.sheetLogs.messages).toEqual([]);
    expect(logs.allLogs).toHaveLength(2);
    expect(logs.allLogs[0].messages[0].text).toBe('S1');

    // Add to second sheet and verify history preserved
    store.dispatch(new ReportLog(LOG_TYPES.MSG, 'S2', '', 'v2'));
    logs = store.selectSnapshot(LogsState.getLogs);
    expect(logs.allLogs[0].messages[0].text).toBe('S1');
    expect(logs.allLogs[1].messages[0].text).toBe('S2');
    expect(logs.sheetLogs.messages[0].text).toBe('S2');
  });
});
