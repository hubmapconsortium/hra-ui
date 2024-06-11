import { render, screen } from '@testing-library/angular';
import { IframeContainerComponent } from './iframe-container.component';

describe('IframeContainerComponent', () => {
  it('should render title and iframe', async () => {
    const iframeTitle = 'Iframe Title';
    const spec = {
      type: 'IFrameContainer',
      title: iframeTitle,
      iframeUrl: 'https://example.com',
      aspectRatio: '16/9',
    };

    await render(IframeContainerComponent, {
      componentInputs: { spec: spec },
    });

    const title = screen.getByText(iframeTitle);
    const iframe = screen.getByTitle(iframeTitle);

    expect(title).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://example.com');
  });
});
