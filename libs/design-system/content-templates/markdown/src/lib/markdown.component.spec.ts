import { provideMarkdown } from 'ngx-markdown';
import { HraMarkdownComponent } from './markdown.component';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';

describe('MarkdownComponent', () => {
  it('should render', async () => {
    const component = await render(HraMarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        src: 'assets/content/changelog-page/CHANGELOG.md',
      },
    });
    expect(component).toBeTruthy();
  });
});
