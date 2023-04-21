import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { dispatchAction$ } from '@hra-ui/cdk/injectors';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { initFactory } from './app.init';
import { AppModule } from './app.module';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(RouterModule, RouterTestingModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
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
