import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraPopVisualizerComponent } from './hra-pop-visualizer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

// Polyfill for structuredClone in Node.js environment
(globalThis as any).structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));

// Mock vega-embed
jest.mock('vega-embed', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    finalize: jest.fn(),
    view: jest.fn(),
  }),
}));

describe('HraPopVisualizerComponent', () => {
  let component: HraPopVisualizerComponent;
  let fixture: ComponentFixture<HraPopVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraPopVisualizerComponent, HttpClientTestingModule],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(HraPopVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
