import { coerceElement } from '@angular/cdk/coercion';
import {
  assertInInjectionContext,
  DestroyRef,
  ElementRef,
  inject,
  Injectable,
  Injector,
  OnDestroy,
  signal,
  Signal,
} from '@angular/core';
import { getOrCreate } from './util/get-or-create';

export interface ResizeMonitorOptions {
  box?: ResizeObserverBoxOptions;
  injector?: Injector;
}

export interface ResizeMonitor extends Signal<readonly ResizeObserverSize[]> {
  destroy(): void;
}

export function monitorSize(
  elementOrRef: Element | ElementRef<Element>,
  options?: ResizeMonitorOptions,
): ResizeMonitor {
  if (!options?.injector) {
    assertInInjectionContext(monitorSize);
  }

  const injector = options?.injector ?? inject(Injector);
  const service = injector.get(ResizeMonitorService);
  return service.monitor(elementOrRef, options);
}

@Injectable({
  providedIn: 'root',
})
export class ResizeMonitorService implements OnDestroy {
  private readonly monitorGroups = new Map<ResizeObserverBoxOptions, ResizeMonitorGroup>();

  ngOnDestroy(): void {
    for (const group of this.monitorGroups.values()) {
      group.destroy();
    }
  }

  monitor(elementOrRef: Element | ElementRef<Element>, options?: ResizeMonitorOptions): ResizeMonitor {
    if (!options?.injector) {
      assertInInjectionContext(this.monitor);
    }

    const injector = options?.injector ?? inject(Injector);
    const box = options?.box ?? 'content-box';
    const el = coerceElement(elementOrRef);
    const group = getOrCreate(this.monitorGroups, box, () => new ResizeMonitorGroup(box));
    const monitor = group.getMonitor(el);

    injector.get(DestroyRef).onDestroy(() => monitor.destroy());
    return monitor;
  }
}

class ResizeMonitorSource {
  readonly data = signal<readonly ResizeObserverSize[]>([]);
  private readonly monitors = new Set<ResizeMonitor>();

  constructor(private readonly destroy: () => void) {}

  createMonitor(): ResizeMonitor {
    const monitor = this.data.asReadonly() as ResizeMonitor;
    monitor.destroy = this.destroyMonitor.bind(this, monitor);
    this.monitors.add(monitor);
    return monitor;
  }

  destroyMonitor(monitor: ResizeMonitor): void {
    const { monitors } = this;
    monitors.delete(monitor);
    if (monitors.size === 0) {
      this.destroy();
    }
  }
}

class ResizeMonitorGroup {
  private readonly observer = new ResizeObserver(this.updateSources.bind(this));
  private readonly sources = new Map<Element, ResizeMonitorSource>();

  constructor(private readonly box: ResizeObserverBoxOptions) {}

  getMonitor(el: Element): ResizeMonitor {
    const source = getOrCreate(this.sources, el, () => {
      this.observer.observe(el, { box: this.box });
      return new ResizeMonitorSource(() => this.removeMonitors(el));
    });

    return source.createMonitor();
  }

  removeMonitors(el: Element): void {
    this.observer.unobserve(el);
    this.sources.delete(el);
  }

  destroy(): void {
    this.observer.disconnect();
  }

  private updateSources(entries: ResizeObserverEntry[]): void {
    for (const entry of entries) {
      const source = this.sources.get(entry.target);
      source?.data.set(this.selectBoxData(entry));
    }
  }

  private selectBoxData(entry: ResizeObserverEntry): readonly ResizeObserverSize[] {
    switch (this.box) {
      case 'border-box':
        return entry.borderBoxSize;

      case 'content-box':
        return entry.contentBoxSize;

      case 'device-pixel-content-box':
        return entry.devicePixelContentBoxSize ?? entry.contentBoxSize;
    }
  }
}
