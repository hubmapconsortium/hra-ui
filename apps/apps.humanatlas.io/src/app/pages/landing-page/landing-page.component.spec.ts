import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonToggleGroupHarness } from '@angular/material/button-toggle/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideAssetHref } from '@hra-ui/common/url';
import { LandingPageComponent, WINDOW } from './landing-page.component';
import apps from '../../../../public/assets/apps.json';

describe('LandingPageComponent', () => {
  function setup(options: RenderComponentOptions<LandingPageComponent> = {}) {
    return render(LandingPageComponent, {
      ...options,
      imports: [MatIconTestingModule, ...(options.imports ?? [])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAssetHref('http://localhost/'),
        ...(options.providers ?? []),
      ],
    });
  }

  function flushAppsJson() {
    const controller = TestBed.inject(HttpTestingController);
    controller.expectOne('http://localhost/assets/apps.json').flush(apps);
  }

  it('should create the component', async () => {
    await expect(setup()).resolves.toBeTruthy();
    flushAppsJson();
  });

  it('should render mat-button-toggle buttons for each tab', async () => {
    const { fixture } = await setup();
    flushAppsJson();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const toggleGroup = await loader.getHarness(MatButtonToggleGroupHarness);
    const toggles = await toggleGroup.getToggles();
    const labels = await Promise.all(toggles.map((tab) => tab.getText()));

    expect(labels).toEqual(['Researcher apps', 'Developer apps']);
  });

  it('should switch to Developer Apps tab and show its content', async () => {
    const { fixture } = await setup();
    flushAppsJson();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const toggleGroup = await loader.getHarness(MatButtonToggleGroupHarness);
    const toggles = await toggleGroup.getToggles();
    await toggles[1].check();
    fixture.detectChanges();
    expect(await screen.findByText('Developer applications')).toBeTruthy();
  });

  it('should open app URL in new tab', async () => {
    const appUrl = 'https://apps.humanatlas.io/cde/';
    const openSpy = jest.fn();
    const { fixture } = await setup({
      providers: [{ provide: WINDOW, useValue: { open: openSpy } }],
    });
    fixture.componentInstance.onOpenAppUrl(appUrl);
    expect(openSpy).toHaveBeenCalledWith(appUrl, '_blank');
  });

  it('should open documentation link in new tab', async () => {
    const docLink = 'https://humanatlas.io/user-story/5';
    const openSpy = jest.fn();
    const { fixture } = await setup({
      providers: [{ provide: WINDOW, useValue: { open: openSpy } }],
    });
    fixture.componentInstance.onOpenDocumentationLink(docLink);
    expect(openSpy).toHaveBeenCalledWith(docLink, '_blank');
  });
});
