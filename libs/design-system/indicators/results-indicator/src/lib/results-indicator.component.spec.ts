import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsIndicatorComponent } from './results-indicator.component';

describe('ResultsIndicatorComponent', () => {
  let component: ResultsIndicatorComponent;
  let fixture: ComponentFixture<ResultsIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
