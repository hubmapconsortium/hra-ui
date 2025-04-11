import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTooltipContainerComponent } from './rich-tooltip-content.component';

describe('RichTooltipContainerComponent', () => {
  let component: RichTooltipContainerComponent;
  let fixture: ComponentFixture<RichTooltipContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTooltipContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTooltipContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
