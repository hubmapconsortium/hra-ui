import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { dispatch, dispatchAction$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';
import { AppModule } from './app.module';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { mock } from 'jest-mock-extended';
import { LinkRegistryActions } from '@hra-ui/cdk/state';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  const dialog = mock<MatDialog>();
  const postRef = mock<MatDialogRef<void>>({ afterClosed: () => of(undefined) });
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(dispatch).mockReturnValue(jest.fn());
    jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
    dialog.open.mockReturnValue(postRef);

    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(RouterModule, RouterTestingModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .dontMock(MatDialogModule)
      .provideMock({ provide: MatDialog, useValue: dialog });
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });

  it('should show dailog box if sceen size is less than 480px', async () => {
    const { instance } = await shallow.render();
    global.innerWidth = 400;
    instance.detectSmallViewport();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should load links from YAML URL', async () => {
    const { instance } = await shallow.render();
    const url = 'mock-url';
    instance.linksYamlUrl = url;
    expect(dispatch).toHaveBeenCalled();
  });

  it('should load resources from YAML URL', async () => {
    const { instance } = await shallow.render();
    const url = 'mock-url';
    instance.resourcesYamlUrl = url;
    expect(dispatch).toHaveBeenCalled();
  });

  it('should navigate to organ based on provided IRI', async () => {
    jest.mocked(dispatch).mockReturnValue((TestId) => new LinkRegistryActions.Navigate(TestId));
    const { instance } = await shallow.render();
    instance.organIri = 'test-id';
    expect(dispatch).toHaveBeenCalledWith(LinkRegistryActions.Navigate);
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
