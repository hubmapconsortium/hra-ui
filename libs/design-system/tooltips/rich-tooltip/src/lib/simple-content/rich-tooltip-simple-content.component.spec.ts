import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTooltipSimpleContentComponent } from './rich-tooltip-simple-content.component';

describe('RichTooltipSimpleContentComponent', () => {
  let component: RichTooltipSimpleContentComponent;
  let fixture: ComponentFixture<RichTooltipSimpleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTooltipSimpleContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTooltipSimpleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
