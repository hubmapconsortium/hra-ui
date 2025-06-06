import { TestBed } from '@angular/core/testing';
import { IconConfigRegistryService, provideIcons } from '@hra-ui/design-system/icons';
import { provideCategoryLogos } from './providers';

describe('provideCategoryLogos', () => {
  it('should register a config resolver', () => {
    TestBed.configureTestingModule({
      providers: [provideIcons(), provideCategoryLogos()],
    });

    const service = TestBed.inject(IconConfigRegistryService);
    const config = service.getIconConfig('test', 'category');
    expect(config).toBeDefined();

    const config2 = service.getIconConfig('test', 'other');
    expect(config2).toBeUndefined();
  });
});
