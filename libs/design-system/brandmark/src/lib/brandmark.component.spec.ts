import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';

import { BrandmarkComponent } from './brandmark.component';

describe('BrandmarkComponent', () => {
  it('should render a normal logo', async () => {
    const { fixture } = await render(BrandmarkComponent, {
      providers: [provideHttpClient()],
    });
    expect(fixture.componentInstance.svgPath()).toEqual('assets/logo/hra_brandmark.svg');
  });

  it('should render a contrast logo', async () => {
    const { fixture } = await render(BrandmarkComponent, {
      componentInputs: {
        contrast: true,
      },
      providers: [provideHttpClient()],
    });
    expect(fixture.componentInstance.svgPath()).toEqual('assets/logo/hra_brandmark_contrast.svg');
  });
});
