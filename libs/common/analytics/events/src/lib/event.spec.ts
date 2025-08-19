import { createEvent, EventCategory } from './event';

describe('Analytics Event System', () => {
  it('should create an event with type, category, and optionally trigger', () => {
    const type = 'test';
    const trigger = 'click';

    const event = createEvent(type, EventCategory.Necessary);
    expect(event.type).toBe(type);
    expect(event.category).toBe(EventCategory.Necessary);

    const event2 = createEvent(type, EventCategory.Necessary, trigger);
    expect(event2.trigger).toBe(trigger);
  });
});
