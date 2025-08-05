import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraPopValidationComponent } from './hra-pop-validation.component';

describe('HraPopValidationComponent', () => {
  let component: HraPopValidationComponent;
  let fixture: ComponentFixture<HraPopValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraPopValidationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HraPopValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
