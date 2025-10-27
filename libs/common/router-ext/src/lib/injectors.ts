import type { Router } from '@angular/router';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';

/** Router token - tree shakable */
const ROUTER = createNoopInjectionToken<Router>('ROUTER');

/**
 * Inject the router.
 * Use instead of `inject(Router, { optional: true })` for better tree shaking.
 */
export const injectRouter = ROUTER[0];
/** Provide the router */
export const provideRouter = ROUTER[1];
