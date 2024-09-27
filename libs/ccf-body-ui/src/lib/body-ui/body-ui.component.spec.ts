import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { render, screen } from '@testing-library/angular';
import { BodyUI, NodeClickEvent } from '../body-ui';
import { BodyUiComponent, XYZTriplet } from './body-ui.component';
import { Subject } from 'rxjs';

jest.mock('../body-ui.ts', () => ({
  BodyUI: jest.fn().mockImplementation(() => ({
    deck: {
      setProps: jest.fn(),
      finalize: jest.fn(),
    },
    initialize: jest.fn().mockResolvedValue(undefined),
    finalize: jest.fn(),
    setScene: jest.fn(),
    setZoom: jest.fn(),
    nodeClick$: new Subject(),
    nodeHoverStart$: new Subject(),
    nodeHoverStop$: new Subject(),
    sceneRotation$: new Subject(),
    nodeDrag$: new Subject(),
  })),
}));

describe('BodyUiComponent', () => {
  const sampleSpatialSceneNode: SpatialSceneNode = {};
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  function getBodyUi(): BodyUI {
    return jest.mocked(BodyUI).mock.results[0].value;
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a canvas element', async () => {
    await render(BodyUiComponent, { providers });

    const canvasElement = screen.getByRole('img');

    expect(canvasElement).toBeTruthy();
    expect(canvasElement.tagName.toLowerCase()).toBe('canvas');
  });

  it('should set zoom according to the bounds', async () => {
    const bounds: XYZTriplet = { x: 0, y: 0, z: 0 };
    const {
      fixture: { componentInstance: component },
    } = await render(BodyUiComponent, {
      providers,
      inputs: {
        bounds: bounds,
      },
    });

    component.zoomToBounds(bounds);
    expect(getBodyUi().setZoom).toHaveBeenCalled();
  });

  it('it should return array as it is when input is not string', async () => {
    const scenes: SpatialSceneNode[] = [];
    const { fixture } = await render(BodyUiComponent, {
      providers,
      inputs: {
        scene: scenes,
      },
    });

    await fixture.whenStable();
    expect(getBodyUi().setScene).toHaveBeenCalledWith(scenes);
  });

  it('it fetch the scene data and return when a url is passed as scene input', async () => {
    const URL = 'https://example.com';
    const { fixture } = await render(BodyUiComponent, {
      providers,
      inputs: {
        scene: URL,
      },
    });

    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne(URL);
    req.flush([sampleSpatialSceneNode]);

    await fixture.whenStable();
    expect(getBodyUi().setScene).toHaveBeenCalledWith([sampleSpatialSceneNode]);
  });

  it('it should throw error if response is of wrong type', async () => {
    const URL = 'https://example.com';
    const errorHandler = { handleError: jest.fn() };
    const { fixture } = await render(BodyUiComponent, {
      providers: [...providers, { provide: ErrorHandler, useValue: errorHandler }],
      inputs: {
        scene: URL,
      },
    });

    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne(URL);
    req.flush('Error Data');

    await fixture.whenStable();
    expect(getBodyUi().setScene).not.toHaveBeenCalledWith([sampleSpatialSceneNode]);
    expect(errorHandler.handleError).toHaveBeenCalled();
  });

  it('outputs should emit value', async () => {
    const event: NodeClickEvent = {
      node: {
        name: 'test',
      },
      ctrlClick: true,
    };
    const nodeClick = jest.fn();
    const { fixture } = await render(BodyUiComponent, {
      providers,
      on: {
        nodeClick,
      },
    });
    await fixture.whenStable();

    const nodeClick$ = getBodyUi().nodeClick$ as Subject<NodeClickEvent>;
    nodeClick$.next(event);
    expect(nodeClick).toHaveBeenCalledWith(event);
  });
});
