import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TissueOriginPredictorComponent } from './tissue-origin-predictor.component';

describe('TissueOriginPredictorComponent', () => {
  let component: TissueOriginPredictorComponent;
  let fixture: ComponentFixture<TissueOriginPredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TissueOriginPredictorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TissueOriginPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
