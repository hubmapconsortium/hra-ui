import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { VersionedDataTableComponent } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { of } from 'rxjs';
import { VersionedTableParamSyncControllerService } from './versioned-table-param-sync.service';

describe('VersionedTableParamSyncControllerService', () => {
  function setup(queryParams = {}, fragment: string | null = null): VersionedTableParamSyncControllerService {
    TestBed.configureTestingModule({
      providers: [
        VersionedTableParamSyncControllerService,
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

    return TestBed.inject(VersionedTableParamSyncControllerService);
  }

  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  it('should have correct static id', () => {
    expect(VersionedTableParamSyncControllerService.id).toBe('VersionedTableParamSync');
  });

  it('should attach VersionedDataTableComponent and subscribe to selection', () => {
    const service = setup();
    const selectionSubscribe = jest.fn((callback: (value: number) => void) => {
      callback(0);
    });
    const itemsGet = jest.fn(() => [{ version: 'v1.0' }, { version: 'v2.0' }]);

    const mockInstance = {
      selection: { subscribe: selectionSubscribe },
      items: itemsGet,
    };

    Object.setPrototypeOf(mockInstance, VersionedDataTableComponent.prototype);

    const mockComponentRef = {
      instance: mockInstance,
      setInput: jest.fn(),
    } as unknown as ComponentRef<VersionedDataTableComponent>;

    service.attach(mockComponentRef);

    expect(selectionSubscribe).toHaveBeenCalled();
  });

  it('should handle non-VersionedDataTableComponent gracefully', () => {
    const service = setup();
    const mockComponentRef = {
      instance: {},
      setInput: jest.fn(),
    } as unknown as ComponentRef<unknown>;

    expect(() => service.attach(mockComponentRef)).not.toThrow();
  });

  it('should detach without errors', () => {
    const service = setup();
    expect(() => service.detach()).not.toThrow();
  });

  it('should set selection when valid version is in URL', () => {
    const service = setup({ version: 'v2.0' });
    const itemsGet = jest.fn(() => [{ version: 'v1.0' }, { version: 'v2.0' }, { version: 'v3.0' }]);
    const setInputMock = jest.fn();

    const mockInstance = {
      selection: { subscribe: jest.fn() },
      items: itemsGet,
    };

    Object.setPrototypeOf(mockInstance, VersionedDataTableComponent.prototype);

    const mockComponentRef = {
      instance: mockInstance,
      setInput: setInputMock,
    } as unknown as ComponentRef<VersionedDataTableComponent>;

    service.attach(mockComponentRef);
    TestBed.flushEffects();

    expect(setInputMock).toHaveBeenCalledWith('selection', 1);
  });

  it('should update URL when selection changes', () => {
    const service = setup();
    let selectionCallback: ((value: number) => void) | undefined;
    const selectionSubscribe = jest.fn((callback: (value: number) => void) => {
      selectionCallback = callback;
    });
    const itemsGet = jest.fn(() => [{ version: 'v1.0' }, { version: 'v2.0' }]);

    const mockInstance = {
      selection: { subscribe: selectionSubscribe },
      items: itemsGet,
    };

    Object.setPrototypeOf(mockInstance, VersionedDataTableComponent.prototype);

    const mockComponentRef = {
      instance: mockInstance,
      setInput: jest.fn(),
    } as unknown as ComponentRef<VersionedDataTableComponent>;

    service.attach(mockComponentRef);

    selectionCallback?.(1);

    expect(itemsGet).toHaveBeenCalled();
  });
});
