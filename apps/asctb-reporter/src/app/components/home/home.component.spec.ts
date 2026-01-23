import { provideHttpClient } from '@angular/common/http';
import { YouTubePlayer } from '@angular/youtube-player';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { HomeComponent } from './home.component';

/** Mock type for YouTubePlayer with the methods used in tests */
type MockYouTubePlayer = Pick<YouTubePlayer, 'pauseVideo' | 'seekTo' | 'playVideo'>;

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(async () => {
    const result = await render(HomeComponent, {
      providers: [provideHttpClient(), provideMarkdown(), provideIcons()],
    });
    component = result.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should seek video and update selected section when clicking chapter button', async () => {
    const mockPlayer: MockYouTubePlayer = {
      pauseVideo: jest.fn(),
      seekTo: jest.fn(),
      playVideo: jest.fn(),
    };

    const youtubeComponent = component.youtubePlayerComponent();
    jest.spyOn(youtubeComponent, 'player').mockReturnValue(mockPlayer as YouTubePlayer);

    const chapterBtn = screen.getByText('Introduction').closest('button') as HTMLElement;
    await userEvent.click(chapterBtn);

    expect(chapterBtn.className).toMatch(/section-selected/);
    expect(mockPlayer.pauseVideo).toHaveBeenCalled();
    expect(mockPlayer.seekTo).toHaveBeenCalledWith(3, true);
    expect(mockPlayer.playVideo).toHaveBeenCalled();
  });

  it('should update selected video section when clicking on different chapters', async () => {
    const introBtn = screen.getByText('Introduction').closest('button') as HTMLElement;
    const searchBtn = screen.getByText('Search').closest('button') as HTMLElement;

    // Initially the first chapter is selected
    expect(introBtn.className).toMatch(/section-selected/);

    await userEvent.click(searchBtn);
    expect(searchBtn.className).toMatch(/section-selected/);
    expect(introBtn.className).not.toMatch(/section-selected/);

    await userEvent.click(introBtn);
    expect(introBtn.className).toMatch(/section-selected/);
  });
});
