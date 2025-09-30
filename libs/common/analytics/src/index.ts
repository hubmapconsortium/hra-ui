export { AnalyticsErrorHandlerConfig } from './lib/analytics-features/error-handler';
export { AnalyticsModule } from './lib/analytics.module';
export { AnalyticsService, injectLogEvent } from './lib/analytics/analytics.service';
export { ConsentCategories, ConsentService } from './lib/consent/consent.service';
export {
  ClickEventDirective,
  DoubleClickEventDirective,
  EventDirective,
  HoverEventDirective,
  KeyboardEventDirective,
  ModelChangeEventDirective,
} from './lib/event/event.directive';
export { FeatureDirective, injectFeaturePath } from './lib/feature/feature.directive';
export { AnalyticsFeature, provideAnalytics, withErrorHandler, withPlugins, withRouterEvents } from './lib/providers';
