import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { createJsonSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { render } from '@testing-library/angular';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import * as z from 'zod';

import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';
import { setMirrorUrl } from './endpoints';
import { doMetadataResolver, documentationUrlResolver, kgJsonResolver, productLabelResolver } from './kg-resolver';

jest.mock('@hra-ui/design-system/content-templates/resolvers', () => ({
  createJsonSpecResolver: jest.fn(),
}));

@Component({
  standalone: true,
  template: '',
})
class TestHostComponent {}

describe('kg resolver functions', () => {
  const mockedCreateJsonSpecResolver = jest.mocked(createJsonSpecResolver);
  const mockHttpClient = {
    get: jest.fn(),
  };

  async function setup() {
    await render(TestHostComponent, {
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });
    TestBed.runInInjectionContext(() => setMirrorUrl('https://mirror.test'));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockHttpClient.get.mockReset();
  });

  it('kgJsonResolver prefixes url with mirror base and delegates to resolver factory output', async () => {
    await setup();

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const schema = z.object({ id: z.string() });
    const delegatedResolver = jest.fn().mockReturnValue({ id: 'abc' });

    mockedCreateJsonSpecResolver.mockReturnValue(delegatedResolver);

    const result = TestBed.runInInjectionContext(() =>
      kgJsonResolver('/kg/digital-objects.jsonld', schema)(route, state),
    );

    expect(mockedCreateJsonSpecResolver).toHaveBeenCalledWith('https://mirror.test/kg/digital-objects.jsonld', schema);
    expect(delegatedResolver).toHaveBeenCalledWith(route, state);
    expect(result).toEqual({ id: 'abc' });
  });

  it('doMetadataResolver requests metadata.json using mirror URL and route params', async () => {
    await setup();
    const route = {
      paramMap: {
        get: (key: string) => ({ type: 'ref-organ', name: 'heart', version: 'v1.0' })[key] ?? null,
      },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const metadata = { id: 'id-1' } as DigitalObjectMetadata;

    mockHttpClient.get.mockReturnValue(of(metadata));

    const result = await firstValueFrom(
      TestBed.runInInjectionContext(() => doMetadataResolver()(route, state)) as Observable<
        DigitalObjectMetadata | undefined
      >,
    );

    expect(mockHttpClient.get).toHaveBeenCalledWith('https://mirror.test/ref-organ/heart/v1.0/metadata.json', {
      responseType: 'json',
    });
    expect(result).toEqual(metadata);
  });

  it('doMetadataResolver returns undefined when metadata request fails', async () => {
    await setup();
    const route = {
      paramMap: {
        get: (key: string) => ({ type: 'ref-organ', name: 'heart', version: 'v1.0' })[key] ?? null,
      },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    mockHttpClient.get.mockReturnValue(throwError(() => new Error('request failed')));

    const result = await firstValueFrom(
      TestBed.runInInjectionContext(() => doMetadataResolver()(route, state)) as Observable<
        DigitalObjectMetadata | undefined
      >,
    );

    expect(result).toBeUndefined();
  });

  it('documentationUrlResolver returns expected URL for a known type', async () => {
    await setup();
    const result = TestBed.runInInjectionContext(() =>
      documentationUrlResolver()(
        { params: { type: 'ctann' } } as unknown as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

    expect(result).toBe('https://humanatlas.io/cell-type-annotations');
  });

  it('productLabelResolver returns expected label for a known type', async () => {
    await setup();
    const result = TestBed.runInInjectionContext(() =>
      productLabelResolver()(
        { params: { type: 'ref-organ' } } as unknown as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

    expect(result).toBe('3D reference objects');
  });
});
