import { Component, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataViewerComponent } from '@hra-ui/design-system/data-viewer';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { DataViewerParamSyncControllerService } from './data-viewer-param-sync.service';

@Component({ template: '' })
class TestComponent {}

describe('DataViewerParamSyncControllerService', () => {
  async function setup(queryParams = {}, fragment: string | null = null) {
    const renderResult = await render(TestComponent, {
      providers: [
        DataViewerParamSyncControllerService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams,
              fragment,
            },
            queryParams: of(queryParams),
            fragment: of(fragment),
          },
        },
      ],
    });

    const service = renderResult.fixture.debugElement.injector.get(DataViewerParamSyncControllerService);

    return { ...renderResult, service };
  }

  it('should be created', async () => {
    const { service } = await setup();
    expect(service).toBeTruthy();
  });

  it('should have correct static id', () => {
    expect(DataViewerParamSyncControllerService.id).toBe('DataViewerParamSync');
  });

  it('should attach DataViewerComponent and subscribe to observables', async () => {
    const { service } = await setup();
    const releaseVersionSubscribe = jest.fn((callback: (value: string) => void) => {
      callback('v1.0');
    });
    const organSubscribe = jest.fn((callback: (value: string | undefined) => void) => {
      callback('heart');
    });

    const mockInstance = {
      releaseVersion: { subscribe: releaseVersionSubscribe },
      organ: { subscribe: organSubscribe },
    };

    Object.setPrototypeOf(mockInstance, DataViewerComponent.prototype);

    const mockComponentRef = {
      instance: mockInstance,
    } as unknown as ComponentRef<DataViewerComponent>;

    service.attach(mockComponentRef);

    expect(releaseVersionSubscribe).toHaveBeenCalled();
    expect(organSubscribe).toHaveBeenCalled();
  });

  it('should handle non-DataViewerComponent gracefully', async () => {
    const { service } = await setup();
    const mockComponentRef = {
      instance: {},
    } as unknown as ComponentRef<unknown>;

    expect(() => service.attach(mockComponentRef)).not.toThrow();
  });

  it('should detach without errors', async () => {
    const { service } = await setup();
    expect(() => service.detach()).not.toThrow();
  });

  it('should set version when valid version is in URL', async () => {
    const { service, fixture } = await setup({ version: 'v1.5' });
    const releaseVersionSet = jest.fn();
    const releaseVersionGet = jest.fn(() => '');

    const mockInstance = {
      releaseVersion: Object.assign(releaseVersionGet, {
        subscribe: jest.fn(),
        set: releaseVersionSet,
      }),
      organ: Object.assign(
        jest.fn(() => ''),
        {
          subscribe: jest.fn(),
          set: jest.fn(),
        },
      ),
      releaseVersionData: jest.fn(() => [{ version: 'v1.5', organData: [{ label: 'heart' }] }]),
    };

    Object.setPrototypeOf(mockInstance, DataViewerComponent.prototype);

    const mockComponentRef = {
      instance: mockInstance,
    } as unknown as ComponentRef<DataViewerComponent>;

    service.attach(mockComponentRef);
    fixture.detectChanges();

    expect(releaseVersionSet).toHaveBeenCalledWith('v1.5');
  });

  it('should set organ when valid organ and releaseVersion in URL', async () => {
    const { service, fixture } = await setup({ version: 'v1.5', organ: 'heart' });
    const organSet = jest.fn();
    const releaseVersionGet = jest.fn(() => 'v1.5');

    const mockInstance = {
      releaseVersion: Object.assign(releaseVersionGet, {
        subscribe: jest.fn(),
        set: jest.fn(),
      }),
      organ: Object.assign(
        jest.fn(() => ''),
        {
          subscribe: jest.fn(),
          set: organSet,
        },
      ),
      releaseVersionData: jest.fn(() => [{ version: 'v1.5', organData: [{ label: 'heart' }] }]),
    };

    Object.setPrototypeOf(mockInstance, DataViewerComponent.prototype);

    const mockComponentRef = {
      instance: mockInstance,
    } as unknown as ComponentRef<DataViewerComponent>;

    service.attach(mockComponentRef);
    fixture.detectChanges();

    expect(organSet).toHaveBeenCalledWith('heart');
  });
});
