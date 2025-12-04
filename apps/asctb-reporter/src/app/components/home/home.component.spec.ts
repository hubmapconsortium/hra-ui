import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { provideIcons } from '@hra-ui/design-system/icons';
import { provideMarkdown } from 'ngx-markdown';
import { HomeComponent } from './home.component';

/** Mock type for YouTubePlayer with the methods used in tests */
type MockYouTubePlayer = Pick<YouTubePlayer, 'pauseVideo' | 'seekTo' | 'playVideo'>;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideMarkdown(), provideIcons()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should seek video and update selected section', () => {
    // Mock the YouTube player
    const mockPlayer: MockYouTubePlayer = {
      pauseVideo: jest.fn(),
      seekTo: jest.fn(),
      playVideo: jest.fn(),
    };

    // Mock the player signal to return our mock player
    const youtubeComponent = component.youtubePlayerComponent();
    jest.spyOn(youtubeComponent, 'player').mockReturnValue(mockPlayer as YouTubePlayer);

    component.seekVideo(30, 2);

    expect(component['selectedVideoSection']()).toBe(2);
    expect(mockPlayer.pauseVideo).toHaveBeenCalled();
    expect(mockPlayer.seekTo).toHaveBeenCalledWith(30, true);
    expect(mockPlayer.playVideo).toHaveBeenCalled();
  });

  it('should update selected video section state', () => {
    // Test just the state change without YouTube player interaction
    const initialSection = component['selectedVideoSection']();
    expect(initialSection).toBe(0);

    // We can test state changes by accessing the signal directly
    component['selectedVideoSection'].set(3);
    expect(component['selectedVideoSection']()).toBe(3);
  });
});
