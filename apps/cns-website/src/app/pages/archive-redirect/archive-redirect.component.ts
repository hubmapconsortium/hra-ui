import { ChangeDetectionStrategy, Component, computed, effect, inject, input, numberAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { injectWindow } from '@hra-ui/common/injectors';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CopyableUrlContainerComponent } from '@hra-ui/design-system/copyable-url-container';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { interval, map, Observable, shareReplay, startWith, Subject, switchMap, take } from 'rxjs';
import { ArchiveStore } from './state/archive.store';

/** Options for configuring the archive redirect component */
export interface ArchiveRedirectOptions {
  /** Timestamp to look for archived pages before (in milliseconds since epoch) */
  timestamp?: number;
  /** Delay before redirecting, in seconds */
  redirectDelaySeconds?: number;
}

/** Default options for the archive redirect component */
const DEFAULT_OPTIONS: Required<ArchiveRedirectOptions> = {
  timestamp: Date.UTC(2026, 2, 9), // March 9, 2026
  redirectDelaySeconds: 5,
};

/** Injection token for archive redirect options */
const OPTIONS_TOKEN = createInjectionToken((): ArchiveRedirectOptions => DEFAULT_OPTIONS);

/** Inject archive redirect options */
export const injectArchiveRedirectOptions = OPTIONS_TOKEN[0];
/** Provide a different set of archive redirect options */
export const provideArchiveRedirectOptions = OPTIONS_TOKEN[1];

/**
 * RxJS operator that creates a countdown from a specified number of seconds,
 * emitting the remaining seconds at each tick.
 *
 * @param seconds Number of seconds to count down from
 * @returns Observable emitting the remaining seconds at each tick
 */
function countdown(seconds: number): Observable<number> {
  return interval(1000).pipe(
    take(seconds),
    map((elapsedSeconds) => seconds - elapsedSeconds - 1),
    startWith(seconds),
  );
}

/**
 * Component for handling redirects from archived pages.
 * It checks if the current URL matches any known archived page URLs and, if so, displays a message and
 * automatically redirects to the archived page after a short delay.
 */
@Component({
  selector: 'cns-archive-redirect',
  imports: [
    HraCommonModule,
    ButtonsModule,
    CopyableUrlContainerComponent,
    LinkDirective,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './archive-redirect.component.html',
  styleUrl: './archive-redirect.component.scss',
  providers: [ArchiveStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveRedirectComponent {
  /** Look for pages archived no later than this timestamp */
  readonly timestamp = input<string | number>();

  /** Archive redirect options */
  readonly options = { ...DEFAULT_OPTIONS, ...injectArchiveRedirectOptions() };

  /** Global window reference */
  private readonly window = injectWindow();
  /** Archive store reference */
  private readonly store = inject(ArchiveStore);
  /** Activated route reference */
  private readonly activatedRoute = inject(ActivatedRoute);

  /** Parsed timestamp */
  private readonly parsedTimestamp = computed(() => {
    const defaultTimestamp = this.options.timestamp;
    const value = numberAttribute(this.timestamp(), defaultTimestamp);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : defaultTimestamp;
  });

  /** Current URL */
  protected readonly currentUrl = computed(() => this.window.location.href);
  /** Redirect URL if found */
  protected readonly redirectUrl = computed(() => this.store.getEntryBefore(this.parsedTimestamp())?.redirectUrl);
  /** Whether the archive entries are loading */
  protected readonly isLoading = computed(() => this.store.isLoading());

  /** Subject used to start the redirect countdown */
  private startCountdown$ = new Subject<void>();
  /** Redirect countdown observable */
  protected readonly countdown$ = this.startCountdown$.pipe(
    switchMap(() => countdown(this.options.redirectDelaySeconds)),
    takeUntilDestroyed(),
    shareReplay(1),
  );

  /**
   * Initializes the component by loading the archive entries for the current route and
   * setting up an effect to start the redirect countdown if a redirect URL is found.
   */
  constructor() {
    const route = this.activatedRoute.url.pipe(
      map((segments) => segments.map((segment) => segment.toString()).join('/')),
    );
    this.store.loadEntries(route);

    effect(() => {
      const url = this.redirectUrl();
      if (!this.isLoading() && url) {
        this.startCountdown$.next();
      }
    });

    this.countdown$.subscribe((secondsLeft) => {
      const url = this.redirectUrl();
      if (secondsLeft === 0 && url) {
        this.window.location.href = url;
      }
    });
  }
}
