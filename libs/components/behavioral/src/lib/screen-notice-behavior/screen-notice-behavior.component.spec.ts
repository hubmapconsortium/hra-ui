import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenNoticeBehaviorComponent } from './screen-notice-behavior.component';

describe('ScreenNoticeBehaviorComponent', () => {
  let component: ScreenNoticeBehaviorComponent;
  let fixture: ComponentFixture<ScreenNoticeBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenNoticeBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenNoticeBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
