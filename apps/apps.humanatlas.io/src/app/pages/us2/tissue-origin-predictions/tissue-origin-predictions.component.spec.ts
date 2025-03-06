import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TissueOriginPredictionsComponent } from './tissue-origin-predictions.component';

describe('TissueOriginPredictionsComponent', () => {
  let component: TissueOriginPredictionsComponent;
  let fixture: ComponentFixture<TissueOriginPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TissueOriginPredictionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TissueOriginPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
