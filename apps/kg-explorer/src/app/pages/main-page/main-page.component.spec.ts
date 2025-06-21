import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { render, RenderComponentOptions } from '@testing-library/angular';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  function setup(options: RenderComponentOptions<MainPageComponent> = {}) {
    return render(MainPageComponent, {
      ...options,
      providers: [
        ...provideDesignSystemCommon(),
        provideHttpClient(),
        provideHttpClientTesting(),
        ...(options.providers ?? []),
      ],
    });
  }

  it('should create the component', async () => {
    await expect(setup()).resolves.toBeTruthy();
  });
});
