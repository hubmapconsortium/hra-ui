import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { dispatch, dispatch$, dispatchAction$, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplEndpoints } from '@hra-ui/services';
import { ActiveFtuActions, TissueLibraryActions } from '@hra-ui/state';
import { mock } from 'jest-mock-extended';
import { ReplaySubject, of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';
import { NavigationLessRouter } from './routing/simple-router.service';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: FTU_DATA_IMPL_ENDPOINTS,
          useValue: mock<ReplaySubject<FtuDataImplEndpoints>>({ next: () => undefined }),
        },
      ],
    });

    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch).mockReturnValue(jest.fn());
    jest.mocked(select$).mockReturnValue(of());
    jest.mocked(dispatch$).mockReturnValue(jest.fn(() => of({})));

    shallow = new Shallow(AppComponent)
      .provideMock(Router, NavigationLessRouter)
      .provide([
        {
          provide: FTU_DATA_IMPL_ENDPOINTS,
          useClass: {
            datasets: '',
            illustrations: '',
            summaries: '',
          },
        },
      ])
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });

  describe('initFactory()', () => {
    const dispatcher = jest.fn().mockReturnValue(of(undefined));
    jest.mocked(dispatchAction$).mockReturnValue(dispatcher);

    afterEach(() => jest.clearAllMocks());

    it('should dispatch actions', () => {
      const init = initFactory();
      init();
      expect(dispatcher).toHaveBeenCalled();
    });
  });

  it('should dispatch actions after input', async () => {
    await shallow.render();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should load default iri when no iri present', async () => {
    jest.mocked(select$).mockReturnValue(of({ test1: { children: ['testUrl'] } }));
    await shallow.render();
    expect(dispatch).toHaveBeenCalledWith(LinkRegistryActions.Navigate);
  });

  it('should reset and reload datasets on change of datasetUrl', async () => {
    await shallow.render();
    expect(dispatch$).toHaveBeenCalledWith(ActiveFtuActions.Reset);
    expect(dispatch).toHaveBeenCalledWith(TissueLibraryActions.Load);
  });
});
