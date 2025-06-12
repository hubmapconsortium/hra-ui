import { provideMarkdown } from 'ngx-markdown';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  it('should render', async () => {
    const component = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        src: 'assets/content/changelog-page/CHANGELOG.md',
      },
    });
    expect(component).toBeTruthy();
  });
});
