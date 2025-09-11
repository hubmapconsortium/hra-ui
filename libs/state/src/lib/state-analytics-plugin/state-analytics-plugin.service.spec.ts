import { TestBed } from '@angular/core/testing';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { StateAnalyticsPluginService } from './state-analytics-plugin.service';
import { NgxsNextPluginFn } from '@ngxs/store';

describe('StateAnalyticsPluginService', () => {
  let service: StateAnalyticsPluginService;
  let gaSpy: GoogleAnalyticsService;
  let nextSpy: NgxsNextPluginFn;
  const state = { property: 'value' };
  const action = { type: 'TestAction', payload: 'TestPayload' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAnalyticsPluginService);
    gaSpy = TestBed.inject(GoogleAnalyticsService);
    nextSpy = jest.fn().mockReturnValue({ state, action });
    jest.spyOn(gaSpy, 'event').mockReturnValue();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call logaction on handle trigger with undefined type', () => {
    const noTypeAction = new Object();
    service.handle({}, noTypeAction, nextSpy);
  });

  it('should call logaction on handle trigger with undefined category', () => {
    const testTypeAction = new Object({ type: 'TEST ACTION' });
    service.handle({}, testTypeAction, nextSpy);
  });

  describe('logAction method', () => {
    it('should call JSON.stringify with serialize function when action type is loggable', () => {
      const mockAction = { type: 'TestAction', payload: { data: 'test' } };
      const jsonStringifySpy = jest.spyOn(JSON, 'stringify');

      const serviceAny = service as any;
      serviceAny.loggableTypes.add('TestAction');

      serviceAny.logAction(mockAction);

      expect(jsonStringifySpy).toHaveBeenCalledWith(mockAction, serviceAny.serialize);
      expect(gaSpy.event).toHaveBeenCalledWith('TestAction', 'action_log', expect.any(String));

      jsonStringifySpy.mockRestore();
    });
  });

  describe('serialize method', () => {
    let serializeMethod: (key: unknown, value: unknown) => unknown;

    beforeEach(() => {
      const serviceAny = service as any;
      serializeMethod = serviceAny.serialize;
    });

    it('should remove type property when key is empty string and value is object', () => {
      const testObject = { type: 'TestAction', payload: 'data', other: 'value' };
      const result = serializeMethod('', testObject);

      expect(result).toEqual({ type: undefined, payload: 'data', other: 'value' });
    });

    it('should return primitive values as-is', () => {
      expect(serializeMethod('key', 'string')).toBe('string');
      expect(serializeMethod('key', 123)).toBe(123);
      expect(serializeMethod('key', true)).toBe(true);
      expect(serializeMethod('key', null)).toBe(null);
      expect(serializeMethod('key', undefined)).toBe(undefined);
      expect(serializeMethod('key', BigInt(42))).toBe(BigInt(42));
    });

    it('should return array of primitives as-is', () => {
      const primitiveArray = ['string', 123, true, null];
      expect(serializeMethod('key', primitiveArray)).toEqual(primitiveArray);
    });

    it('should return undefined for non-primitive objects', () => {
      const complexObject = { nested: { data: 'value' } };
      expect(serializeMethod('key', complexObject)).toBe(undefined);
    });

    it('should return undefined for arrays containing non-primitive values', () => {
      const mixedArray = ['string', { complex: 'object' }];
      expect(serializeMethod('key', mixedArray)).toBe(undefined);
    });
  });

  describe('isPrimitive function behavior (tested through serialize)', () => {
    let serializeMethod: (key: unknown, value: unknown) => unknown;

    beforeEach(() => {
      const serviceAny = service as any;
      serializeMethod = serviceAny.serialize;
    });

    it('should correctly identify primitive types', () => {
      expect(serializeMethod('test', 'string')).toBe('string');
      expect(serializeMethod('test', 42)).toBe(42);
      expect(serializeMethod('test', true)).toBe(true);
      expect(serializeMethod('test', BigInt(123))).toBe(BigInt(123));
      expect(serializeMethod('test', null)).toBe(null);
      expect(serializeMethod('test', undefined)).toBe(undefined);

      expect(serializeMethod('test', {})).toBe(undefined);
      expect(serializeMethod('test', new Date())).toBe(undefined);
    });
  });
});
