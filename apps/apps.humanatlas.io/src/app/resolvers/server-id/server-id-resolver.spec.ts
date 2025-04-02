import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { serverIdResolver } from './server-id-resolver.resolver';

describe('serverIdResolver', () => {
  const executeResolver: ResolveFn<string> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => serverIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
