import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';

import { DataViewerWithQueryParamsComponent } from './data-viewer-with-query-params.component';
import { ReleaseVersionData } from '@hra-ui/design-system/data-viewer';

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

  const providers = [provideHttpClient(), provideRouter([])];

  it('should create', async () => {
    const { fixture } = await render(DataViewerWithQueryParamsComponent, {
      providers,
      inputs: {
        releaseVersionData: mockReleaseVersionData,
        variant: 'ftu' as const,
        githubIconsUrl: 'https://github.com/test',
      },
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render data viewer with inputs', async () => {
    const { container } = await render(DataViewerWithQueryParamsComponent, {
      providers,
      inputs: {
        releaseVersionData: mockReleaseVersionData,
        variant: 'ftu' as const,
        githubIconsUrl: 'https://github.com/test',
      },
    });

    const dataViewer = container.querySelector('hra-data-viewer');
    expect(dataViewer).toBeTruthy();
  });
});
