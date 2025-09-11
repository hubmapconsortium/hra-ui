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

  it('should have contributors', () => {
    expect(component['contributors']).toBeDefined();
    expect(Array.isArray(component['contributors'])).toBe(true);
  });

  it('should have video sections', () => {
    expect(component['videoSections']).toBeDefined();
    expect(Array.isArray(component['videoSections'])).toBe(true);
  });

  it('should initialize with first video section selected', () => {
    expect(component['selectedVideoSection']()).toBe(0);
  });

  it('should seek video and update selected section', () => {
    const mockPlayer = {
      pauseVideo: jest.fn(),
      seekTo: jest.fn(),
      playVideo: jest.fn(),
    };

    // Mock the player viewChild
    Object.defineProperty(component, 'player', {
      value: () => mockPlayer,
      writable: true,
    });

    component['seekVideo'](30, 2);

    expect(component['selectedVideoSection']()).toBe(2);
    expect(mockPlayer.pauseVideo).toHaveBeenCalled();
    expect(mockPlayer.seekTo).toHaveBeenCalledWith(30, true);
    expect(mockPlayer.playVideo).toHaveBeenCalled();
  });
});
