import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  beforeEach(async () => {
    shallow = new Shallow(AppComponent)
      .import(HttpClientModule, HttpClientTestingModule)
      .mock(PrivacyPreferencesService, { launch: jest.fn() });
  });

  it(`should have as title 'cde-ui'`, async () => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });
});
