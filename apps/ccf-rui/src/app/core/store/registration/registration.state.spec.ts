import { Immutable } from '@angular-ru/cdk/typings';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { saveAs } from 'file-saver';
import { Observable, ReplaySubject, lastValueFrom, of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { ExtractionSet } from '../../models/extraction-set';
import { VisibilityItem } from '../../models/visibility-item';
import { GLOBAL_CONFIG } from '../../services/config/config';
import { ModelState, ModelStateModel } from '../model/model.state';
import { PageState, PageStateModel, Person } from '../page/page.state';
import { ReferenceDataState, ReferenceDataStateModel } from '../reference-data/reference-data.state';
import { AnatomicalStructureTagState } from './../anatomical-structure-tags/anatomical-structure-tags.state';
import { RegistrationState } from './registration.state';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const testVisibilityItems: VisibilityItem[] = [{ id: 0, name: 'test', visible: true }];
const testExtractionSets: ExtractionSet[] = [{ name: 'test', sites: [] }];
const testModel: Immutable<ModelStateModel> = {
  id: '0',
  label: 'test',
  organ: { name: 'test', src: 'test', organ: 'test' },
  organDimensions: { x: 0, y: 0, z: 0 },
  blockSize: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  position: { x: 0, y: 0, z: 0 },
  slicesConfig: { thickness: 0, numSlices: 0 },
  viewType: '3d',
  viewSide: 'anterior',
  showPrevious: false,
  extractionSites: testVisibilityItems,
  anatomicalStructures: testVisibilityItems,
  extractionSets: testExtractionSets,
  placementDate: '01-01-01',
};

const testPage: Immutable<PageStateModel> = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'foo@gmail.com',
  },
  registrationStarted: false,
  useCancelRegistrationCallback: false,
  registrationCallbackSet: false,
  skipConfirmation: true,
  hasChanges: false,
  orcidValid: true,
};

function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

function patchStore(key: string, data: unknown): void {
  const store = TestBed.inject(Store);
  const current = store.snapshot();
  store.reset({
    ...current,
    [key]: data,
  });
}

