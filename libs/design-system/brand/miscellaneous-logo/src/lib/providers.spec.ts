import { TestBed } from '@angular/core/testing';
import { IconConfigRegistryService, provideIcons } from '@hra-ui/design-system/icons';
import { provideMiscellaneousLogos } from './providers';

describe('provideMiscellaneousLogos', () => {
  it('should register a config resolver', () => {
    TestBed.configureTestingModule({
      providers: [provideIcons(), provideMiscellaneousLogos()],
    });

    const service = TestBed.inject(IconConfigRegistryService);
    const config = service.getIconConfig('test', 'misc');
    expect(config).toBeDefined();

    const config2 = service.getIconConfig('test', 'other');
    expect(config2).toBeUndefined();
  });
});
