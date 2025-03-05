import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonToggleGroupHarness } from '@angular/material/button-toggle/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { NodeDistVisComponent, NodeDistVisElement, NodeEvent } from '@hra-ui/node-dist-vis';
import {
  AnyDataEntry,
  EdgesView,
  EMPTY_COLOR_MAP_VIEW,
  EMPTY_EDGES_VIEW,
  EMPTY_NODES_VIEW,
  NodeFilterView,
  NodesView,
} from '@hra-ui/node-dist-vis/models';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { NodeDistVisualizationComponent } from './node-dist-visualization.component';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { MatButtonHarness } from '@angular/material/button/testing';

jest.mock('@hra-ui/node-dist-vis', () => ({}));
jest.mock('libs/node-dist-vis/models/src/lib/edges/generator.ts', () => ({}));

describe('NodeDistVisualizationComponent', () => {
  const EMPTY_FILTER = new NodeFilterView(undefined, undefined);
  const SAMPLE_NODE: AnyDataEntry = ['epithelial', 100, 200];
  const SAMPLE_EDGE: AnyDataEntry = [0, 1, 100, 200, 0, 100, 300, 0];
  const SAMPLE_NODE_EVENT: NodeEvent = { index: 0, clientX: 0, clientY: 0, object: SAMPLE_NODE };
  const NODES = new NodesView([SAMPLE_NODE], EMPTY_NODES_VIEW.keyMapping);
  const EDGES = new EdgesView([SAMPLE_EDGE], EMPTY_EDGES_VIEW.keyMapping);

  async function setup(options?: RenderComponentOptions<NodeDistVisualizationComponent>) {
    return render(NodeDistVisualizationComponent, {
      ...options,
      inputs: {
        nodes: NODES,
        edges: EDGES,
        colorMap: EMPTY_COLOR_MAP_VIEW,
        nodeFilter: EMPTY_FILTER,
        maxEdgeDistance: 1,
        ...options?.inputs,
      },
      providers: [provideDesignSystemCommon(), ...(options?.providers ?? [])],
    });
  }

  async function getVisualizationEl() {
    return screen.getByTestId<NodeDistVisElement>('node-dist-vis');
  }

  async function setViewMode(fixture: ComponentFixture<NodeDistVisualizationComponent>, text: RegExp) {
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const harness = await loader.getHarness(MatButtonToggleGroupHarness);
    const [button] = await harness.getToggles({ text });
    await button.check();
  }

  async function getSelectionDeleteButton(fixture: ComponentFixture<NodeDistVisualizationComponent>) {
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader.getHarness(MatButtonHarness.with({ selector: '.delete' }));
  }

  async function emitVisualizationEvent(
    fixture: ComponentFixture<NodeDistVisualizationComponent>,
    type: string,
    detail: unknown,
  ) {
    const nodeDistVis = await getVisualizationEl();
    const nodeClickEvent = new CustomEvent(type, { detail });
    nodeDistVis.dispatchEvent(nodeClickEvent);

    fixture.detectChanges();
    await fixture.whenStable();
  }

  beforeAll(() => {
    customElements.define(
      'hra-node-dist-vis',
      class MockElement extends HTMLElement {
        readonly instance = mock<NodeDistVisComponent>();
      },
    );
  });

  it('should render', async () => {
    await setup();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
  });

  it('forwards node clicks from the visualization', async () => {
    const clicks = jest.fn();
    const { fixture } = await setup({ on: { nodeClick: clicks } });

    await emitVisualizationEvent(fixture, 'nodeClick', SAMPLE_NODE_EVENT);
    expect(clicks).toHaveBeenCalledWith(SAMPLE_NODE_EVENT);
  });

  it('should reset the view', async () => {
    const { fixture } = await setup();

    const nodeDistVis = await getVisualizationEl();
    fixture.componentInstance.resetView();

    expect(nodeDistVis.instance?.resetView).toHaveBeenCalled();
  });

  describe('cell info', () => {
    it('displays cell info when a node is clicked', async () => {
      const { fixture } = await setup();
      await setViewMode(fixture, /Inspect/);
      await emitVisualizationEvent(fixture, 'nodeClick', SAMPLE_NODE_EVENT);

      expect(screen.queryByTestId('cell-info')).toBeInTheDocument();
    });
  });

  describe('download', () => {
    it('turns the canvas into a png', async () => {
      const fileSaver = mock<FileSaverService>();
      const { fixture } = await setup({ providers: [{ provide: FileSaverService, useValue: fileSaver }] });
      const data = new Blob();
      const el = await getVisualizationEl();
      jest.mocked(el.instance?.toBlob)?.mockResolvedValue(data);

      await fixture.componentInstance.download();
      expect(fileSaver.saveData).toHaveBeenCalledWith(data, 'cell-distance-vis.png');
    });
  });

  describe('selection', () => {
    it('sets the selection on nodeSelectionChange events', async () => {
      const { fixture } = await setup();
      await setViewMode(fixture, /Select/);
      await emitVisualizationEvent(fixture, 'nodeSelectionChange', [SAMPLE_NODE_EVENT]);

      const deleteButton = await getSelectionDeleteButton(fixture);
      expect(await deleteButton.isDisabled()).toBeFalsy();

      fixture.componentInstance.deleteSelection();
      fixture.detectChanges();
      const el = await getVisualizationEl();
      expect((el.nodeFilter as NodeFilterView).exclude).toEqual([0]);
    });
  });
});
