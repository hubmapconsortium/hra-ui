import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Shallow } from 'shallow-render';

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(async () => {
    shallow = new Shallow(AppComponent, AppModule).replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('should create the app', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
