import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { provideMarkdown } from 'ngx-markdown';
import { HomeComponent } from './home.component';

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
    const player = component.player();

    const pauseVideoSpy = jest.spyOn(player, 'pauseVideo').mockImplementation(() => {});
    const seekToSpy = jest.spyOn(player, 'seekTo').mockImplementation(() => {});
    const playVideoSpy = jest.spyOn(player, 'playVideo').mockImplementation(() => {});

    component.seekVideo(30, 2);

    expect(component['selectedVideoSection']()).toBe(2);
    expect(pauseVideoSpy).toHaveBeenCalled();
    expect(seekToSpy).toHaveBeenCalledWith(30, true);
    expect(playVideoSpy).toHaveBeenCalled();

    // Clean up spies
    pauseVideoSpy.mockRestore();
    seekToSpy.mockRestore();
    playVideoSpy.mockRestore();
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
