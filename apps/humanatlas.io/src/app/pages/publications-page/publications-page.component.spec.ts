import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
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
    await setup();

    const bannerText = screen.getByText('Publications');
    expect(bannerText).toBeInTheDocument();
  });

  it('should render publications by year', async () => {
    await setup();

    const publication2024 = screen.getByText(/Test Publication 2024/);
    const publication2023 = screen.getByText(/Author/);

    expect(publication2024).toBeInTheDocument();
    expect(publication2023).toBeInTheDocument();
  });
});
