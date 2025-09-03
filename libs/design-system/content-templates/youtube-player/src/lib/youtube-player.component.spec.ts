import { render } from '@testing-library/angular';
import { HraYoutubePlayerComponent } from './youtube-player.component';

describe('HraYoutubePlayerComponent', () => {
  it('should render', async () => {
    const promise = render(HraYoutubePlayerComponent, {
      inputs: {
        videoId: 'lYRNWAPxyqM',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
