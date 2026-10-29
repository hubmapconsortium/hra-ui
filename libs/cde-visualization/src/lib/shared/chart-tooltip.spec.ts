import { TooltipHandler, View } from 'vega';
import { setUpChartTooltips } from './chart-tooltip';

describe('setUpChartTooltips(view)', () => {
  let chart: HTMLElement;
  let tooltipEl: HTMLElement;
  let embedTooltip: jest.Mock;
  let tooltip: TooltipHandler;

  /** Builds a view that renders into the chart element, using a stand-in for vega-embed's tooltip handler */
  function createView(): View {
    let handler: TooltipHandler = embedTooltip;
    const view = {
      container: () => chart,
      tooltip: (newHandler?: TooltipHandler) => {
        if (!newHandler) {
          return handler;
        }
        handler = newHandler;
        return view;
      },
    };

    setUpChartTooltips(view as unknown as View);
    return view as unknown as View;
  }

  beforeEach(() => {
    chart = document.createElement('div');
    document.body.appendChild(chart);
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'vg-tooltip-element';
    // Like vega-tooltip, the stand-in appends its element to the body the first time and reuses it after that
    embedTooltip = jest.fn(() => {
      if (!tooltipEl.isConnected) {
        document.body.appendChild(tooltipEl);
      }
    });
    tooltip = (createView() as unknown as { tooltip(): TooltipHandler }).tooltip();
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('calls the original tooltip handler', () => {
    const event = new MouseEvent('pointermove');
    tooltip(undefined, event, undefined as never, 'B cell');
    expect(embedTooltip).toHaveBeenCalledWith(undefined, event, undefined, 'B cell');
  });

  it('keeps the tooltip element in the body when the chart is not in an overlay', () => {
    tooltip(undefined, new MouseEvent('pointermove'), undefined as never, 'B cell');
    expect(tooltipEl.parentElement).toBe(document.body);
  });

  it("gives the tooltip element the chart's font", () => {
    chart.style.fontFamily = '"Nunito Sans", sans-serif';
    tooltip(undefined, new MouseEvent('pointermove'), undefined as never, 'B cell');
    expect(tooltipEl.style.fontFamily).toBe('"Nunito Sans", sans-serif');
  });

  it('moves the tooltip element into the overlay holding the chart, and back when it leaves', () => {
    const host = document.createElement('div');
    const pane = document.createElement('div');
    pane.classList.add('cdk-overlay-pane');
    host.appendChild(pane);
    document.body.appendChild(host);

    pane.appendChild(chart);
    tooltip(undefined, new MouseEvent('pointermove'), undefined as never, 'B cell');
    expect(tooltipEl.parentElement).toBe(host);

    document.body.appendChild(chart);
    tooltip(undefined, new MouseEvent('pointermove'), undefined as never, 'B cell');
    expect(tooltipEl.parentElement).toBe(document.body);
  });
});
