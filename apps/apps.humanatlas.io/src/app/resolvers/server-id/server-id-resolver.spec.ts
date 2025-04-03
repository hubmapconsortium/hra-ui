import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { servers } from '../../constants/server.constants';
import { serverIdResolver } from './server-id-resolver.resolver';

describe('serverIdResolver', () => {
  const executeResolver: ResolveFn<string> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => serverIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRouteSnapshot,
          useValue: { paramMap: convertToParamMap({ serverId: servers[0].id }) },
        },
        {
          provide: RouterStateSnapshot,
          useValue: {},
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return a valid server ID', () => {
    expect(executeResolver(TestBed.inject(ActivatedRouteSnapshot), TestBed.inject(RouterStateSnapshot))).toBe(
      servers[0].id,
    );
  });
});
