import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventWriterService } from '../../../plugins/hra-analytics/src/lib/event-writer.service';
import { hraAnalyticsPlugin } from '../../../plugins/hra-analytics/src/lib/plugin';
import { CoreEvents, createEvent, EventCategory } from '../../../events/src';
import { AnalyticsService, injectLogEvent, PLUGINS } from './analytics.service';

const eventProps = { data: 'test' };

jest.mock('analytics', () => ({
  Analytics: jest.fn(() => ({ track: jest.fn().mockResolvedValue(undefined) })),
}));

// Mock feature path
jest.mock('./feature/feature.directive', () => ({
  injectFeaturePath: () => () => '/test/path',
}));

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  const testEvent = createEvent('test-event', EventCategory.Necessary);
  @Component({ template: '' })
  class TestComponent {
    logEvent = injectLogEvent();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created and log events', () => {
    expect(service).toBeTruthy();

    const spy = jest.spyOn(service.instance, 'track').mockResolvedValue(undefined);
    service.logEvent(testEvent, eventProps);
    expect(spy).toHaveBeenCalledWith('test-event', eventProps, { category: 'necessary', eventObj: testEvent });
  });

  describe('plugin handling', () => {
    const setupPluginTest = (plugins: unknown[]) => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [{ provide: PLUGINS, useValue: plugins }],
      });
      return TestBed.inject(AnalyticsService);
    };

    it('should execute plugin factories and handle mixed plugin types', () => {
      const pluginObj = { name: 'static-plugin', loaded: () => true };
      const factory = jest.fn(() => ({ name: 'dynamic-plugin', loaded: () => true }));
      const hraFactory = jest.fn(() => hraAnalyticsPlugin({ sessionId: 'test-session' }));

      const Analytics = require('analytics').Analytics;
      Analytics.mockClear();

      setupPluginTest([[hraFactory, factory, pluginObj], [pluginObj]]);

      expect(factory).toHaveBeenCalled();
      expect(hraFactory).toHaveBeenCalled();

      const initArgs = Analytics.mock.calls[0][0];
      const pluginNames = initArgs.plugins.map((p: { name?: string }) => p?.name).filter(Boolean);
      expect(pluginNames).toContain('dynamic-plugin');
      expect(pluginNames).toContain('static-plugin');
    });
  });

  it('should log CoreEvents.Error on tracking failures and fallback to console on error event failures', async () => {
    const trackError = new Error('Failure');
    const logEventSpy = jest.spyOn(service, 'logEvent');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    jest.spyOn(service.instance, 'track').mockRejectedValueOnce(trackError).mockResolvedValueOnce(undefined);

    service.logEvent(testEvent, eventProps);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(logEventSpy).toHaveBeenNthCalledWith(2, CoreEvents.Error, {
      message: `Failed to log event '${testEvent.type}'`,
      context: eventProps,
      reason: trackError,
    });

    jest.spyOn(service.instance, 'track').mockRejectedValue(trackError);
    const errorProps = { message: 'error', context: {}, reason: trackError };

    service.logEvent(CoreEvents.Error, errorProps);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith('Failed to log error [reason, props]: ', trackError, errorProps);

    consoleSpy.mockRestore();
  });

  it('should inject log event function that adds feature path to props', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;

    expect(component.logEvent).toBeInstanceOf(Function);

    const spy = jest.spyOn(service, 'logEvent');
    component.logEvent(testEvent, eventProps);

    expect(spy).toHaveBeenCalledWith(testEvent, {
      path: '/test/path',
      ...eventProps,
    });
  });

  it('should create HRA plugin with page and track methods', () => {
    const mockWriter = { write: jest.fn() };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: EventWriterService, useValue: mockWriter }],
    });

    TestBed.runInInjectionContext(() => {
      const plugin = hraAnalyticsPlugin({ sessionId: 'test-session' });

      expect(plugin.name).toBe('hra-analytics');
      expect(plugin.page).toBeInstanceOf(Function);
      expect(plugin.track).toBeInstanceOf(Function);

      plugin.page?.({
        config: { sessionId: 'test-session' },
        instance: { getState: () => 'test' },
        payload: { event: 'page', properties: { url: '/test' } },
      });

      plugin.track?.({
        config: { sessionId: 'test-session' },
        payload: { event: 'click', properties: { action: 'click' } },
      });

      // Verify the writer.write method was called
      expect(mockWriter.write).toHaveBeenCalledTimes(2);
    });
  });
});
