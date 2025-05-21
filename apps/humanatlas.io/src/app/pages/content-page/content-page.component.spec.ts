import { render } from '@testing-library/angular';
import { ContentPageComponent } from './content-page.component';
import { provideMarkdown } from 'ngx-markdown';

describe('ContentPageComponent', () => {
  it('should create', async () => {
    const result = render(ContentPageComponent, {
      providers: [provideMarkdown()],
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
