import { TestBed } from '@angular/core/testing';
import { ConsentService } from './consent.service';
import { EventCategory } from '@hra-ui/common/analytics/events';

describe('ConsentService', () => {
  function setup() {
    return TestBed.inject(ConsentService);
  }

  it('should handle updates to event category consent settings', () => {
    const { Necessary, Statistics } = EventCategory;
    const service = setup();
    const expectEnabled = (cat: EventCategory) => expect(service.isCategoryEnabled(cat)).toBeTruthy();
    const expectDisabled = (cat: EventCategory) => expect(service.isCategoryEnabled(cat)).toBeFalsy();

    expectEnabled(Necessary);
    expectDisabled(Statistics);

    service.enableAllCategories();
    expectEnabled(Statistics);

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
