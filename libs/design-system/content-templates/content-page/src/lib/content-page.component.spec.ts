import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
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

  describe('breadcrumbs', () => {
    const data = {
      $schema: '../../../app/schemas/content-page/content-page.schema.json',
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      content: [],
    };

    it('should show no breadcrumbs by default, or when the router sets them to undefined', async () => {
      const { container, fixture } = await render(ContentPageComponent, {
        providers: [provideMarkdown(), provideHttpClient()],
        inputs: { data },
      });
      expect(container.querySelector('hra-breadcrumbs')).toBeNull();

      fixture.componentRef.setInput('breadcrumbs', undefined);
      fixture.detectChanges();
      expect(container.querySelector('hra-breadcrumbs')).toBeNull();
    });

    it('should show breadcrumbs above the page title', async () => {
      const { container } = await render(ContentPageComponent, {
        providers: [provideMarkdown(), provideHttpClient()],
        inputs: { data, breadcrumbs: [{ name: 'Home', route: 'https://example.com' }, { name: 'Test Title' }] },
      });

      const crumbs = container.querySelector('hra-breadcrumbs');
      const title = screen.getByRole('heading', { level: 1 });
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(crumbs?.compareDocumentPosition(title)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });
});
