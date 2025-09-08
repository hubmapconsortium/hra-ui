import { Immutable } from '@angular-ru/cdk/typings';
import { Computed, DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { inject, Injectable, Injector } from '@angular/core';
import { State } from '@ngxs/store';
import { insertItem, patch } from '@ngxs/store/operators';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { filterNulls } from 'ccf-shared/rxjs-ext/operators';
import { saveAs } from 'file-saver';
import { isEqual } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';

import { Tag } from '../../models/anatomical-structure-tag';
import { MetaData } from '../../models/meta-data';
import { GlobalConfig } from '../../services/config/config';
import { AnatomicalStructureTagState } from '../anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState, ModelStateModel, RUI_ORGANS, XYZTriplet } from '../model/model.state';
import { PageState, PageStateModel } from '../page/page.state';
import { ReferenceDataState } from '../reference-data/reference-data.state';

/**
 * Registration state model
 */
export interface RegistrationStateModel {
  /** Whether to use the registration callback function */
  useRegistrationCallback: boolean;
  /** Whether or not to display user registration errors */
  displayErrors: boolean;
  /** Previous registrations */
  registrations: Record<string, unknown>[];
  /** Registration provided by user */
  initialRegistration?: SpatialEntityJsonLd;
}

/** Throttle rate for throttledJsonld$ (in ms) */
const JSONLD_THROTTLE_DURATION = 100;

/** Returns undefined if number is not a number, otherwise returns the number */
function undefIfNaN(value: number): number | undefined {
  return Number.isNaN(value) ? undefined : value;
}

/**
 * Data for model registrations
 */
@StateRepository()
@State<RegistrationStateModel>({
  name: 'registration',
  defaults: {
    useRegistrationCallback: false,
    displayErrors: false,
    registrations: [],
  },
})
@Injectable()
export class RegistrationState extends NgxsImmutableDataRepository<RegistrationStateModel> {
  /** Injector service */
  private readonly injector = inject(Injector);

  /** Global config state */
  private readonly globalConfig = inject<GlobalConfigState<GlobalConfig>>(GlobalConfigState);

  /** Registration display errors */
  readonly displayErrors$ = this.state$.pipe(map((x) => x?.displayErrors));

  /** Observable of registration metadata */
  @Computed()
  get metadata$(): Observable<MetaData> {
    return combineLatest([this.page.state$, this.model.state$, this.tags.tags$]).pipe(
      map(([page, model, tags]) => this.buildMetadata(page, model, tags)),
    );
  }

  /** Observable of registration data in jsonld format */
  @Computed()
  get jsonld$(): Observable<Record<string, unknown>> {
    return combineLatest([this.page.state$, this.model.state$, this.tags.tags$]).pipe(
      map(([page, model, tags]) => this.buildJsonLd(page, model, tags)),
    );
  }

  /** Observable that emits JSON-LD from page, model and tags at a throttled rate */
  @Computed()
  get throttledJsonld$(): Observable<Record<string, unknown>> {
    return combineLatest([this.page.state$, this.model.state$, this.tags.tags$]).pipe(
      throttleTime(JSONLD_THROTTLE_DURATION, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(isEqual),
      map(([page, model, tags]) => this.buildJsonLd(page, model, tags)),
    );
  }

  /** Observable for registration validity */
  @Computed()
  get valid$(): Observable<boolean> {
    return combineLatest([this.page.state$, this.model.state$]).pipe(map(() => this.isValid));
  }

  /**
   * Observable of previous registrations
   */
  @Computed()
  get previousRegistrations$(): Observable<Record<string, unknown>[]> {
    const { globalConfig, state$ } = this;
    const regs = state$.pipe(map((x) => x?.registrations));
    const fetched = globalConfig.getOption('fetchPreviousRegistrations').pipe(
      switchMap((fetch) => fetch?.() ?? [[]]),
      startWith([]),
    );

    return combineLatest([regs, fetched]).pipe(map(([local, external]) => [...local, ...external]));
  }

  /** Current uuid identifier used when registering */
  @Computed()
  private get currentIdentifier(): string {
    return uuidV4();
  }

  /** Time of last modification to registration data */
  @Computed()
  private get currentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /** Reference to the page state */
  private page!: PageState;

  /** Reference to the model state */
  private model!: ModelState;

  /** Reference to the AS Tag state */
  private tags!: AnatomicalStructureTagState;

  /** Reference to the reference data state */
  private refData!: ReferenceDataState;

  /**
   * Initializes this state service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.page = this.injector.get(PageState);
    this.model = this.injector.get(ModelState);
    this.tags = this.injector.get(AnatomicalStructureTagState);
    this.refData = this.injector.get(ReferenceDataState);

    this.refData.state$.subscribe(() => {
      this.globalConfig.config$
        .pipe(
          take(1),
          tap(({ useDownload, register, organOptions }) => {
            this.ctx.patchState({
              useRegistrationCallback: !!(!useDownload && register),
            });
            this.page.setOrcidId();
            this.model.setOrganDefaults();
            this.setOrganSelection(organOptions as string[]);
          }),
        )
        .subscribe();

      this.globalConfig
        .getOption('editRegistration')
        .pipe(
          filterNulls(),
          tap((reg) => {
            this.editRegistration(reg as SpatialEntityJsonLd);
          }),
        )
        .subscribe();
    });
  }

  /**
   * Resets position of model
   */
  resetPosition() {
    const reg = this.ctx.getState().initialRegistration;
    if (reg) {
      const place = this.refData.normalizePlacement(Array.isArray(reg.placement) ? reg.placement[0] : reg.placement);
      this.model.setPosition({
        x: Number(place.x_translation),
        y: Number(place.y_translation),
        z: Number(place.z_translation),
      });
    }
  }

  /**
   * Edits registration with new data
   * @param reg Spatial placement object
   * @returns Promise
   */
  async editRegistration(reg: SpatialEntityJsonLd): Promise<void> {
    this.ctx.patchState({ initialRegistration: reg });
    const place = this.refData.normalizePlacement(Array.isArray(reg.placement) ? reg.placement[0] : reg.placement);
    const data = this.refData.getOrganData(place.target);

    this.page.setUserName({
      firstName: reg.creator_first_name,
      middleName: reg.creator_middle_name,
      lastName: reg.creator_last_name,
    });

    this.page.setEmail(reg.creator_email);

    const orcid = this.page.uriToOrcid(reg.creator_orcid);
    this.page.setOrcidId(orcid);

    if (data) {
      this.model.setOrgan(data.organ);
      if (data.sex) {
        this.model.setSex(data.sex);
      }
      if (data.side) {
        this.model.setSide(data.side);
      }
    }

    this.model.setBlockSize({ x: reg.x_dimension, y: reg.y_dimension, z: reg.z_dimension });
    this.model.setRotation({
      x: Number(place.x_rotation),
      y: Number(place.y_rotation),
      z: Number(place.z_rotation),
    });
    this.model.setSlicesConfig({ thickness: reg.slice_thickness || NaN, numSlices: reg.slice_count || NaN });

    this.model.setPosition({
      x: Number(place.x_translation),
      y: Number(place.y_translation),
      z: Number(place.z_translation),
    });
    this.model.setPlacementDate(place.placement_date);
    const iris = new Set<string>(reg.ccf_annotations);
    this.tags.addTags(
      this.model.snapshot.anatomicalStructures
        .filter((item) => iris.has(item.id as string))
        .map((item) => ({ id: item.id, label: item.name, type: 'added' })),
    );

    this.page.registrationStarted();
  }

  /**
   * Sets whether to use the registration callback function or download.
   * @param use True to use the callback, false to download
   */
  @DataAction()
  setUseRegistrationCallback(use: boolean): void {
    this.ctx.patchState({ useRegistrationCallback: use });
  }

  /**
   * Sets whether or not we should display the user's registration errors
   * @param displayErrors the value to set it to
   */
  @DataAction()
  setDisplayErrors(displayErrors: boolean): void {
    this.ctx.patchState({ displayErrors });
  }

  /**
   * Adds an entry to the previous registrations
   * @param registration The new entry
   */
  @DataAction()
  addRegistration(registration: Record<string, unknown>): void {
    this.ctx.setState(
      patch({
        registrations: insertItem(registration as Immutable<Record<string, unknown>>),
      }),
    );
    this.page.registrationStarted();
  }

  /**
   * Sets organ options in the RUI
   * @param ids list of organ ids
   */
  @DataAction()
  setOrganSelection(ids: string[] = []): void {
    this.page.patchState({ organOptions: this.organListOptions(ids) });
  }

  /**
   * Determines whether the registration data is valid
   * @param page Page state
   * @param model Model state
   * @returns true if all data is valid
   */
  isDataValid(page: Immutable<PageStateModel>, model: Immutable<ModelStateModel>): boolean {
    const requiredValues = [
      page.user.firstName,
      page.user.lastName,
      page.orcidValid,
      model.organ.src,
      model.organ.name,
      model.organ.organ,
    ];

    return requiredValues.every((value) => !!value);
  }

  /**
   * Checks if registration data is valid
   */
  @Computed()
  get isValid(): boolean {
    return this.isDataValid(this.page.snapshot, this.model.snapshot);
  }

  /**
   * Registers or downloads json data.
   * @param [useCallback] Explicit override selecting the register/download action
   */
  register(useCallback?: boolean | undefined): void {
    this.page.registrationStarted();
    if (!this.isValid) {
      return;
    }

    const {
      globalConfig: {
        snapshot: { register: registrationCallback },
      },
      page,
      model,
      snapshot,
    } = this;
    const jsonObj = this.buildJsonLd(page.snapshot, model.snapshot, this.tags.latestTags);
    const json = JSON.stringify(jsonObj, undefined, 2);

    if (useCallback ?? (useCallback === undefined && snapshot.useRegistrationCallback)) {
      registrationCallback?.(json);
    } else {
      const data = new Blob([json], {
        type: 'application/json',
        endings: 'native',
      });

      saveAs(data, 'registration-data.json');
    }

    this.setDisplayErrors(false);
    this.page.clearHasChanges();
    this.addRegistration(jsonObj);
  }

  /**
   * Sets the state back to the initial registration
   */
  setToInitialRegistration() {
    const { page } = this;

    const initialWithChanges: SpatialEntityJsonLd | undefined = {
      ...(this.snapshot.initialRegistration as SpatialEntityJsonLd),
      creator_first_name: page.snapshot.user.firstName,
      creator_last_name: page.snapshot.user.lastName,
      creator_middle_name: page.snapshot.user.middleName,
      creator_orcid: page.snapshot.user.orcidId,
    };

    this.editRegistration(initialWithChanges);
  }

  /**
   * Builds a metadata array from the specified data.
   *
   * @param page The current page state data
   * @param model The current model state data
   * @param tags Anatomical structure tags for the metadata
   * @returns metadata An array of label-value objects
   */
  private buildMetadata(page: Immutable<PageStateModel>, model: Immutable<ModelStateModel>, tags: Tag[]): MetaData {
    const data: MetaData = [];

    if (!page.registrationCallbackSet) {
      data.push(
        { label: 'First Name', value: page.user.firstName },
        { label: 'Middle name (optional)', value: page.user.middleName },
        { label: 'Last Name', value: page.user.lastName },
        { label: 'Email', value: page.user.email },
        { label: 'ORCID (optional)', value: page.user.orcidId },
      );
    }

    data.push(
      { label: 'Sex', value: model.sex ? model.sex.charAt(0).toUpperCase() + model.sex.slice(1) : undefined },
      { label: 'Organ', value: model.organ.name },
      { label: 'Publication DOI (optional)', value: model.doi },
      { label: 'Consortium (optional)', value: model.consortium },
      { label: 'Position (mm)', value: this.xyzTripletToString(model.position) },
      { label: 'Size (mm)', value: this.xyzTripletToString(model.blockSize) },
      { label: 'Rotation (degrees)', value: this.xyzTripletToString(model.rotation) },
      { label: 'Tissue section thickness (µm)', value: model.slicesConfig.thickness.toString() },
      { label: 'Tissue #sections', value: model.slicesConfig.numSlices.toString() },
      { label: 'Anatomical Structure Tags', value: tags.map((t) => t.label).join(', ') },
      { label: 'Placement date', value: this.getDate(model.placementDate) },
      // { label: 'Alignment ID', value: this.currentIdentifier },
    );

    return data;
  }

  /**
   * Gets date from datestring (uses current date if not datestring valid)
   * @param datestring
   * @returns date
   */
  private getDate(datestring: string) {
    const match = datestring.match('d{4}-d{2}-d{2}');
    return match ? match[0] : this.currentDate;
  }

  /**
   * Converts the registration data into jsonld format.
   *
   * @param page The current page state data
   * @param model The current model state data
   * @param tags Anatomical structure tags
   * @returns A jsonld object
   */
  private buildJsonLd(
    page: Immutable<PageStateModel>,
    model: Immutable<ModelStateModel>,
    tags: Tag[],
  ): Record<string, unknown> {
    return {
      '@context': 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
      '@id': `http://purl.org/ccf/1.5/${this.currentIdentifier}`,
      '@type': 'SpatialEntity',
      label: model.label || undefined,
      creator: `${page.user.firstName} ${page.user.middleName ? page.user.middleName + ' ' : ''}${page.user.lastName}`,
      creator_first_name: page.user.firstName,
      creator_last_name: page.user.lastName,
      creator_middle_name: page.user.middleName,
      creator_email: page.user.email,
      creator_orcid: page.user.orcidId,
      creation_date: this.currentDate,
      ccf_annotations: tags.map((tag) => tag.id),
      slice_thickness: undefIfNaN(model.slicesConfig.thickness),
      slice_count: undefIfNaN(model.slicesConfig.numSlices),

      x_dimension: +Number(model.blockSize.x).toFixed(3),
      y_dimension: +Number(model.blockSize.y).toFixed(3),
      z_dimension: +Number(model.blockSize.z).toFixed(3),
      dimension_units: 'millimeter',
      publication_doi: model.doi,
      consortium: model.consortium,

      placement: {
        '@context': 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
        '@id': `http://purl.org/ccf/1.5/${this.currentIdentifier}_placement`,
        '@type': 'SpatialPlacement',
        target: model.organIri as string,
        placement_date: this.currentDate,

        x_scaling: 1,
        y_scaling: 1,
        z_scaling: 1,
        scaling_units: 'ratio',

        x_rotation: +Number(model.rotation.x).toFixed(3),
        y_rotation: +Number(model.rotation.y).toFixed(3),
        z_rotation: +Number(model.rotation.z).toFixed(3),
        rotation_order: 'XYZ',
        rotation_units: 'degree',

        x_translation: +Number(model.position.x).toFixed(3),
        y_translation: +Number(model.position.y).toFixed(3),
        z_translation: +Number(model.position.z).toFixed(3),
        translation_units: 'millimeter',
      },
    };
  }

  /**
   * Format a XYZTriplet as a string.
   *
   * @param xyz The triplet values
   * @returns The string representation
   */
  private xyzTripletToString(xyz: XYZTriplet): string {
    return `${Math.round(xyz.x)}, ${Math.round(xyz.y)}, ${Math.round(xyz.z)}`;
  }

  /**
   * Provides list of organ objects given an array of organ ids
   * @param organOptions array of organ ids
   * @returns list of organ info
   */
  private organListOptions(organOptions?: string[]): OrganInfo[] {
    if (organOptions && organOptions.length > 0) {
      return RUI_ORGANS.filter((organ) => {
        if (!organ.id) {
          return false;
        }
        return organOptions.includes(organ.id);
      });
    }
    return RUI_ORGANS;
  }
}
