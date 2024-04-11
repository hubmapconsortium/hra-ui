import { NgModule } from '@angular/core';
import { Shallow } from 'shallow-render';
import { IconRegistryService, SVG_ICON_DEFS, provideIcons } from './icon-registry.service';
import { MatIconRegistry } from '@angular/material/icon';
import { SvgIconDef } from './icon-registry.types';

@NgModule({
  providers: [provideIcons()],
})
class IconRegistryServiceTestModule {}

describe('IconsService', () => {
  const testUrl = 'https://example.com';
  const testName = 'my-icon';
  // const testNamespace = 'test';
  // const testLiteral = '<svg></svg>';
  let shallow: Shallow<IconRegistryService>;

  beforeEach(() => {
    shallow = new Shallow(IconRegistryService, IconRegistryServiceTestModule).dontMock(SVG_ICON_DEFS);
  });

  it('should be created', () => {
    expect(() => shallow.createService()).not.toThrow();
  });

  describe('registerAll()', () => {
    const testIconDefs: SvgIconDef[] = [
      {
        url: testUrl,
        name: testName,
      },
      {
        url: testUrl + '#2',
        name: testName + '2',
      },
    ];

    it('registers each icon', () => {
      shallow.provide({
        provide: SVG_ICON_DEFS,
        useValue: [testIconDefs],
      });

      const { instance, inject } = shallow.createService();
      const matRegistry = inject(MatIconRegistry);
      const spy = jest.spyOn(matRegistry, 'addSvgIcon');
      instance.registerAll();
      expect(spy).toHaveBeenCalledTimes(testIconDefs.length);
    });
  });

  describe('register(def)', () => {
    function testIconRegistration(method: keyof MatIconRegistry, def: SvgIconDef): void {
      const { instance, inject } = shallow.createService();
      const matRegistry = inject(MatIconRegistry);
      const spy = jest.spyOn(matRegistry, method);
      instance.register(def);
      expect(spy).toHaveBeenCalledTimes(1);
    }

    it('can register an icon using addSvgIcon', () => {
      testIconRegistration('addSvgIcon', {
        url: testUrl,
        name: testName,
      });
    });
  });
});
