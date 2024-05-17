import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerLabelComponent } from './color-picker-label.component';

describe('ColorPickerLabelComponent', () => {
  let component: ColorPickerLabelComponent;
  let fixture: ComponentFixture<ColorPickerLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