describe('RegistrationState', () => {
  const initialPageState: Partial<PageStateModel> = {
    user: {
      firstName: 'foo',
      lastName: 'bar',
      middleName: 'middle',
      orcidId: '1111-1111-1111-1111',
      email: 'foo@gmail.com',
    },
  };
  const initialModelState: Partial<ModelStateModel> = {
    id: 'a-b-c',
    blockSize: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    organ: {
      src: '',
      name: '',
      organ: '',
    },
    slicesConfig: {
      thickness: NaN,
      numSlices: NaN,
    },
    anatomicalStructures: [],
  };
  const initialReferenceDataState: Partial<ReferenceDataStateModel> = {
    anatomicalStructures: {},
    extractionSets: {},
    organIRILookup: {},
    organSpatialEntities: {},
    sceneNodeLookup: {},
    simpleSceneNodeLookup: {},
  };

  let pageStateSubject: ReplaySubject<Partial<PageStateModel>>;
  let modelStateSubject: ReplaySubject<Partial<ModelStateModel>>;
  let referenceDataStateSubject: ReplaySubject<Partial<ReferenceDataStateModel>>;
  let state: RegistrationState;

  beforeEach(() => {
    pageStateSubject = new ReplaySubject();
    pageStateSubject.next(initialPageState);

    modelStateSubject = new ReplaySubject();
    modelStateSubject.next(initialModelState);

    referenceDataStateSubject = new ReplaySubject();
    referenceDataStateSubject.next(initialReferenceDataState);

    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([RegistrationState, AnatomicalStructureTagState, ModelState, PageState, GlobalConfigState]),
      ],
      providers: [
        GlobalConfigState,
        {
          provide: AnatomicalStructureTagState,
          useValue: {
            tags$: of([]),
            latestTags: [],
            addTags: () => undefined,
          },
        },
        {
          provide: PageState,
          useValue: {
            state$: pageStateSubject,
            snapshot: initialPageState,
            clearHasChanges: () => undefined,
            patchState: () => undefined,
            setOrcidId: () => undefined,
            registrationStarted: () => undefined,
            uriToOrcid: jest.fn(),
            setUserName: jest.fn(),
            setEmail: jest.fn(),
          },
        },
        {
          provide: ModelState,
          useValue: {
            state$: modelStateSubject,
            snapshot: initialModelState,
            setOrganDefaults: () => undefined,
            setBlockSize: jest.fn(),
            setRotation: jest.fn(),
            setSlicesConfig: jest.fn(),
            setPosition: jest.fn(),
            setPlacementDate: jest.fn(),
          },
        },
        {
          provide: ReferenceDataState,
          useValue: {
            state$: referenceDataStateSubject,
            snapshot: initialReferenceDataState,
            getSourceDB: () => ({
              subscribe: () => undefined,
            }),
            normalizePlacement: jest.fn(() => ({})),
            getOrganData: jest.fn(),
          },
        },
        {
          provide: GLOBAL_CONFIG,
          useValue: {},
        },
      ],
    });

    TestBed.inject(Store).reset({
      registration: {
        useRegistrationCallback: false,
        displayErrors: false,
        registrations: [],
      },
      globalConfig: {},
    });

    state = TestBed.inject(RegistrationState);
    state.ngxsOnInit();
  });

  describe('.valid$', () => {
    it('creates valid$ boolean', async () => {
      const value = await nextValue(state.valid$);
      expect(typeof value).toEqual('boolean');
    });

    it('should consider isDataValid true if the user and organ are set', async () => {
      const result = state.isDataValid(testPage, testModel);
      expect(result).toBeTruthy();
    });

    it('should consider isDataValid false if the organ is not set', async () => {
      const invalidModel = { ...testModel, organ: {} as OrganInfo };
      const result = state.isDataValid(testPage, invalidModel);
      expect(result).toBeFalsy();
    });

    it('should consider isDataValid false if the user is not set', async () => {
      const invalidPage = { ...testPage, user: {} as Person };
      const result = state.isDataValid(invalidPage, testModel);
      expect(result).toBeFalsy();
    });
  });

  describe('.jsonld$', () => {
    it('creates jsonld objects', async () => {
      const value = await nextValue(state.jsonld$);
      expect(value).toBeInstanceOf(Object);
    });
  });

  describe('.previousRegistrations$', () => {
    const reg1 = { id: 1 };
    const reg2 = { id: 2 };

    beforeEach(() => {
      TestBed.inject(Store).reset({
        registration: {
          registrations: [reg1],
        },
        globalConfig: {},
      });
    });

    it('emits arrays of previous registration objects', async () => {
      TestBed.inject(GlobalConfigState).setConfig({ fetchPreviousRegistrations: undefined });
      const value = await nextValue(state.previousRegistrations$);
      expect(value).toEqual([reg1]);
    });

    it('combines the results from fetchPreviousRegistrations and local registrations', async () => {
      const spy = jest.fn().mockReturnValue([[reg2]]);
      TestBed.inject(GlobalConfigState).setConfig({ fetchPreviousRegistrations: spy });

      const value = await nextValue(state.previousRegistrations$.pipe(skip(1)));
      expect(value).toEqual(expect.arrayContaining([reg1, reg2]));
    });
  });

  describe('setUseRegistrationCallback', () => {
    it('updates use registration callback', async () => {
      state.setUseRegistrationCallback(true);
      const value = await nextValue(state.state$);
      expect(value.useRegistrationCallback).toBeTruthy();
    });
  });

  describe('setDisplayErrors', () => {
    it('updates displayErrors variable', async () => {
      state.setDisplayErrors(true);
      const value = await nextValue(state.state$);
      expect(value.displayErrors).toBeTruthy();
    });
  });

  describe('register(useCallback)', () => {
    let callback: jest.Mock<void, [string]>;

    beforeEach(() => {
      callback = jest.fn();
      patchStore('globalConfig', { register: callback });
      jest.spyOn(state, 'isDataValid').mockReturnValue(true);
    });

    it('does nothing if isDataValid() is false', () => {
      (state.isDataValid as jest.Mock).mockReturnValue(false);
      state.register();
      expect(callback).not.toHaveBeenCalled();
      expect(saveAs).not.toHaveBeenCalled();
    });

    it('uses the callback when useCallback argument is true', () => {
      state.register(true);
      expect(callback).toHaveBeenCalled();
    });

    it('uses download when useCallback argument is false', () => {
      state.register(false);
      expect(saveAs).toHaveBeenCalled();
    });

    it('uses the callback if the state useRegistrationCallback is true and no argument is provided', () => {
      patchStore('registration', { useRegistrationCallback: true });
      state.register();
      expect(callback).toHaveBeenCalled();
    });

    it('uses download when the state useRegistrationCallback is false and no argument is provided', async () => {
      patchStore('registration', { useRegistrationCallback: false });
      state.register();
      expect(saveAs).toHaveBeenCalled();
    });

    it('does nothing if there is no callback and the registration method is selected', () => {
      patchStore('globalConfig', { register: undefined });
      state.register(true);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('setToInitialRegistration', () => {
    it('reverts registration to initial state', async () => {
      const spy = jest.spyOn(state, 'editRegistration');
      state.setToInitialRegistration();
      expect(spy).toHaveBeenCalled();
    });
  });
});
