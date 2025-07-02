import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellPopulationGraphComponent } from './cell-population-graph.component';

describe('CellPopulationGraphComponent', () => {
  let component: CellPopulationGraphComponent;
  let fixture: ComponentFixture<CellPopulationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellPopulationGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CellPopulationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
