import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DataViewerParamSyncControllerService } from './data-viewer-param-sync.service';

describe('DataViewerParamSyncControllerService', () => {
  function setup(): DataViewerParamSyncControllerService {
    TestBed.configureTestingModule({
      providers: [
        DataViewerParamSyncControllerService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {},
              fragment: null,
            },
            queryParams: of({}),
            fragment: of(null),
          },
        },
      ],
    });

    return TestBed.inject(DataViewerParamSyncControllerService);
  }

  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  it('should have correct static id', () => {
    expect(DataViewerParamSyncControllerService.id).toBe('DataViewerParamSync');
  });

  it('should call attach without errors', () => {
    const service = setup();
    const mockComponentRef = {
      instance: {},
    } as ComponentRef<unknown>;

    expect(() => service.attach(mockComponentRef)).not.toThrow();
  });

  it('should handle non-DataViewerComponent gracefully', () => {
    const service = setup();
    const mockComponentRef = {
      instance: {},
    } as ComponentRef<unknown>;

    expect(() => service.attach(mockComponentRef)).not.toThrow();
  });

  it('should detach without errors', () => {
    const service = setup();
    expect(() => service.detach()).not.toThrow();
  });
});
