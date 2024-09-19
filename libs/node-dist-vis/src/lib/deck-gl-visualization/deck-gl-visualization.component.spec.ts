import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckGlVisualizationComponent } from './deck-gl-visualization.component';

describe('DeckGlVisualizationComponent', () => {
  let component: DeckGlVisualizationComponent;
  let fixture: ComponentFixture<DeckGlVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckGlVisualizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckGlVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
