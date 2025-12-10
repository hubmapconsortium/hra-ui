import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { createReleaseNotesContentResolver } from './release-notes-content.resolver';

describe('createReleaseNotesContentResolver', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should extract version, construct URL, create resolver, and call it', (done) => {
    const mockRoute = {
      params: { version: 'v1.2.3' },
    } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const resolver = createReleaseNotesContentResolver('https://example.com');

    TestBed.runInInjectionContext(() => {
      const result = resolver(mockRoute, mockState);

      if (result && typeof result === 'object' && 'subscribe' in result) {
        (result as { subscribe: (fn: () => void) => void }).subscribe(() => {
          done();
        });
      }
    });

    const req = httpTestingController.expectOne('https://example.com/v1.2.3.yaml');
    expect(req.request.method).toBe('GET');
    req.flush('$schema: ""\ntitle: "Test"\nsubtitle: "Test"\ncontent: []');
  });
});
