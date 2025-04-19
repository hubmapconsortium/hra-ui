import { InjectionToken } from '@angular/core';
import { register } from 'swiper/element/bundle';

/** Injection token to initialize swiper custom elements */
export const SWIPER_INIT = new InjectionToken<() => void>('Swiper', {
  providedIn: 'platform',
  factory: () => {
    let initialized = false;
    return () => {
      if (!initialized) {
        register();
        initialized = true;
      }
    };
  },
});
