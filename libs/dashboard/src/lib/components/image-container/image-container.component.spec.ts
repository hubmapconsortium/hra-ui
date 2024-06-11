import { ImageContainerComponent } from './image-container.component';
import { render, screen } from '@testing-library/angular';

describe('ImageContainerComponent', () => {
  const testImageInputs = {
    title: 'test',
    tooltip: 'tooltip',
    imageUrl: 'test.png',
    aspectRatio: '1/3',
  };
  beforeEach(async () => {
    await render(ImageContainerComponent, {
      componentInputs: { spec: testImageInputs },
    });
  });

  it('should create image container', async () => {
    expect(await screen.findByText('test')).toBeInTheDocument();
    expect(await screen.findByRole('img')).toHaveAttribute('src', 'test.png');
  });
});
