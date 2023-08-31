import { OverlayModule } from '@angular/cdk/overlay';
import { inject, Renderer2, SimpleChanges } from '@angular/core';
import { mock, MockProxy } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';

import { InteractiveSvgComponent, NodeMapEntry } from './interactive-svg.component';

jest.mock('@angular/core', () => {
  const originalModule = jest.requireActual('@angular/core');

  return {
    __esModule: true,
    ...originalModule,
    inject: jest.fn(),
  };
});

describe('InteractiveSvgComponent', () => {
  const mockedInject = jest.mocked(inject);
  const svg = mock<SVGSVGElement>();
  const crosswalk = mock<SVGGElement>();
  const nodeList = mock<NodeListOf<Element>>({ 0: { nodeName: 'g' } });

  const svg2 = mock<SVGSVGElement>();
  const crosswalk2 = mock<SVGGElement>();
  const nodeList2 = mock<NodeListOf<Element>>({ 0: { nodeName: 'path' } });

  let renderer: MockProxy<Renderer2>;
  let shallow: Shallow<InteractiveSvgComponent<NodeMapEntry>>;

  beforeEach(async () => {
    shallow = new Shallow(InteractiveSvgComponent).dontMock(OverlayModule);
    renderer = mock<Renderer2>();

    mockedInject.mockReset().mockReturnValue(renderer);
    renderer.listen.mockReturnValue(() => undefined);
    svg.querySelector.mockReturnValue(crosswalk);
    crosswalk.querySelector.mockReturnValue(nodeList[0]);
    crosswalk.querySelectorAll.mockReturnValue(nodeList);

    svg2.querySelector.mockReturnValue(crosswalk2);
    crosswalk2.querySelector.mockReturnValue(nodeList2[0]);
    crosswalk2.querySelectorAll.mockReturnValue(nodeList2);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('setSvgElement', () => {
    it('should move the crosswalk element to the front', async () => {
      const { instance } = await shallow.render();
      instance.setSvgElement(svg);
      expect(renderer.appendChild).toHaveBeenCalledWith(svg, crosswalk);
    });

    it('should attach hover events', async () => {
      const { instance } = await shallow.render();
      instance.setSvgElement(svg);
      expect(renderer.listen).toHaveBeenCalledWith(crosswalk, 'mouseover', expect.any(Function));
      expect(renderer.listen).toHaveBeenCalledWith(crosswalk, 'mouseout', expect.any(Function));
      expect(renderer.listen).toHaveBeenCalledWith(crosswalk, 'click', expect.any(Function));
    });
  });

  describe('hover', () => {
    const path = mock<SVGPathElement>({
      id: 'Cortical_Collecting_Duct_Principal_Cell_1',
      parentElement: { id: '', parentElement: undefined },
    });
    const path2 = mock<SVGPathElement>({
      id: '',
      parentElement: { id: 'Cortical_Collecting_Duct_Principal_Cell_2', parentElement: undefined },
    });
    const path3 = mock<SVGPathElement>({
      id: '',
      parentElement: { id: '', parentElement: { id: 'Cortical_Collecting_Duct_Principal_Cell_3' } },
    });
    const event = { target: path, clientX: 10, clientY: 20 };
    const event2 = { target: path2, clientX: 10, clientY: 20 };
    const event3 = { target: path3, clientX: 10, clientY: 20 };
    const testNode: NodeMapEntry = {
      id: 'Cortical_Collecting_Duct_Principal_Cell_1',
      label: 'kidney cortex collecting duct principal cell',
      ontologyId: 'CL_1000714',
    };
    const testMapping: NodeMapEntry[] = [
      testNode,
      { ...testNode, id: 'Cortical_Collecting_Duct_Principal_Cell_2' },
      { ...testNode, id: 'Cortical_Collecting_Duct_Principal_Cell_3' },
    ];

    it('should emit hover event on mouseover', async () => {
      const { instance, outputs } = await shallow.render({ bind: { mapping: testMapping } });
      instance.setSvgElement(svg);

      const handler = renderer.listen.mock.calls.find((args) => args[1] === 'mouseover')?.[2];
      handler?.(event);
      expect(outputs.nodeHover.emit).toHaveBeenCalledWith(testMapping[0]);
      handler?.(event2);
      expect(outputs.nodeHover.emit).toHaveBeenCalledWith(testMapping[1]);
      handler?.(event3);
      expect(outputs.nodeHover.emit).toHaveBeenCalledWith(testMapping[2]);
    });

    it('should not emit anything if node not found in mapping', async () => {
      const { instance, outputs } = await shallow.render({ bind: { mapping: [] } });
      instance.setSvgElement(svg);

      const handler = renderer.listen.mock.calls.find((args) => args[1] === 'mouseover')?.[2];
      handler?.(event);
      expect(outputs.nodeHover.emit).toHaveBeenCalledTimes(0);
    });

    it('should clear hover event on mouseout', async () => {
      const { instance } = await shallow.render({ bind: { mapping: testMapping } });
      jest.spyOn(instance.nodeHoverData$, 'next');
      instance.setSvgElement(svg);

      const handler = renderer.listen.mock.calls.find((args) => args[1] === 'mouseout')?.[2];
      handler?.(event);
      expect(instance.nodeHoverData$.next).toHaveBeenCalledWith(undefined);
    });

    it('should emit nodeClick on click', async () => {
      const { instance, outputs } = await shallow.render({ bind: { mapping: testMapping } });
      instance.setSvgElement(svg);

      const handler = renderer.listen.mock.calls.find((args) => args[1] === 'click')?.[2];
      handler?.(event);
      expect(outputs.nodeClick.emit).toHaveBeenCalledWith(testMapping[0]);
    });
  });

  it('remove underscores from node names', async () => {
    const { instance } = await shallow.render();
    instance.formatNodeName('test_node');
    expect(instance.formatNodeName('test_node')).toEqual('test node');
  });

  it('highlights elements based on highlightId', async () => {
    const testNode: NodeMapEntry = {
      id: 'Cortical_Collecting_Duct_Principal_Cell_1',
      label: 'kidney cortex collecting duct principal cell',
      ontologyId: 'CL_1000714',
    };
    const testMapping: NodeMapEntry[] = [
      testNode,
      { ...testNode, id: 'Cortical_Collecting_Duct_Principal_Cell_2' },
      { ...testNode, id: 'Cortical_Collecting_Duct_Principal_Cell_3' },
    ];
    const testChanges: SimpleChanges = {
      highlightId: {
        currentValue: 'CL_1000714',
        firstChange: false,
        previousValue: undefined,
        isFirstChange: () => {
          return false;
        },
      },
    };

    const { instance } = await shallow.render({ bind: { mapping: testMapping, highlightId: 'CL_1000714' } });
    instance.setSvgElement(svg);
    instance.ngOnChanges(testChanges);
    instance.setSvgElement(svg2);
    instance.ngOnChanges(testChanges);
  });
});
