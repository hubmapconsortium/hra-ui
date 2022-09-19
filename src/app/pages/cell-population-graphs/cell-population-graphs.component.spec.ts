import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellPopulationGraphsComponent } from './cell-population-graphs.component';

describe('CellPopulationGraphsComponent', () => {
  let component: CellPopulationGraphsComponent;
  let fixture: ComponentFixture<CellPopulationGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellPopulationGraphsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellPopulationGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
