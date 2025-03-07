import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { WebComponentsComponent } from './web-components.component';
import { ComponentDef } from './types/component-defs.schema';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { Organ } from './types/organs.schema';

describe('WebComponentsComponent', () => {
  let component: WebComponentsComponent;
  let fixture: ComponentFixture<WebComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebComponentsComponent, OverlayModule, MatSelectModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WebComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onUseApp', () => {
    it('should call openSidenav for embedAs inline', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS.find((d) => d.embedAs === 'inline') as ComponentDef;
      const openSidenavSpy = jest.spyOn(component, 'openSidenav');
      component.onUseApp(organ, def);
      expect(openSidenavSpy).toHaveBeenCalledTimes(1);
      expect(openSidenavSpy).toHaveBeenCalledWith(organ, def, 1);
    });

    it('should call openOverlay for embedAs overlay', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS.find((d) => d.embedAs === 'overlay') as ComponentDef;
      const openOverlaySpy = jest.spyOn(component, 'openOverlay');

      component.onUseApp(organ, def);

      expect(openOverlaySpy).toHaveBeenCalledTimes(1);
      expect(openOverlaySpy).toHaveBeenCalledWith(organ, def);
    });

    it('should call openExternal for embedAs external', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS.find((d) => d.embedAs === 'external') as ComponentDef;
      const openExternalSpy = jest.spyOn(component, 'openExternal');

      component.onUseApp(organ, def);

      expect(openExternalSpy).toHaveBeenCalledTimes(1);
      expect(openExternalSpy).toHaveBeenCalledWith(organ, def);
    });
  });

  describe('openSidenav', () => {
    it('should set sidenavData correctly', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS[0];
      const tabIndex = 1;
      component.openSidenav(organ, def, tabIndex);
      expect(component['sidenavData']()).toEqual({
        tagline: `${def.productTitle} ${def.webComponentName}`,
        code: component['getEmbedTemplate'](organ, def),
        showApp: def.embedAs === 'inline',
        tabIndex: tabIndex,
        docLink: def.docLink,
      });
    });
  });

  describe('openOverlay', () => {
    it('should set appIframeData correctly', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS[0];
      component.openOverlay(organ, def);
      expect(component['appIframeData']()).toEqual({
        tagline: `${def.productTitle} ${def.webComponentName}`,
        code: expect.any(Object),
      });
    });
  });

  describe('openExternal', () => {
    it('should open a new window', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS.find((d) => d.embedAs === 'external') as ComponentDef;
      const appData = organ.appData[def.id];
      const url = appData ? appData['url'] : '';
      const windowOpenSpy = jest.spyOn(window, 'open');
      component.openExternal(organ, def);
      expect(windowOpenSpy).toHaveBeenCalledTimes(1);
      expect(windowOpenSpy).toHaveBeenCalledWith(url, '_blank');
    });
  });

  describe('closeOverlay', () => {
    it('should set appIframeData to undefined', () => {
      component['appIframeData'].set({ tagline: 'Test Code', code: expect.any(Object) });
      component.closeOverlay();
      expect(component['appIframeData']()).toBeUndefined();
    });
  });

  describe('getEmbedTemplate', () => {
    it('should return the interpolated template', () => {
      const organ: Organ = ORGANS[0];
      const def: ComponentDef = COMPONENT_DEFS[0];
      const template = EMBED_TEMPLATES[def.id];
      const result = component['getEmbedTemplate'](organ, def);
      expect(result).not.toBe(template);
    });
  });

  describe('interpolateTemplate', () => {
    it('should interpolate template correctly', () => {
      const template = '{{key1}} {{key2}}';
      const replacements = { key1: 'Test', key2: 'Code' };
      const result = component['interpolateTemplate'](template, replacements);
      expect(result).toBe('Test Code');
    });
  });
});
