import { TestBed } from '@angular/core/testing';
import { IconConfigRegistryService, provideIcons } from '@hra-ui/design-system/icons';
import { provideProductLogos } from './providers';

describe('provideProductLogos', () => {
  it('should register a config resolver', () => {
    TestBed.configureTestingModule({
      providers: [provideIcons(), provideProductLogos()],
    });

    const service = TestBed.inject(IconConfigRegistryService);
    const config = service.getIconConfig('test', 'product');
    expect(config).toBeDefined();

    const config2 = service.getIconConfig('test', 'other');
    expect(config2).toBeUndefined();
  });
});
