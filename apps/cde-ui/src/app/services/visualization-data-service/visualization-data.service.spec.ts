import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  VisualizationData,
  VisualizationDataService,
  visualizationDataCanActivate,
  visualizationDataResolver,
} from './visualization-data.service';
import { mock } from 'jest-mock-extended';
import { TestBed } from '@angular/core/testing';

const activatedRouteSnapshot = mock<ActivatedRouteSnapshot>();
const routerStateSnapshot = mock<RouterStateSnapshot>();

describe('visualizationDataCanActivate()', () => {
  let service: VisualizationDataService;
  let activateFn: CanActivateFn;

  beforeEach(() => {
    service = TestBed.inject(VisualizationDataService);
    activateFn = visualizationDataCanActivate();
  });

  it('returns true if data is available', () => {
    service.setData({});
    TestBed.runInInjectionContext(() => {
      expect(activateFn(activatedRouteSnapshot, routerStateSnapshot)).toEqual(true);
    });
  });

  it('returns a url tree if data is unavailable', () => {
    service.clearData();
    TestBed.runInInjectionContext(() => {
      expect(activateFn(activatedRouteSnapshot, routerStateSnapshot)).toBeInstanceOf(UrlTree);
    });
  });
});

describe('visualizationDataResolver()', () => {
  let service: VisualizationDataService;
  let resolveFn: ResolveFn<VisualizationData>;

  beforeEach(() => {
    service = TestBed.inject(VisualizationDataService);
    resolveFn = visualizationDataResolver();
  });

  it('returns true if data is available', () => {
    const data = {};
    service.setData(data);
    TestBed.runInInjectionContext(() => {
      expect(resolveFn(activatedRouteSnapshot, routerStateSnapshot)).toBe(data);
    });
  });
});
