import { render, screen } from '@testing-library/angular';
import { IframeContainerComponent } from './iframe-container.component';

describe('IframeContainerComponent', () => {
  it('should render title and iframe', async () => {
    const spec = {
      type: 'IFrameContainer',
      title: 'Iframe Title',
      iframeUrl: 'https://example.com',
      aspectRatio: '16/9',
    };

    await render(IframeContainerComponent, {
      componentInputs: { spec: spec },
    });

    const title = screen.getByText('Iframe Title');
    const iframe = screen.getByTitle('Iframe Title');

    expect(title).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://example.com');
  });
});
