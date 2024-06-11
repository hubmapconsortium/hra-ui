import { render } from '@testing-library/angular';
import embed from 'vega-embed';
import { VegaContainerComponent } from './vega-container.component';

jest.mock('vega-embed', () => {
  return {
    default: jest.fn().mockReturnValue({
      finalize: jest.fn(),
    }),
  };
});

describe('VegaContainerComponent', () => {
  it('should render the title card and visualization container', async () => {
    const spec = {
      type: 'VegaContainer',
      specUrl: 'https://example.com/vega-spec.json',
      aspectRatio: '16/9',
    };

    await render(VegaContainerComponent, {
      componentInputs: {
        spec: spec,
      },
    });

    expect(embed).toHaveBeenCalled();
  });
});
