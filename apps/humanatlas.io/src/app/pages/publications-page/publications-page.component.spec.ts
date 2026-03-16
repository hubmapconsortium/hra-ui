import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { PublicationData } from '../../schemas/publications-page/publications-page.schema';
import { PublicationsPageComponent } from './publications-page.component';

describe('PublicationsPageComponent', () => {
  const mockPublicationsData: PublicationData = [
    {
      dateStart: new Date('2024-01-01'),
      description: 'Test Publication 2024',
    },
    {
      dateStart: new Date('2023-01-01'),
      description: 'Test Publication 2023 by Author',
    },
  ];

  const providers = [provideIcons(), provideHttpClient(), provideHttpClientTesting(), provideMarkdown()];

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
