import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { Theme, ThemeService } from './services/theme-service/theme.service';

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  beforeEach(async () => {
    shallow = new Shallow(AppComponent)
      .import(HttpClientModule, HttpClientTestingModule)
      .dontMock(PlainTooltipDirective)
      .mock(PrivacyPreferencesService, { launch: jest.fn() });
  });

  it(`should have as title 'cde-ui'`, async () => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });

  it('switches themes with the theme toggle', async () => {
    const toggle = jest.fn();
    const { find } = await shallow.mock(ThemeService, { theme: signal<Theme>('light'), toggle }).render();
    const button = find('[hraFeature="theme-toggle"]');

    expect(button.nativeElement.getAttribute('aria-label')).toEqual('Switch to dark theme');
    button.triggerEventHandler('click', {});
    expect(toggle).toHaveBeenCalled();
  });
});
