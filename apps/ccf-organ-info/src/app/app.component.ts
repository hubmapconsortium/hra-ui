import { Immutable } from '@angular-ru/cdk/typings';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { AggregateCount, FilterSexEnum, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { NodeClickEvent } from 'ccf-body-ui';
import { GlobalConfigState, OrganInfo, sexFromString } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, combineLatest, of } from 'rxjs';
import { map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { OrganLookupService } from './core/services/organ-lookup/organ-lookup.service';

/** Body ui config */
interface GlobalConfig {
  /** Organ iri */
  organIri?: string;
  /** Organ side */
  side?: string;
  /** Model sex */
  sex?: FilterSexEnum;
  /** Highlight */
  highlightProviders?: string[];
  /** Donor label */
  donorLabel?: string;
  /** Rui app url */
  ruiUrl?: string;
  /** Eui app url */
  euiUrl?: string;
  /** Asctb app url */
  asctbUrl?: string;
  /** Hra portal url */
  hraPortalUrl?: string;
  /** Course url */
  onlineCourseUrl?: string;
  /** Paper url */
  paperUrl?: string;
}

/** Empty scene object */
const EMPTY_SCENE = [{ color: [0, 0, 0, 0], opacity: 0.001 }];

/** Root component */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  /** Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);
  /** Global config */
  private readonly configState = inject<GlobalConfigState<GlobalConfig>>(GlobalConfigState);

  /** Reference to the left container */
  @ViewChild('left', { read: ElementRef, static: true }) left!: ElementRef<HTMLElement>;
  /** Reference to the right container */
  @ViewChild('right', { read: ElementRef, static: true }) right!: ElementRef<HTMLElement>;

  /** Emits when the user switches the model sex */
  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  /** Emits when the user switches organ side */
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();
  /** Emits when the user clicks a node */
  @Output() readonly nodeClicked = new EventEmitter<NodeClickEvent>();

  /** Organ sex */
  readonly sex$ = this.configState.getOption('sex');
  /** Model size */
  readonly side$ = this.configState.getOption('side');
  /** Data filters */
  readonly filter$ = this.configState
    .getOption('highlightProviders')
    .pipe(map((providers) => ({ tmc: providers ?? [] })));
  /** Donor label */
  readonly donorLabel$ = this.configState.getOption('donorLabel');
  /** Rui app url */
  readonly ruiUrl$ = this.configState.getOption('ruiUrl');
  /** Eui app url */
  readonly euiUrl$ = this.configState.getOption('euiUrl');
  /** Asctb app url */
  readonly asctbUrl$ = this.configState.getOption('asctbUrl');
  /** Hra portal url */
  readonly hraPortalUrl$ = this.configState.getOption('hraPortalUrl');
  /** Course url */
  readonly onlineCourseUrl$ = this.configState.getOption('onlineCourseUrl');
  /** Paper url */
  readonly paperUrl$ = this.configState.getOption('paperUrl');

  /** Organ info */
  readonly organInfo$: Observable<OrganInfo | undefined>;
  /** Organ spatial entity */
  readonly organ$: Observable<SpatialEntity | undefined>;
  /** Scene nodes */
  readonly scene$: Observable<SpatialSceneNode[]>;
  /** Organ stats */
  readonly stats$: Observable<AggregateCount[]>;
  /** Label for stats */
  readonly statsLabel$: Observable<string>;
  /** Tissue blocks */
  readonly blocks$: Observable<TissueBlock[]>;

  /** Organ stats */
  stats: AggregateCount[] = [];

  /** Latest config */
  private latestConfig: Immutable<GlobalConfig> = {};
  /** Latest organ info */
  private latestOrganInfo?: OrganInfo;

  /** Inizialize the component */
  constructor() {
    const lookup = inject(OrganLookupService);

    this.organInfo$ = this.configState.config$.pipe(
      tap((config) => (this.latestConfig = config)),
      switchMap((config) =>
        lookup.getOrganInfo(config.organIri ?? '', config.side?.toLowerCase?.() as OrganInfo['side'], config.sex),
      ),
      tap((info) => this.logOrganLookup(info)),
      tap((info) => (this.latestOrganInfo = info)),
      shareReplay(1),
    );

    this.organ$ = this.organInfo$.pipe(
      switchMap((info) =>
        info ? lookup.getOrgan(info, info.hasSex ? this.latestConfig.sex : undefined) : of(undefined),
      ),
      tap((organ) => {
        if (organ && this.latestOrganInfo) {
          const newSex = this.latestOrganInfo?.hasSex && organ.sex !== undefined ? sexFromString(organ.sex) : undefined;
          if (newSex !== this.latestConfig.sex) {
            this.updateInput('sex', newSex);
          }
          if (organ.side !== this.latestConfig.side) {
            this.updateInput('side', organ.side);
          }
        }
      }),
      shareReplay(1),
    );

    this.scene$ = this.organ$.pipe(
      switchMap((organ) =>
        organ && this.latestOrganInfo
          ? lookup.getOrganScene(this.latestOrganInfo, sexFromString(organ.sex ?? ''))
          : of(EMPTY_SCENE as SpatialSceneNode[]),
      ),
    );

    this.stats$ = combineLatest([this.organ$, this.donorLabel$]).pipe(
      switchMap(([organ, donorLabel]) =>
        organ && this.latestOrganInfo
          ? lookup
              .getOrganStats(this.latestOrganInfo, sexFromString(organ.sex ?? ''))
              .pipe(
                map((agg) =>
                  agg.map((result) =>
                    donorLabel && result.label === 'Donors' ? { ...result, label: donorLabel } : result,
                  ),
                ),
              )
          : of([]),
      ),
    );

    this.statsLabel$ = this.organ$.pipe(
      map((organ) => this.makeStatsLabel(this.latestOrganInfo, organ?.sex)),
      startWith('Loading...'),
    );

    this.blocks$ = this.organ$.pipe(
      switchMap((organ) =>
        organ && this.latestOrganInfo ? lookup.getBlocks(this.latestOrganInfo, sexFromString(organ.sex ?? '')) : of([]),
      ),
    );
  }

  /** Initialize parts that depend on dom elements */
  ngAfterViewInit(): void {
    const { left, right } = this;
    const rightHeight = right.nativeElement.offsetHeight;
    left.nativeElement.style.height = `${rightHeight}px`;
  }

  /**
   * Update the global config state
   *
   * @param key Key to update
   * @param value New value
   */
  updateInput(key: string, value: unknown): void {
    this.configState.patchConfig({ [key]: value });
  }

  /**
   * Create a label for stats
   *
   * @param info Organ info
   * @param sex Model sex
   * @returns A label
   */
  private makeStatsLabel(info: OrganInfo | undefined, sex?: string): string {
    let parts: (string | undefined)[] = [`Unknown IRI: ${this.latestConfig.organIri}`];
    if (info) {
      // Use title cased side for a cleaner display
      const side = info.side ? info.side.charAt(0).toUpperCase() + info.side.slice(1) : undefined;
      parts = [sex, info.organ, side];
    }
    return parts.filter((seg) => !!seg).join(', ');
  }

  /**
   * Creates an analytics event for the organ info
   *
   * @param info Organ info
   */
  private logOrganLookup(info: OrganInfo | undefined): void {
    const event = info ? 'organ_lookup_success' : 'organ_lookup_failure';
    const inputs = `Iri: ${this.latestConfig.organIri} - Sex: ${this.latestConfig.sex} - Side: ${this.latestConfig.side}`;
    this.ga.event(event, 'organ', inputs);
  }
}
