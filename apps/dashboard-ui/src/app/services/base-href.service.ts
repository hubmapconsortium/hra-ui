import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseHrefService {
  private baseHref = signal('');

  setBaseHref(ref: string) {
    this.baseHref.set(ref);
  }

  getBaseHref() {
    return this.baseHref();
  }
}
