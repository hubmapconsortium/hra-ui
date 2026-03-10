import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';

import { provideHttpClient } from '@angular/common/http';
import { ReleaseVersionData } from '@hra-ui/design-system/data-viewer';
import { provideIcons } from '@hra-ui/design-system/icons';
import { DataViewerWithQueryParamsComponent } from './data-viewer-with-query-params.component';

describe('DataViewerWithQueryParamsComponent', () => {
  const mockReleaseVersionData: ReleaseVersionData[] = [
    {
      version: 'v1.0',
      date: '2024-01-01',
      label: 'Release 1.0',
      organData: [
        {
          label: 'Kidney',
          icon: 'organ:kidney',
          cards: [
            {
              label: 'Test Card',
              fileUrl: 'https://example.com/test.png',
              sourceDataUrl: 'https://example.com/source',
              files: [
                {
                  label: 'PNG',
                  url: 'https://example.com/test.png',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const providers = [provideIcons(), provideHttpClient(), provideRouter([])];

  async function setup(
    inputs = {
      releaseVersionData: mockReleaseVersionData,
      variant: 'ftu' as const,
      githubIconsUrl: 'https://github.com/test',
    },
  ) {
    const result = await render(DataViewerWithQueryParamsComponent, { providers, inputs });
    return result;
  }

  it('should create', async () => {
    await setup();

    const menuButton = await screen.findByRole('button', { name: /open the data viewer's menu/i });
    expect(menuButton).toBeInTheDocument();

    const title = await screen.findByText(/Functional Tissue Units/i);
    expect(title).toBeInTheDocument();
  });

  it('should render data viewer with inputs', async () => {
    await setup();

    const kidneyLabel = await screen.findByText(/Kidney/);
    expect(kidneyLabel).toBeInTheDocument();
  });
});
