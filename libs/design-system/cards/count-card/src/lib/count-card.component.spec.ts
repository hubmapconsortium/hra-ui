import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountCardComponent } from './count-card.component';

describe('CountCardComponent', () => {
  let component: CountCardComponent;
  let fixture: ComponentFixture<CountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
