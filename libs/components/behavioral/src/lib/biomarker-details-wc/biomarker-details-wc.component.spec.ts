import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomarkerDetailsWcComponent } from './biomarker-details-wc.component';

describe('BiomarkerDetailsWcComponent', () => {
  let component: BiomarkerDetailsWcComponent;
  let fixture: ComponentFixture<BiomarkerDetailsWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomarkerDetailsWcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomarkerDetailsWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
