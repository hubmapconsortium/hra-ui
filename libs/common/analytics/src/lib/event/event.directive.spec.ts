import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createEvent, EventCategory } from '../../../events/src/lib/event';
import { EventDirective } from './event.directive';

// Mock event type for testing
const TestEvent = createEvent('test-event', EventCategory.Necessary);

describe('EventDirective', () => {
  @Component({
    template: `<button
      [hraEvent]="event"
      [hraEventProps]="eventProps"
      hraEventTriggerOn="click"
      data-testid="test-button"
    >
      Test Button
    </button>`,
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

  it('should call logEvent when triggered', () => {
    const fixture = TestBed.createComponent(TestComponent);

    const directiveDebugElement = fixture.debugElement.query(By.directive(EventDirective));
    const directiveInstance = directiveDebugElement.injector.get(EventDirective);
    jest.spyOn(directiveInstance, 'logEvent');
    fixture.detectChanges();

    directiveDebugElement.nativeElement.click();

    expect(directiveInstance.logEvent).toHaveBeenCalledWith('click', expect.any(Event));
  });
});
