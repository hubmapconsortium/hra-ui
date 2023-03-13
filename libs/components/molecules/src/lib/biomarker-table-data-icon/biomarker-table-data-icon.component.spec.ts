import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomarkerTableDataIconComponent } from './biomarker-table-data-icon.component';

describe('BiomarkerTableDataIconComponent', () => {
  let component: BiomarkerTableDataIconComponent;
  let fixture: ComponentFixture<BiomarkerTableDataIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomarkerTableDataIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomarkerTableDataIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
