import { TestBed } from '@angular/core/testing';
import { StateAnalyticsPluginService } from './state-analytics-plugin.service';

describe('StateAnalyticsPluginService', () => {
  let service: StateAnalyticsPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAnalyticsPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
