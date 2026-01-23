import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
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
    await render(DebugLogsComponent, {
      inputs: { currentSheet: mockSheet, logs: mockLogs },
    });
    expect(screen.getByText('Test Display')).toBeInTheDocument();
  });

  it('should emit closeDebug event', async () => {
    const spy = jest.fn();
    const { container } = await render(DebugLogsComponent, {
      inputs: { currentSheet: mockSheet, logs: mockLogs },
      on: { closeDebug: spy },
    });

    const closeBtn = container.querySelector('[hraFeature="close"]') as HTMLElement;
    await userEvent.click(closeBtn);
    expect(spy).toHaveBeenCalled();
  });
});
