import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, firstValueFrom, of } from 'rxjs';
import { dashboardDataResolver } from './dashboard-data.resolver';
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
});
