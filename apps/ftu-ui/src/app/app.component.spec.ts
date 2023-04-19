import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

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
