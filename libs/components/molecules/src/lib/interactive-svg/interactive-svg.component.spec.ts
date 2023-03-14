import { OverlayModule } from '@angular/cdk/overlay';
import { inject, Renderer2 } from '@angular/core';
import { mock, MockProxy } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';

import { InteractiveSvgComponent } from './interactive-svg.component';

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
  let renderer: MockProxy<Renderer2>;
  let shallow: Shallow<InteractiveSvgComponent>;

  beforeEach(async () => {
    shallow = new Shallow(InteractiveSvgComponent).dontMock(OverlayModule);
    renderer = mock<Renderer2>();

    mockedInject.mockReset().mockReturnValue(renderer);
    renderer.listen.mockReturnValue(() => undefined);
    svg.querySelector.mockReturnValue(crosswalk);
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
    });
  });

  describe('hover', () => {
    const g = mock<SVGGElement>({ id: 'test_x5F_' });
    const path = mock<SVGPathElement>({ parentElement: g });
    const event = { target: path, clientX: 10, clientY: 20 };

    it('should emit hover event on mouseover', async () => {
      const { instance, outputs } = await shallow.render();
      instance.setSvgElement(svg);

      const handler = renderer.listen.mock.calls.find((args) => args[1] === 'mouseover')?.[2];
      handler?.(event);
      expect(outputs.nodeHover.emit).toHaveBeenCalledWith('test_');
    });

    it('should clear hover event on mouseout', async () => {
      const { instance } = await shallow.render();
      jest.spyOn(instance.nodeHoverData$, 'next');
      instance.setSvgElement(svg);

      const handler = renderer.listen.mock.calls.find((args) => args[1] === 'mouseout')?.[2];
      handler?.(event);
      expect(instance.nodeHoverData$.next).toHaveBeenCalledWith(undefined);
    });
  });

  it('remove underscores from node names', async () => {
    const { instance } = await shallow.render();
    instance.formatNodeName('test_node');
    expect(instance.formatNodeName('test_node')).toEqual('test node');
  });
});
