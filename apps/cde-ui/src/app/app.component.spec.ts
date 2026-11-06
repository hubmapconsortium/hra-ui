import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { ThemePreference, ThemeService } from './services/theme-service/theme.service';

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

  it('picks a theme from the theme menu', async () => {
    const setPreference = jest.fn();
    const { find } = await shallow
      .mock(ThemeService, { preference: signal<ThemePreference>('dark'), setPreference })
      .render();

    expect(find('[hraFeature="theme"] mat-icon').nativeElement.textContent.trim()).toEqual('dark_mode');
    const options = find('[role="menuitemradio"]');
    expect(options.map((option) => option.nativeElement.getAttribute('aria-checked'))).toEqual([
      'false',
      'false',
      'true',
    ]);

    options[0].triggerEventHandler('click', {});
    expect(setPreference).toHaveBeenCalledWith('system');
  });
});
