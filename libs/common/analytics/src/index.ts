export { AnalyticsModule } from './lib/analytics.module';
export { AnalyticsService, injectLogEvent } from './lib/analytics.service';
export { EventDirective } from './lib/event/event.directive';
export { FeatureDirective, injectFeaturePath } from './lib/feature/feature.directive';
export { PreferencesService } from './lib/preferences/preferences.service';
export { AnalyticsFeature, provideAnalytics, withPlugins } from './lib/providers';
