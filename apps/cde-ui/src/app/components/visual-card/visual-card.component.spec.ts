import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualCardComponent } from './visual-card.component';

describe('VisualCardComponent', () => {
  let component: VisualCardComponent;
  let fixture: ComponentFixture<VisualCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
