import { render } from '@testing-library/angular';
import embed, { Result } from 'vega-embed';
import { VegaContainerComponent } from './vega-container.component';
import { mockClear, mockDeep } from 'jest-mock-extended';

jest.mock('vega-embed', () =>
  jest.fn().mockReturnValue({
    finalize: jest.fn(),
  }),
);

describe('VegaContainerComponent', () => {
  const embedResult = mockDeep<Result>();
  beforeEach(() => {
    if (document.fonts === undefined) {
      Object.defineProperty(document, 'fonts', {
        value: mockDeep(),
      });
    }
    jest.mocked(embed).mockReturnValue(Promise.resolve(embedResult));
  });

  afterEach(() => {
    mockClear(embedResult);
  });

  it('should render the title card and visualization container', async () => {
    const spec = {
      type: 'VegaContainer',
      specUrl: 'https://example.com/vega-spec.json',
      aspectRatio: '16/9',
    };

    const { fixture } = await render(VegaContainerComponent, {
      componentInputs: {
        spec: spec,
      },
    });

    await fixture.whenStable();
    expect(embed).toHaveBeenCalled();
  });
});
