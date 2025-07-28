import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  output,
  untracked,
  viewChild,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AggregateCount, FilterSexEnum, SpatialEntity, SpatialSceneNode } from '@hra-api/ng-client';
import { monitorHeight } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconComponent } from '@hra-ui/design-system/icons';
import { ProgressSpinnerComponent } from '@hra-ui/design-system/indicators/progress-spinner';
import { TableColumn, TableComponent } from '@hra-ui/design-system/table';
import { NodeClickEvent } from 'ccf-body-ui';
import { GlobalConfigState, OrganInfo, sexFromString } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { of, tap } from 'rxjs';
import { Side } from './app-web-component.component';
import { OrganComponent } from './components/organ/organ.component';
import { OrganLookupService } from './services/organ-lookup/organ-lookup.service';

/** Body ui config */
interface GlobalConfig {
  /** Organ iri */
  organIri?: string;
  /** Organ side */
  side?: Side;
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
const EMPTY_SCENE = [{ color: [0, 0, 0, 0], opacity: 0.001 }] as SpatialSceneNode[];

/**
 * Gets the sex of the organ.
 * @param organ Organ Spatial Entity
 * @returns Sex of the organ
 */
function getOrganSex(organ: SpatialEntity | undefined): FilterSexEnum | undefined {
  return organ?.sex !== undefined ? sexFromString(organ.sex) : undefined;
}

/**
 * Normalizes stats labels for the table.
 * @param stats Stats Data
 * @param label Label
 * @returns Normalized stats labels
 */
function normalizeStatLabels(stats: AggregateCount[], label?: string): AggregateCount[] {
  if (label === undefined) {
    return stats;
  }

  return stats.map((stat) => ({ ...stat, label: stat.label === 'Donors' ? label : stat.label }));
}

/** Root component */
@Component({
  selector: 'ccf-root',
  imports: [
    OrganComponent,
    IconComponent,
    MatIcon,
    MatIconButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    ButtonsModule,
    TableComponent,
    MatMenuModule,
    MatDivider,
    CommonModule,
    ProgressSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Emits when the user switches the model sex */
  readonly sexChange = output<'Male' | 'Female'>();

  /** Emits when the user switches organ side */
  readonly sideChange = output<'Left' | 'Right'>();

  /** Emits when the user clicks a node */
  readonly nodeClicked = output<NodeClickEvent>();

  /** Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** Global Configuration State */
  private readonly configState = inject<GlobalConfigState<GlobalConfig>>(GlobalConfigState);

  /** Organ Lookup Service */
  private readonly lookupService = inject(OrganLookupService);

  /** Organ IRI */
  private readonly organIri = this.configState.getOptionSignal('organIri');

  /** Organ Sex */
  protected readonly sex = this.configState.getOptionSignal('sex');

  /** Organ Side */
  protected readonly side = this.configState.getOptionSignal('side');

  /** Donor Label */
  private readonly donorLabel = this.configState.getOptionSignal('donorLabel');

  /** Providers */
  private readonly providers = this.configState.getOptionSignal('highlightProviders');

  /** Organ Filters */
  protected readonly filter = computed(() => ({ tmc: this.providers() ?? [] }));

  /** Organ Info */
  protected readonly organInfo = rxResource({
    request: () => ({
      iri: this.organIri(),
      sex: this.sex(),
      side: this.side(),
    }),
    loader: (params) => {
      const { iri, sex, side } = params.request;
      if (iri === undefined) {
        return of(undefined);
      }

      const info$ = this.lookupService.getOrganInfo(iri, side?.toLowerCase() as OrganInfo['side'], sex);
      return info$.pipe(tap((info) => this.logOrganLookup(info, iri, sex, side)));
    },
  });

  /** Organ */
  protected readonly organ = rxResource({
    request: () => ({
      info: this.organInfo.value(),
      sex: untracked(this.sex),
    }),
    loader: (params) => {
      const { info, sex } = params.request;
      if (info === undefined) {
        return of(undefined);
      }

      return this.lookupService.getOrgan(info, info.hasSex ? sex : undefined);
    },
  });

  /** Organ Logo */
  protected readonly organLogo = computed(() => {
    const info = this.organInfo.value();
    return info && `organ:${info.src.split(':')[1]}`;
  });

  /** Organ Scene */
  protected readonly scene = rxResource({
    request: () => ({
      organ: this.organ.value(),
      info: untracked(this.organInfo.value),
    }),
    loader: (params) => {
      const { organ, info } = params.request;
      if (organ === undefined || info === undefined) {
        return of(EMPTY_SCENE);
      }

      return this.lookupService.getOrganScene(info, getOrganSex(organ));
    },
    defaultValue: EMPTY_SCENE,
  });

  /** Blocks */
  protected readonly blocks = rxResource({
    request: () => ({
      organ: this.organ.value(),
      info: untracked(this.organInfo.value),
    }),
    loader: (params) => {
      const { organ, info } = params.request;
      if (organ === undefined || info === undefined) {
        return of([]);
      }

      return this.lookupService.getBlocks(info, getOrganSex(organ));
    },
    defaultValue: [],
  });

  /** Raw Statistics */
  private readonly rawStats = rxResource({
    request: () => ({
      organ: this.organ.value(),
      info: untracked(this.organInfo.value),
    }),
    loader: (params) => {
      const { organ, info } = params.request;
      if (organ === undefined || info === undefined) {
        return of([]);
      }

      return this.lookupService.getOrganStats(info, getOrganSex(organ));
    },
    defaultValue: [],
  });

  /** Statistics */
  protected readonly stats = computed(() => {
    const rawStats = this.rawStats.value();
    const label = this.donorLabel();
    return normalizeStatLabels(rawStats, label);
  });

  /** Organ Stat Label */
  protected readonly statsLabel = computed(() => {
    return this.makeStatsLabel(this.organIri(), this.organInfo.value(), this.organ.value()?.sex);
  });

  /** Determines whether the data is still loading. */
  protected readonly isLoading = computed(() => {
    return this.organInfo.isLoading() || this.organ.isLoading() || this.scene.isLoading() || this.blocks.isLoading();
  });

  /** Table column definitions for the stats table */
  tableColumns: TableColumn[] = [
    { column: 'count', label: '#total', type: 'numeric' },
    { column: 'label', label: 'Metadata type', type: 'text' },
  ];

  /** Reference to the information view container */
  private readonly contentContainer = viewChild.required<ElementRef<HTMLElement>>('contentContainer');

  /** Height monitor for content container height used to update the height of Body UI container */
  protected readonly contentHeightMonitor = monitorHeight(this.contentContainer);

  /**
   * Apply latest changes to the global configuration state.
   * @param key Key to update
   * @param value New value
   */
  updateInput(key: string, value: unknown): void {
    this.configState.patchConfig({ [key]: value });
  }

  /**
   * Create a new label for the stats data.
   * @param info Organ info
   * @param sex Model sex
   * @returns A label
   */
  private makeStatsLabel(iri: string | undefined, info: OrganInfo | undefined, sex?: string): string {
    let parts: (string | undefined)[] = [`Unknown IRI: ${iri}`];
    if (info) {
      // Use title cased side for a cleaner display
      const side = info.side ? info.side.charAt(0).toUpperCase() + info.side.slice(1) : undefined;
      parts = [sex, info.organ, side];
    }
    return parts.filter((seg) => !!seg).join(', ');
  }

  /**
   * Creates an analytics event for the organ info.
   * @param info Organ information
   */
  private logOrganLookup(info: OrganInfo | undefined, iri: string, sex?: string, side?: string): void {
    const event = info ? 'organ_lookup_success' : 'organ_lookup_failure';
    const inputs = `Iri: ${iri} - Sex: ${sex} - Side: ${side}`;
    this.ga.event(event, 'organ', inputs);
  }
}
