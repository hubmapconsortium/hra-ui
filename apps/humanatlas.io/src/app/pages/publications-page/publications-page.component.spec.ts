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

  async function setup(inputs = { publications: mockPublicationsData }) {
    const result = await render(PublicationsPageComponent, { inputs, providers });
    return result;
  }

  it('should render', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should render publications by year', async () => {
    const { container } = await setup();

    const sections = container.querySelectorAll('hra-page-section');
    expect(sections.length).toBeGreaterThan(0);
  });
});
