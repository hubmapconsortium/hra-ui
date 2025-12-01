import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { YAML_FILE_CACHE } from './yaml-file-cache';
import { yamlFileResolver } from './yaml-file.resolver';

describe('yamlFileResolver', () => {
  let httpTestingController: HttpTestingController;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: YAML_FILE_CACHE,
          useValue: new Map<string, unknown>(),
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch, parse YAML, and handle caching', async () => {
    const yamlUrl = 'https://example.com/config.yaml';
    const yamlContent = 'key: value\ncount: 42';
    const expectedData = { key: 'value', count: 42 };
    const cache = TestBed.inject(YAML_FILE_CACHE);

    const resolver = yamlFileResolver(yamlUrl, { cache: true });

    const firstResult$ = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    const firstPromise = firstValueFrom(firstResult$ as Observable<unknown>);
    const req = httpTestingController.expectOne(yamlUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');
    req.flush(yamlContent);

    const firstResult = await firstPromise;
    expect(firstResult).toEqual(expectedData);
    expect(cache.has(yamlUrl)).toBe(true);
    expect(cache.get(yamlUrl)).toEqual(expectedData);

    // Second call - should return from cache without making HTTP request
    const secondResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));
    expect(secondResult).toEqual(expectedData);
    httpTestingController.expectNone(yamlUrl);
  });

  it('should handle ProviderToken for URL injection', async () => {
    const URL_TOKEN = new InjectionToken<string>('URL_TOKEN');
    const yamlUrl = 'https://example.com/token.yaml';
    const yamlContent = 'injected: true';
    const expectedData = { injected: true };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: URL_TOKEN, useValue: yamlUrl },
        {
          provide: YAML_FILE_CACHE,
          useValue: new Map<string, unknown>(),
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    const resolver = yamlFileResolver(URL_TOKEN);
    const resolverResult = TestBed.runInInjectionContext(() => resolver(mockRoute, mockState));

    const resultPromise = firstValueFrom(resolverResult as Observable<unknown>);
    const req = httpTestingController.expectOne(yamlUrl);
    req.flush(yamlContent);

    const result = await resultPromise;
    expect(result).toEqual(expectedData);

    httpTestingController.verify();
  });
});
