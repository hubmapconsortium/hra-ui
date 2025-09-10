import { TestBed } from '@angular/core/testing';
import { CoreEvents, EventCategory, EventType } from '@hra-ui/common/analytics/events';
import { ConsentService } from './consent.service';

describe('ConsentService', () => {
  function setup() {
    return TestBed.inject(ConsentService);
  }

  it('should handle updates to event category consent settings', () => {
    const {
      Click: { type: Click },
      Error: { type: Error },
    } = CoreEvents;
    const { Necessary, Statistics } = EventCategory;
    const service = setup();
    const expectEnabled = (cat: EventCategory) => expect(service.isCategoryEnabled(cat)).toBeTruthy();
    const expectDisabled = (cat: EventCategory) => expect(service.isCategoryEnabled(cat)).toBeFalsy();
    const expectEventEnabled = (type: EventType, cat?: EventCategory) =>
      expect(service.isEventEnabled(type, cat)).toBeTruthy();
    const expectEventDisabled = (type: EventType, cat?: EventCategory) =>
      expect(service.isEventEnabled(type, cat)).toBeFalsy();

    expectEnabled(Necessary);
    expectDisabled(Statistics);
    expectEventEnabled(Error, Necessary);
    expectEventDisabled(Click, Statistics);

    service.enableAllCategories();
    expectEnabled(Statistics);
    expectEventEnabled(Click, Statistics);
    expectEventDisabled(Error, undefined);

    service.disableAllCategories();
    expectEnabled(Necessary);
    expectDisabled(Statistics);

    service.enableCategory(Statistics);
    expectEnabled(Statistics);

    service.disableCategory(Statistics);
    expectDisabled(Statistics);

    service.disableCategory(Necessary);
    expectEnabled(Necessary);
  });
});
