import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomarkerTableDataCardComponent } from './biomarker-table-data-card.component';

describe('BiomarkerTableDataCardComponent', () => {
  let component: BiomarkerTableDataCardComponent;
  let fixture: ComponentFixture<BiomarkerTableDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomarkerTableDataCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomarkerTableDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
