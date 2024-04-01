import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateVisualizationPageComponent } from './create-visualization-page.component';

describe('CreateVisualizationPageComponent', () => {
  let component: CreateVisualizationPageComponent;
  let fixture: ComponentFixture<CreateVisualizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVisualizationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVisualizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
