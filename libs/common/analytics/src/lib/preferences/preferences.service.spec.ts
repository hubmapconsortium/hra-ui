import { TestBed } from '@angular/core/testing';
import { PreferencesService } from './preferences.service';
import { EventCategory } from '@hra-ui/common/analytics/events';

describe('PreferencesService', () => {
  function setup() {
    return TestBed.inject(PreferencesService);
  }

  it('should handle updates to event category preferences', () => {
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
