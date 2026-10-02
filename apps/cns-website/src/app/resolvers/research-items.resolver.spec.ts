import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { ResearchData } from '../schemas/research.schema';
import { createResearchItemsResolver } from './research-items.resolver';

const rawItem = (slug: string, type: string) => ({
  slug,
  category: 'event',
  type,
  title: slug,
  dateStart: '2024-01-01',
  dateEnd: '2024-01-01',
});

describe('createResearchItemsResolver', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  function runResolver(resolver: ReturnType<typeof createResearchItemsResolver>): Promise<ResearchData> {
    const result = TestBed.runInInjectionContext(() =>
      resolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ) as Observable<ResearchData>;
    return firstValueFrom(result);
  }

  it('should load and combine items from multiple urls', async () => {
    const promise = runResolver(createResearchItemsResolver(['a.json', 'b.json']));
    httpMock.expectOne((req) => req.url.endsWith('a.json')).flush([rawItem('a', 'workshop')]);
    httpMock.expectOne((req) => req.url.endsWith('b.json')).flush([rawItem('b', 'tutorial')]);

    const items = await promise;
    expect(items.map((item) => item.slug)).toEqual(['a', 'b']);
  });

  it('should filter items when a filter is provided', async () => {
    const promise = runResolver(createResearchItemsResolver(['a.json'], (item) => item.type === 'tutorial'));
    httpMock.expectOne((req) => req.url.endsWith('a.json')).flush([rawItem('a', 'workshop'), rawItem('b', 'tutorial')]);

    const items = await promise;
    expect(items.map((item) => item.slug)).toEqual(['b']);
  });
});
