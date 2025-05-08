import { render } from '@testing-library/angular';
import { PageSectionComponent } from './page-section.component';
import { mock } from 'jest-mock-extended';
import { PageSectionService } from './services/page-section.service';

describe('PageSectionComponent', () => {
  it('should render', async () => {
    const promise = render(PageSectionComponent, { inputs: { tagline: 'AAA' } });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should register itself with the PageSectionService', async () => {
    const service = mock<PageSectionService>();
    const { fixture } = await render(PageSectionComponent, {
      inputs: { tagline: 'BBB' },
      providers: [
        {
          provide: PageSectionService,
          useValue: service,
        },
      ],
    });
    const instance = fixture.componentInstance;

    expect(service.addSection).toHaveBeenCalledWith(instance);
    fixture.componentRef.destroy();
    expect(service.removeSection).toHaveBeenCalledWith(instance);
  });
});
