import { DEFAULT_NODE_TARGET_KEY } from '@hra-ui/cde-visualization';
import { render } from '@testing-library/angular';

import { AppComponent } from './app.component';

jest.mock('hra-node-dist-vis/docs/hra-node-dist-vis.wc.js', () => ({}));
jest.mock('vega-embed', () => ({ default: jest.fn() }));

function createReactSignal() {
  return { value: undefined };
}

class MockNodeDistVis extends HTMLElement {
  nodesData = createReactSignal();
  nodeTargetKey = createReactSignal();
  nodeTargetValue = createReactSignal();
  edgesUrl = createReactSignal();
  edgesData = createReactSignal();
  maxEdgeDistance = createReactSignal();
  colorMapData = createReactSignal();
  colorMapKey = createReactSignal();
  colorMapValue = createReactSignal();
  selection = createReactSignal();

  resetView() {
    // Intentionally empty
  }
  toDataUrl() {
    return 'test/url';
  }
}

customElements.define('hra-node-dist-vis', MockNodeDistVis);

const sampleData = {
  nodes: undefined,
  edges: undefined,
  colorMap: undefined,
  metadata: undefined,
  nodeTargetKey: DEFAULT_NODE_TARGET_KEY,
  title: 'Test Title',
  technology: 'Test Technology',
  organ: 'Test Organ',
  sex: 'Test Sex',
  age: 30,
  creationDate: 'Test Date',
  creationTime: 'Test Time',
  thickness: 1,
  pixelSize: 1,
};

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(AppComponent, {
      componentInputs: {
        ...sampleData,
      },
    });

    component = instance;
  });
  it(`should have as title 'cde-visualization-wc'`, async () => {
    expect(component.title()).toEqual('Test Title');
  });
});
