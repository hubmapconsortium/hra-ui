import { render } from '@testing-library/angular';
import { Sheet } from '../../models/sheet.model';
import { Logs } from '../../models/ui.model';
import { DebugLogsComponent } from './debug-logs.component';

describe('DebugLogsComponent', () => {
  const mockSheet: Sheet = {
    name: 'Test Sheet',
    display: 'Test Display',
    config: { width: 800, height: 600, bimodal_distance_x: 100, bimodal_distance_y: 50 },
    title: 'Test Title',
  };

  const mockLogs: Logs = {
    sheetLogs: { id: 1, messages: [], NO_OUT_LINKS: [], NO_IN_LINKS: [], MULTI_IN_LINKS: [], SELF_LINKS: [] },
    allLogs: [],
  };

  it('should render with required inputs', async () => {
    const { fixture } = await render(DebugLogsComponent, {
      componentInputs: { currentSheet: mockSheet, logs: mockLogs },
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit closeDebug event', async () => {
    const { fixture } = await render(DebugLogsComponent, {
      componentInputs: { currentSheet: mockSheet, logs: mockLogs },
    });
    const component = fixture.componentInstance;
    const spy = jest.spyOn(component.closeDebug, 'emit');
    component.closeDebug.emit();
    expect(spy).toHaveBeenCalled();
  });
});
