import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { Organ } from './types/organs.schema';
import { ComponentDef } from './types/component-defs.schema';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { WebComponentsComponent, WINDOW } from './web-components.component';

describe('WebComponentsComponent', () => {
  let organ: Organ;
  let def: ComponentDef;
  let inlineDef: ComponentDef, overlayDef: ComponentDef, externalDef: ComponentDef;
  const setup = async (options: RenderComponentOptions<WebComponentsComponent> = {}) => {
    const renderComponent = await render(WebComponentsComponent, {
      ...options,
      providers: [
        provideDesignSystemCommon(),
        provideHttpClient(),
        provideHttpClientTesting(),
        ...(options.providers ?? []),
      ],
    });
    return { ...renderComponent, component: renderComponent.fixture.componentInstance };
  };

  it('should create', async () => {
    await expect(setup()).resolves.toBeTruthy();
  });

  beforeEach(async () => {
    organ = ORGANS[0];
    def = COMPONENT_DEFS[0];
    inlineDef = COMPONENT_DEFS.find((d) => d.embedAs === 'inline') as ComponentDef;
    overlayDef = COMPONENT_DEFS.find((def) => def.embedAs === 'overlay') as ComponentDef;
    externalDef = COMPONENT_DEFS.find((def) => def.embedAs === 'external') as ComponentDef;
  });

  it('should set sidenavData on useApp click with embedAs inline', async () => {
    const { component, fixture } = await setup();
    component.onUseApp(organ, inlineDef);
    fixture.detectChanges();

    expect(screen.getByTestId('sidenav-overlay')).toBeDefined();
  });

  it('should set appIframeData on useApp click with embedAs overlay', async () => {
    const { component, fixture } = await setup();
    component.onUseApp(organ, overlayDef);
    fixture.detectChanges();

    expect(screen.getByTestId('iframe-overlay')).toBeDefined();
    expect(component['appIframeData']).toBeDefined();
  });

  it('should open a new window on useApp click with embedAs external', async () => {
    const appData = organ.appData[externalDef.id];
    const url = appData ? appData['url'] : '';
    const openSpy = jest.fn();
    const { component } = await setup({
      providers: [{ provide: WINDOW, useValue: { open: openSpy } }],
    });

    component.onUseApp(organ, externalDef);
    expect(openSpy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should handle sidenavData correctly', async () => {
    const { component } = await setup();
    component.openSidenav(organ, def, 1);
    expect(component['sidenavData']()).toEqual({
      tagline: `${def.productTitle} ${def.webComponentName}`,
      code: component['getEmbedTemplate'](organ, def),
      showApp: def.embedAs === 'inline',
      tabIndex: 1,
      docLink: def.docLink,
    });
  });

  it('should handle overlay data correctly', async () => {
    const { component } = await setup();
    component.openOverlay(ORGANS[0], COMPONENT_DEFS[0]);
    expect(component['appIframeData']()).toEqual({
      tagline: `${COMPONENT_DEFS[0].productTitle} ${COMPONENT_DEFS[0].webComponentName}`,
      code: expect.any(Object),
    });
  });

  it('should close overlay correctly', async () => {
    const { component } = await setup();
    component['appIframeData'].set({ tagline: 'Test Code', code: expect.any(Object) });
    component.closeOverlay();
    expect(component['appIframeData']()).toBeUndefined();
  });

  it('should return the interpolated template', async () => {
    const organ: Organ = ORGANS[0];
    const def: ComponentDef = COMPONENT_DEFS[0];
    const template = EMBED_TEMPLATES[def.id];
    const { component } = await setup();
    const result = component['getEmbedTemplate'](organ, def);
    expect(result).not.toBe(template);
  });

  it('should return the correct template interpolation', async () => {
    const { component } = await setup();
    const template = '{{key1}} {{key2}}';
    const result = component['interpolateTemplate'](template, { key1: 'Test', key2: 'Code' });
    expect(result).toBe('Test Code');
  });
});
