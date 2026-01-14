import { Component, runInInjectionContext } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { render } from '@testing-library/angular';
import { createReleaseNotesContentResolver } from './release-notes-content.resolver';

@Component({ standalone: true, template: '' })
class TestComponent {}

describe('createReleaseNotesContentResolver', () => {
  async function setup() {
    const renderResult = await render(TestComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const httpMock = renderResult.fixture.debugElement.injector.get(HttpTestingController);

    return { ...renderResult, httpMock };
  }

  it('should extract version, construct URL, create resolver, and call it', async () => {
    const { httpMock, fixture } = await setup();

    const mockRoute = {
      params: { version: 'v1.2.3' },
    } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const resolver = createReleaseNotesContentResolver('https://example.com');
    const injector = fixture.debugElement.injector;

    let resolved = false;
    runInInjectionContext(injector, () => {
      const result = resolver(mockRoute, mockState);

      if (result && typeof result === 'object' && 'subscribe' in result) {
        (result as { subscribe: (fn: () => void) => void }).subscribe(() => {
          resolved = true;
        });
      }
    });

    const req = httpMock.expectOne('https://example.com/v1.2.3.yaml');
    expect(req.request.method).toBe('GET');
    req.flush('$schema: ""\ntitle: "Test"\nsubtitle: "Test"\ncontent: []');

    expect(resolved).toBe(true);
    httpMock.verify();
  });
});
