import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellPopulationPredictionsComponent } from './cell-population-predictions.component';

describe('CellPopulationPredictionsComponent', () => {
  let component: CellPopulationPredictionsComponent;
  let fixture: ComponentFixture<CellPopulationPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellPopulationPredictionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CellPopulationPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
