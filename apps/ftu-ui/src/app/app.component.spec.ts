import { ENVIRONMENT_INITIALIZER } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  dispatch,
  dispatch$,
  dispatchAction$,
  select$,
  selectQuerySnapshot,
  selectSnapshot,
} from '@hra-ui/cdk/injectors';
import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { FTU_DATA_IMPL_ENDPOINTS } from '@hra-ui/services';
import { ActiveFtuActions, IllustratorSelectors, LinkIds, TissueLibraryActions } from '@hra-ui/state';
import { mock } from 'jest-mock-extended';
import { firstValueFrom, from, of, take, toArray } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';
import { AppModule } from './app.module';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  const dialog = mock<MatDialog>();
  const postRef = mock<MatDialogRef<void>>({ afterClosed: () => of(undefined) });
  const dispatchSpy = jest.fn();

  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch).mockReturnValue(dispatchSpy);
    jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch$).mockReturnValue(jest.fn(() => of({})));
    jest.mocked(select$).mockReturnValue(of({}));
    dialog.open.mockReturnValue(postRef);

    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(RouterModule, RouterTestingModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .dontMock(MatDialogModule)
      .dontMock(FTU_DATA_IMPL_ENDPOINTS)
      .provideMock({ provide: MatDialog, useValue: dialog })
      .dontMock(ENVIRONMENT_INITIALIZER);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create component', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('.selectedIllustration', () => {
    const iri = 'foo/bar';
    const illustration = { '@id': iri };

    it('accepts an iri string', async () => {
      await shallow.render({ bind: { selectedIllustration: iri } });
      expect(dispatchSpy).toHaveBeenCalledWith(LinkIds.ExploreFTU, expect.anything());
    });

    it('accepts an illustration object', async () => {
      await shallow.render({ bind: { selectedIllustration: illustration } });
      expect(dispatchSpy).toHaveBeenCalledWith(LinkIds.ExploreFTU, expect.anything());
    });

    it('automatically selects a tissue if not provided', async () => {
      jest.mocked(select$).mockReturnValue(
        of({
          organ: { children: ['tissue'] },
        }),
      );
      await shallow.render();

      expect(dispatchSpy).toHaveBeenCalledWith(LinkIds.ExploreFTU, expect.anything());
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
      };
      const events = from([undefined, node]);
      jest.mocked(select$).mockImplementation((fn) => (fn === IllustratorSelectors.selectedOnClicked ? events : of()));

      const { instance } = await shallow.render();
      const output = await firstValueFrom(instance.cellClick.pipe(take(1)));
      expect(output).toEqual(node.source);
    });
  });

  it('should show dailog box if sceen size is less than 480px', async () => {
    const { instance } = await shallow.render();
    global.innerWidth = 400;
    instance.onWindowResize();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should load links from YAML URL', async () => {
    const { instance } = await shallow.render();
    const url = 'mock-url';
    instance.appLinks = url;
    expect(dispatch).toHaveBeenCalled();
  });

  it('should load resources from YAML URL', async () => {
    const { instance } = await shallow.render();
    const url = 'mock-url';
    instance.appResources = url;
    expect(dispatch).toHaveBeenCalled();
  });

  it('should navigate to organ based on provided IRI', async () => {
    jest.mocked(dispatch).mockReturnValue((TestId) => new LinkRegistryActions.Navigate(TestId));
    const { instance } = await shallow.render();
    instance.selectedIllustration = 'test-id';
    expect(dispatch).toHaveBeenCalledWith(LinkRegistryActions.Navigate);
  });

  it('should load default iri when no iri present', async () => {
    jest.mocked(select$).mockReturnValue(of({ test1: { children: ['testUrl'] } }));
    await shallow.render({ bind: { appLinks: '', appResources: '', selectedIllustration: '' } });
    expect(dispatch).toHaveBeenCalledWith(LinkRegistryActions.Navigate);
  });

  it('should reset and reload datasets on change of datasetUrl', async () => {
    const { instance } = await shallow.render({
      bind: {
        appLinks: '',
        appResources: '',
        selectedIllustration: '',
        datasets: '',
        illustrations: '',
        summaries: '',
      },
    });
    instance.datasets = 'tempUrl';
    expect(dispatch$).toHaveBeenCalledWith(LinkRegistryActions.LoadFromYaml);
    expect(dispatch).toHaveBeenCalledWith(TissueLibraryActions.Load);
  });
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
