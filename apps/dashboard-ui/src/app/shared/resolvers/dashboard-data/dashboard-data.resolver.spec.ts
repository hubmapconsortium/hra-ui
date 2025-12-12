import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, firstValueFrom, of } from 'rxjs';
import { dashboardDataResolver, dashboardUrlResolver } from './dashboard-data.resolver';
import * as YamlFileResolver from '../yaml-file/yaml-file.resolver';

describe('dashboardDataResolver', () => {
  function setup() {
    const mockRoute = {
      paramMap: {
        get: jest.fn().mockReturnValue('test-dashboard'),
      },
    } as unknown as ActivatedRouteSnapshot;

    const mockState = {
      url: '/test',
    } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const yamlFileResolverSpy = jest.spyOn(YamlFileResolver, 'yamlFileResolver');

    return { mockRoute, mockState, yamlFileResolverSpy };
  }

  it('should resolve dashboard data from URL', async () => {
    const { mockRoute, mockState, yamlFileResolverSpy } = setup();
    const indexUrl = 'test-index.yaml';
    const mockIndexSpec = {
      items: [{ route: 'test-dashboard', url: 'dashboard-config.yaml' }],
    };
    const mockDashboardSpec = {
      component: 'some-component',
      data: { title: 'Test Dashboard' },
    };

    yamlFileResolverSpy.mockReturnValueOnce(() => of(mockIndexSpec)).mockReturnValueOnce(() => of(mockDashboardSpec));

    const resolver = dashboardDataResolver(indexUrl);
    const resolverResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    const result = await firstValueFrom(resolverResult as Observable<unknown>);

    expect(result).toEqual(mockDashboardSpec);
  });

  it('should use custom routeParamKey when provided', async () => {
    const { mockState, yamlFileResolverSpy } = setup();
    const mockRoute = {
      paramMap: {
        get: jest.fn().mockReturnValue('custom-route'),
      },
    } as unknown as ActivatedRouteSnapshot;

    const indexUrl = 'test-index.yaml';
    const mockIndexSpec = {
      items: [{ route: 'custom-route', url: 'custom-config.yaml' }],
    };
    const mockDashboardSpec = {
      component: 'custom-component',
      data: { title: 'Custom Dashboard' },
    };

    yamlFileResolverSpy.mockReturnValueOnce(() => of(mockIndexSpec)).mockReturnValueOnce(() => of(mockDashboardSpec));

    const resolver = dashboardDataResolver(indexUrl, 'customKey');
    const resolverResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    const result = await firstValueFrom(resolverResult as Observable<unknown>);

    expect(mockRoute.paramMap.get).toHaveBeenCalledWith('customKey');
    expect(result).toEqual(mockDashboardSpec);
  });

  it('should handle null route parameter with nullish coalescing', async () => {
    const { mockState, yamlFileResolverSpy } = setup();
    const mockRoute = {
      paramMap: {
        get: jest.fn().mockReturnValue(null),
      },
    } as unknown as ActivatedRouteSnapshot;

    const indexUrl = 'test-index.yaml';
    const mockIndexSpec = {
      items: [{ route: '', url: 'default-config.yaml' }],
    };
    const mockDashboardSpec = {
      component: 'default-component',
      data: { title: 'Default Dashboard' },
    };

    yamlFileResolverSpy.mockReturnValueOnce(() => of(mockIndexSpec)).mockReturnValueOnce(() => of(mockDashboardSpec));

    const resolver = dashboardDataResolver(indexUrl);
    const resolverResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    const result = await firstValueFrom(resolverResult as Observable<unknown>);

    expect(result).toEqual(mockDashboardSpec);
  });

  it('should return undefined when no matching route is found', async () => {
    const { mockRoute, mockState, yamlFileResolverSpy } = setup();
    const indexUrl = 'test-index.yaml';
    const mockIndexSpec = {
      items: [{ route: 'different-dashboard', url: 'different-config.yaml' }],
    };

    yamlFileResolverSpy.mockReturnValueOnce(() => of(mockIndexSpec));

    const resolver = dashboardUrlResolver(indexUrl);
    const resolverResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    const result = await firstValueFrom(resolverResult as Observable<string | undefined>);

    expect(result).toBeUndefined();
  });

  it('should handle item without url using optional chaining', async () => {
    const { mockRoute, mockState, yamlFileResolverSpy } = setup();
    const indexUrl = 'test-index.yaml';
    const mockIndexSpec = {
      items: [{ route: 'test-dashboard' }],
    };

    yamlFileResolverSpy.mockReturnValueOnce(() => of(mockIndexSpec));

    const resolver = dashboardUrlResolver(indexUrl);
    const resolverResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    const result = await firstValueFrom(resolverResult as Observable<string | undefined>);

    expect(result).toBeUndefined();
  });
});
