import { createEvent, payload } from './event';

describe('Analytics Event System', () => {
  it('should create an event type with the specified name', () => {
    const eventType = createEvent('test-event', payload<{ userId: string }>());
    expect(eventType).toBe('test-event');
  });

  it('should create an event type with complex payload structure', () => {
    interface CustomPayload {
      id: number;
      name: string;
      metadata: {
        source: string;
        timestamp: Date;
      };
    }

    const eventType = createEvent('complex-event', payload<CustomPayload>());
    expect(eventType).toBe('complex-event');
  });

  it('should handle very long event type names', () => {
    const longEventName = 'a'.repeat(1000);
    const longEvent = createEvent(longEventName, payload<{ data: string }>());

    expect(longEvent).toBe(longEventName);
  });
});
