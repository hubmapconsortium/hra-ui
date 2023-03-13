import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomarkerTableComponent } from './biomarker-table.component';

describe('BiomarkerTableComponent', () => {
  let component: BiomarkerTableComponent;
  let fixture: ComponentFixture<BiomarkerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomarkerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomarkerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
