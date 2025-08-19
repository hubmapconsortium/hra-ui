import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createEvent, EventCategory } from '@hra-ui/common/analytics/events';
import { EventDirective } from './event.directive';

// Mock event type for testing
const TestEvent = createEvent('test-event', EventCategory.Necessary);

describe('EventDirective', () => {
  @Component({
    template: `<button [hraEvent]="event" [hraEventProps]="eventProps">Test Button</button>`,
    imports: [EventDirective],
  })
  class TestComponent {
    event = TestEvent;
    eventProps = { action: 'test-click' };
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
