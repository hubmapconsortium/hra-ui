import { render, screen } from '@testing-library/angular';
import { VisualizationPageComponent } from './visualization.component';
import { CdeVisualizationElement } from '@hra-ui/cde-visualization';

jest.mock('@hra-ui/cde-visualization', () => ({}));

describe('VisualizationComponent', () => {
  it('should create', async () => {
    await render(VisualizationPageComponent);
    expect(screen.getByTestId('visualization')).toBeInTheDocument();
  });

  it('binds data to the custom element', async () => {
    const nodes = 'test/nodes';
    await render(VisualizationPageComponent, {
      componentInputs: {
        data: {
          nodes,
        },
        isCustomVisualization: false,
      },
    });

    const el = screen.getByTestId('visualization') as CdeVisualizationElement;
    expect(el.nodes).toEqual(nodes);
  });

  it('registers a beforeunload handler if it is a custom visualization', async () => {
    await render(VisualizationPageComponent, {
      componentInputs: {
        isCustomVisualization: true,
      },
    });

    const event = new Event('beforeunload');
    const spy = jest.spyOn(event, 'preventDefault');
    window.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });
});
