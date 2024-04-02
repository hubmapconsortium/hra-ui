import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraButtonComponent } from './hra-button.component';

describe('HraButtonComponent', () => {
  let component: HraButtonComponent;
  let fixture: ComponentFixture<HraButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HraButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
