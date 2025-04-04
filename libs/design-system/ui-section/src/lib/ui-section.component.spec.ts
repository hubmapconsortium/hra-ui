import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSectionComponent } from './ui-section.component';

describe('UiSectionComponent', () => {
  let component: UiSectionComponent;
  let fixture: ComponentFixture<UiSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
