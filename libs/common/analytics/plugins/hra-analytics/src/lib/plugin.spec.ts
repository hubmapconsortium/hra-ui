import { hraAnalyticsPlugin } from './plugin';

describe('Analytics Plugin', () => {
  it('must be called in an injection context', () => {
    expect(() => hraAnalyticsPlugin({})).toThrow();
  });
});
