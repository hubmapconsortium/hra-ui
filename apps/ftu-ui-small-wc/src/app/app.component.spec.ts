import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { dispatch, dispatchAction$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';
import { NavigationLessRouter } from './routing/simple-router.service';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch).mockReturnValue(jest.fn());

    shallow = new Shallow(AppComponent)
      .provideMock(Router, NavigationLessRouter)
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
    await shallow.render({ bind: { linksYamlUrl: '', resourcesYamlUrl: '', organIri: '' } });
    expect(dispatch).toHaveBeenCalled();
  });
});
