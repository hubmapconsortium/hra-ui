import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';

import { ContentPageComponent } from './content-page.component';

describe('ContentPageComponent', () => {
  it('should create', async () => {
    const result = render(ContentPageComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        data: {
          $schema: '../../../app/schemas/content-page/content-page.schema.json',
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          content: [],
        },
      },
    });
    await expect(result).resolves.toBeTruthy();
  });
});
