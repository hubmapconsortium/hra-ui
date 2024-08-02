import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { dispatch, dispatch$, dispatchAction$, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplEndpoints, IllustrationMappingItem } from '@hra-ui/services';
import { ActiveFtuActions, IllustratorActions, IllustratorSelectors } from '@hra-ui/state';
import { ActionContext, ActionStatus, Actions } from '@ngxs/store';
import { ReplaySubject, firstValueFrom, from, of, take, toArray } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent, ftuPage } from './app.component';
import { initFactory } from './app.init';
import { NavigationLessRouter } from './routing/simple-router.service';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  let endpoints: ReplaySubject<FtuDataImplEndpoints>;
  let actions: ReplaySubject<ActionContext>;
  const dispatchSpy = jest.fn();

  beforeEach(() => {
    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch).mockReturnValue(dispatchSpy);
    jest.mocked(select$).mockReturnValue(of());
    jest.mocked(dispatch$).mockReturnValue(jest.fn(() => of({})));

    endpoints = new ReplaySubject(1);
    actions = new ReplaySubject(1);

    shallow = new Shallow(AppComponent).replaceModule(BrowserAnimationsModule, NoopAnimationsModule).provideMock(
      Router,
      NavigationLessRouter,
      {
        provide: FTU_DATA_IMPL_ENDPOINTS,
        useValue: endpoints,
      },
      {
        provide: Actions,
        useValue: actions,
      },
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should create component', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('.selectedIllustration', () => {
    const iri = 'foo/bar';
    const illustration = { '@id': iri };
    const params = {
      queryParams: { id: iri },
    };

    it('accepts an iri string', async () => {
      await shallow.render({ bind: { selectedIllustration: iri } });
      expect(dispatchSpy).toHaveBeenCalledWith(ftuPage, params);
    });

    it('accepts an illustration object', async () => {
      await shallow.render({ bind: { selectedIllustration: illustration } });
      expect(dispatchSpy).toHaveBeenCalledWith(ftuPage, params);
    });

    it('automatically selects a tissue if not provided', async () => {
      jest.mocked(select$).mockReturnValue(
        of({
          organ: { children: ['tissue'] },
        }),
      );
      await shallow.render();

      expect(dispatchSpy).toHaveBeenCalledWith(ftuPage, {
        queryParams: { id: 'tissue' },
      });
    });
  });

  describe('.summaries', () => {
    it('resets the state when changed', async () => {
      const spy = jest.fn();
      jest.mocked(dispatch).mockImplementation((type) => (type === ActiveFtuActions.Clear ? spy : dispatchSpy));

      const { bindings, fixture } = await shallow.render({ bind: { summaries: '' } });
      spy.mockClear();
      bindings.summaries = 'url/to/summaries';
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('.baseHref', () => {
    it('updates the base href for the app', async () => {
      await shallow.render({ bind: { baseHref: 'test' } });
      expect(dispatchSpy).toHaveBeenCalledWith('test');
    });
  });

  describe('.cellHover', () => {
    it('emits node hover events', async () => {
      const node = {
        source: { id: 'abc' },
      };
      const events = from([node, undefined]);
      jest.mocked(select$).mockImplementation((fn) => (fn === IllustratorSelectors.selectedOnHovered ? events : of()));

      const { instance } = await shallow.render();
      const output = await firstValueFrom(instance.cellHover.pipe(take(2), toArray()));
      expect(output).toEqual([node.source, undefined]);
    });
  });

  describe('.cellClick', () => {
    it('emits node click events', async () => {
      const node = {
        source: { id: 'abc' },
      } as unknown as IllustrationMappingItem;
      const context: ActionContext = {
        status: ActionStatus.Dispatched,
        action: new IllustratorActions.SetClicked(node),
      };

      const { instance } = await shallow.render();
      const output = firstValueFrom(instance.cellClick.pipe(take(1)));
      actions.next(context);
      expect(await output).toEqual(node.source);
    });
  });
});

describe('initFactory()', () => {
  afterEach(() => jest.clearAllMocks());

  it('should dispatch actions', () => {
    const dispatcher = jest.fn().mockReturnValue(of(undefined));
    jest.mocked(dispatchAction$).mockReturnValue(dispatcher);

    const init = initFactory();
    init();
    expect(dispatcher).toHaveBeenCalled();
  });
});
