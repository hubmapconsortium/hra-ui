import { TestBed } from '@angular/core/testing';
import { IconConfigRegistryService, provideIcons } from '@hra-ui/design-system/icons';
import { provideBrand } from './providers';

describe('provideBrand', () => {
  it('should register config resolvers for all brand namespaces', () => {
    TestBed.configureTestingModule({
      providers: [provideIcons(), provideBrand()],
    });

    const service = TestBed.inject(IconConfigRegistryService);

    const miscConfig = service.getIconConfig('test', 'misc');
    expect(miscConfig).toBeDefined();

    const organConfig = service.getIconConfig('test', 'organ');
    expect(organConfig).toBeDefined();

    const productConfig = service.getIconConfig('test', 'product');
    expect(productConfig).toBeDefined();

    const otherConfig = service.getIconConfig('test', 'other');
    expect(otherConfig).toBeUndefined();
  });
});
