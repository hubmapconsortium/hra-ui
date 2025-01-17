import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellPopulationPredictorComponent } from './cell-population-predictor.component';

describe('CellPopulationPredictorComponent', () => {
  let component: CellPopulationPredictorComponent;
  let fixture: ComponentFixture<CellPopulationPredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellPopulationPredictorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CellPopulationPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
