import { TestBed } from '@angular/core/testing';
import { IconConfig, IconConfigRegistryService } from './icon-config.service';

describe('IconConfigRegistryService', () => {
  const namespace = 'test';
  const name = 'icon';
  const icon = `${namespace}:${name}`;
  const config: IconConfig = { color: 'blue' };

  describe('getIconConfig', () => {
    it('should return previously set configuration', () => {
      const service = TestBed.inject(IconConfigRegistryService);
      service.setIconConfig(icon, undefined, config);
      expect(service.getIconConfig(icon)).toEqual(config);
    });

    it('queries the resolvers for configuration if none is set', () => {
      const service = TestBed.inject(IconConfigRegistryService);
      const resolver1 = jest.fn();
      const resolver2 = jest.fn(() => config);
      const resolver3 = jest.fn();
      service.addIconConfigResolver(resolver1).addIconConfigResolver(resolver2).addIconConfigResolver(resolver3);

      expect(service.getIconConfig(icon)).toEqual(config);
      expect(resolver1).toHaveBeenCalledTimes(1);
      expect(resolver2).toHaveBeenCalledWith(name, namespace);
      expect(resolver3).not.toHaveBeenCalled();
    });

    it('throws if called with an invalid icon name', () => {
      const service = TestBed.inject(IconConfigRegistryService);
      const invalid = 'too:many:colons';
      expect(() => service.getIconConfig(invalid)).toThrow();
    });
  });
});
