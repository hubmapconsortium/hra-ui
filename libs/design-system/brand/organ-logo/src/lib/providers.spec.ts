import { TestBed } from '@angular/core/testing';
import { IconConfigRegistryService, provideIcons } from '@hra-ui/design-system/icons';
import { provideOrganLogos } from './providers';

describe('provideOrganLogos', () => {
  it('should register a config resolver', () => {
    TestBed.configureTestingModule({
      providers: [provideIcons(), provideOrganLogos()],
    });

    const service = TestBed.inject(IconConfigRegistryService);
    const config = service.getIconConfig('test', 'organ');
    expect(config).toBeDefined();

    const config2 = service.getIconConfig('test', 'other');
    expect(config2).toBeUndefined();
  });
});
