import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { PublicationsPageComponent } from './publications-page.component';
import { PublicationsPageData } from '../../schemas/publications-page/publications-page.schema';

describe('PublicationsPageComponent', () => {
  const mockPublicationsData: PublicationsPageData = {
    '2024': ['<a href="/docs/publications/test1">Test Publication 2024</a>'],
    '2023': ['<a href="#">Author</a> - Title'],
  };

  const providers = [provideHttpClient(), provideHttpClientTesting(), provideMarkdown()];

  it('should render', async () => {
    const { container } = await render(PublicationsPageComponent, {
      inputs: { publications: mockPublicationsData },
      providers,
    });

    expect(container).toBeTruthy();
  });

  it('should normalize publications and filter empty years', async () => {
    const { fixture } = await render(PublicationsPageComponent, {
      inputs: { publications: mockPublicationsData },
      providers,
    });

    const component = fixture.componentInstance;
    const items = component['items']();

    expect(items.length).toBe(2);
    expect(items[0].year).toBe(2024);
    expect(items[1].year).toBe(2023);
  });
});
