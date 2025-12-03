import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, firstValueFrom, of } from 'rxjs';
import { dashboardCanActivate } from './dashboard.guard';
import * as DashboardDataResolver from '../resolvers/dashboard-data/dashboard-data.resolver';

describe('dashboardCanActivate', () => {
  function setup() {
    const mockRouter = {
      createUrlTree: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    const mockRoute = {
      paramMap: {
        get: jest.fn(),
      },
    } as unknown as ActivatedRouteSnapshot;

    const mockState = {
      url: '/test',
    } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }, provideHttpClient(), provideHttpClientTesting()],
    });

    const dashboardUrlResolverSpy = jest.spyOn(DashboardDataResolver, 'dashboardUrlResolver');

    return { mockRouter, mockRoute, mockState, dashboardUrlResolverSpy };
  }

  it('should allow activation when url is resolved and redirect when not resolved', async () => {
    const { mockRouter, mockRoute, mockState, dashboardUrlResolverSpy } = setup();
    const indexUrl = 'test-index.yaml';

    dashboardUrlResolverSpy.mockReturnValue(() => of('valid-url'));
    const guard1 = dashboardCanActivate(indexUrl);

    const resultWithUrl = await firstValueFrom(
      TestBed.runInInjectionContext(() => {
        const guardResult = guard1(mockRoute, mockState);
        return guardResult as Observable<boolean | UrlTree>;
      }),
    );

    expect(resultWithUrl).toBe(true);

    const mockUrlTree = {} as UrlTree;
    mockRouter.createUrlTree.mockReturnValue(mockUrlTree);
    dashboardUrlResolverSpy.mockReturnValue(() => of(undefined));
    const guard2 = dashboardCanActivate(indexUrl);

    const resultWithoutUrl = await firstValueFrom(
      TestBed.runInInjectionContext(() => {
        const guardResult = guard2(mockRoute, mockState);
        return guardResult as Observable<boolean | UrlTree>;
      }),
    );

    expect(resultWithoutUrl).toBe(mockUrlTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/'], undefined);
  });
});
