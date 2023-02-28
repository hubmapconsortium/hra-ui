import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtuFullscreenContentComponent } from './ftu-fullscreen-content.component';

describe('FtuFullscreenContentComponent', () => {
  let component: FtuFullscreenContentComponent;
  let fixture: ComponentFixture<FtuFullscreenContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtuFullscreenContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtuFullscreenContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
