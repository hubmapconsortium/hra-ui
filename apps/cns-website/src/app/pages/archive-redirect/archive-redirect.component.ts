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
import { interval, map, Observable, shareReplay, startWith, Subject, switchMap, take } from 'rxjs';
import { ArchiveStore } from './state/archive.store';

/** Default timestamp for the archive redirect */
const DEFAULT_TIMESTAMP = Date.UTC(2026, 2, 9);
/** Default delay before redirecting, in seconds */
const DEFAULT_REDIRECT_DELAY_SECONDS = 5;

/**
 * Parse an attribute value into a timestamp, returning a default value if the input is invalid.
 *
 * @param value Attribute value to parse
 * @returns Parsed timestamp or default value
 */
function timestampAttribute(value: unknown): number {
  const timestamp = numberAttribute(value, DEFAULT_TIMESTAMP);
  return Number.isFinite(timestamp) && timestamp > 0 ? Math.floor(timestamp) : DEFAULT_TIMESTAMP;
}

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
  readonly timestamp = input(DEFAULT_TIMESTAMP, { transform: timestampAttribute });

  /** Global window reference */
  private readonly window = injectWindow();
  /** Archive store reference */
  private readonly store = inject(ArchiveStore);
  /** Activated route reference */
  private readonly activatedRoute = inject(ActivatedRoute);
  /** Redirect delay in seconds */
  private readonly redirectDelaySeconds = DEFAULT_REDIRECT_DELAY_SECONDS;

  /** Current URL */
  protected readonly currentUrl = computed(() => this.window.location.href);
  /** Redirect URL if found */
  protected readonly redirectUrl = computed(() => this.store.getEntryBefore(this.timestamp())?.redirectUrl);
  /** Whether the archive entries are loading */
  protected readonly isLoading = computed(() => this.store.isLoading());

  /** Subject used to start the redirect countdown */
  private startCountdown$ = new Subject<void>();
  /** Redirect countdown observable */
  protected readonly countdown$ = this.startCountdown$.pipe(
    switchMap(() => countdown(this.redirectDelaySeconds)),
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
