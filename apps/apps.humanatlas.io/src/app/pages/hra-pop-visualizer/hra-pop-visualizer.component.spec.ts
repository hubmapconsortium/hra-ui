import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraPopVisualizerComponent } from './hra-pop-visualizer.component';

describe('HraPopVisualizerComponent', () => {
  let component: HraPopVisualizerComponent;
  let fixture: ComponentFixture<HraPopVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraPopVisualizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HraPopVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
