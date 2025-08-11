import { Injectable, isDevMode } from '@angular/core';
import { hraAnalyticsPlugin } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { Analytics } from 'analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  readonly instance = Analytics({
    app: '', // TODO
    // version?
    debug: isDevMode(),
    plugins: [hraAnalyticsPlugin()],
  });

  // TODO
}
