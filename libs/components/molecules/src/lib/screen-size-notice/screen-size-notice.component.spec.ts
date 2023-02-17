import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeNoticeComponent } from './screen-size-notice.component';

describe('ScreenSizeNoticeComponent', () => {
  let component: ScreenSizeNoticeComponent;
  let fixture: ComponentFixture<ScreenSizeNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenSizeNoticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenSizeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
