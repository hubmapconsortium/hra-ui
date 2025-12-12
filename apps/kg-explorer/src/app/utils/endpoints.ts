import { assertInInjectionContext, inject, Signal, signal } from '@angular/core';
import { HraApiConfiguration } from '@hra-api/ng-client';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../environments/environment';

/** Signal token for mirror URL, initialized from environment. */
const MIRROR_URL = createInjectionToken(() => signal(environment.mirrorUrl));

/** Returns a signal for the API endpoint (from config or environment). */
export function injectRemoteApiEndpoint(): Signal<string> {
  assertInInjectionContext(injectRemoteApiEndpoint);
  const config = inject(HraApiConfiguration);
  return signal(config.basePath ?? environment.remoteApiEndpoint);
}

/** Sets the API endpoint in `HraApiConfiguration`. */
export function setRemoteApiEndpoint(url: string): void {
  assertInInjectionContext(setRemoteApiEndpoint);
  const config = inject(HraApiConfiguration);
  config.basePath = url;
}

/** Returns a read-only signal for the mirror URL. */
export function injectMirrorUrl(): Signal<string> {
  return MIRROR_URL[0]().asReadonly();
}

/** Updates the mirror URL signal. */
export function setMirrorUrl(url: string): void {
  assertInInjectionContext(setMirrorUrl);
  const mirrorUrl = MIRROR_URL[0]();
  mirrorUrl.set(url);
}
