import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomarkerDetailsComponent } from './biomarker-details.component';

describe('BiomarkerDetailsComponent', () => {
  let component: BiomarkerDetailsComponent;
  let fixture: ComponentFixture<BiomarkerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomarkerDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomarkerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
