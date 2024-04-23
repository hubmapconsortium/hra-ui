import { Error, SnackbarType } from '../models/response.model';
import { DOI } from '../models/sheet.model';
import { OpenBottomSheetData } from '../models/ui.model';

export class OpenLoading {
  static readonly type = '[OPEN] Loading';
  constructor(public text: string) {}
}

export class UpdateLoadingText {
  static readonly type = '[UPDATE] Loading Text';
  constructor(public text: string) {}
}

export class CloseLoading {
  static readonly type = '[CLOSE] Loading';
  constructor(public text?: string) {}
}

export class HasError {
  static readonly type = '[ERROR] Has Error';
  constructor(public error: Error) {}
}

export class NoError {
  static readonly type = '[ERROR] No Error';
}

export class ToggleControlPane {
  static readonly type = '[TOGGLE] Control Pane';
}

export class OpenSnackbar {
  static readonly type = '[OPEN] Snackbar';
  constructor(
    public text: string,
    public type: SnackbarType,
  ) {}
}

export class CloseSnackbar {
  static readonly type = '[CLOSE] Snackbar';
}

export class ToggleIndentList {
  static readonly type = '[TOGGLE] Indent List';
}

export class ToggleReport {
  static readonly type = '[TOGGLE] Report';
}

export class ToggleDebugLogs {
  static readonly type = '[TOGGLE] Debug Logs';
}

export class CloseRightSideNav {
  static readonly type = '[CLOSE] Right Side Nav';
}

export class ToggleBottomSheet {
  static readonly type = '[TOGGLE] Bottom Sheet';
}

export class OpenBottomSheet {
  static readonly type = '[OPEN] Bottom Sheet';
  constructor(public data: OpenBottomSheetData) {}
}

export class OpenBottomSheetDOI {
  static readonly type = '[OPEN] Bottom Sheet DOI';
  constructor(public data: DOI[]) {}
}

export class CloseBottomSheet {
  static readonly type = '[CLOSE] Bottom Sheet';
}

export class CloseBottomSheetDOI {
  static readonly type = '[CLOSE] Bottom Sheet DOI';
}

export class OpenCompare {
  static readonly type = '[OPEN] Compare';
}

export class CloseCompare {
  static readonly type = '[CLOSE] Compare';
}

export class OpenSearch {
  static readonly type = '[OPEN] Search';
}

export class CloseSearch {
  static readonly type = '[CLOSE] Search';
}
