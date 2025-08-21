export { AnalyticsModule } from './lib/analytics.module';
export { AnalyticsService, injectLogEvent } from './lib/analytics/analytics.service';
export {
  ClickEventDirective,
  DoubleClickEventDirective,
  EventDirective,
  HoverEventDirective,
} from './lib/event/event.directive';
export { FeatureDirective, injectFeaturePath } from './lib/feature/feature.directive';
export { ConsentService } from './lib/consent/consent.service';
export { AnalyticsFeature, provideAnalytics, withPlugins } from './lib/providers';
