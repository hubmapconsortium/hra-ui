import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipCardComponent } from './tooltip-card.component';

describe('TooltipCardComponent', () => {
  let component: TooltipCardComponent;
  let fixture: ComponentFixture<TooltipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
