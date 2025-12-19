import { TestBed } from '@angular/core/testing';
import { Signal } from '@angular/core';
import { HraApiConfiguration } from '@hra-api/ng-client';
import { environment } from '../../environments/environment';

import { injectRemoteApiEndpoint, setRemoteApiEndpoint, injectMirrorUrl, setMirrorUrl } from './endpoints';

describe('HRA API utilities', () => {
  let config: HraApiConfiguration;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HraApiConfiguration,
          useValue: { basePath: undefined } as HraApiConfiguration,
        },
      ],
    });

    config = TestBed.inject(HraApiConfiguration);
  });

  describe('injectRemoteApiEndpoint', () => {
    it('should return signal with environment.remoteApiEndpoint if config.basePath is undefined', () => {
      const endpointSignal: Signal<string> = TestBed.runInInjectionContext(() => injectRemoteApiEndpoint());
      expect(endpointSignal()).toBe(environment.remoteApiEndpoint);
    });

    it('should return signal with config.basePath if defined', () => {
      config.basePath = 'https://custom-api.test';
      const endpointSignal: Signal<string> = TestBed.runInInjectionContext(() => injectRemoteApiEndpoint());
      expect(endpointSignal()).toBe('https://custom-api.test');
    });
  });

  describe('setRemoteApiEndpoint', () => {
    it('should update config.basePath', () => {
      TestBed.runInInjectionContext(() => setRemoteApiEndpoint('https://new-api.test'));
      expect(config.basePath).toBe('https://new-api.test');
    });
  });

  describe('injectMirrorUrl', () => {
    it('should return signal initialized from environment.mirrorUrl', () => {
      const mirrorSignal: Signal<string> = TestBed.runInInjectionContext(() => injectMirrorUrl());
      expect(mirrorSignal()).toBe(environment.mirrorUrl);
    });
  });

  describe('setMirrorUrl', () => {
    it('should update mirrorUrl signal value', () => {
      const mirrorSignal: Signal<string> = TestBed.runInInjectionContext(() => injectMirrorUrl());
      expect(mirrorSignal()).toBe(environment.mirrorUrl);

      TestBed.runInInjectionContext(() => setMirrorUrl('https://new-mirror.test'));
      expect(mirrorSignal()).toBe('https://new-mirror.test');
    });
  });
});
