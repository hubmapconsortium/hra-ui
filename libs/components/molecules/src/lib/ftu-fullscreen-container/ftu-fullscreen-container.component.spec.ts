import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtuFullscreenContainerComponent } from './ftu-fullscreen-container.component';

describe('FtuFullscreenContainerComponent', () => {
  let component: FtuFullscreenContainerComponent;
  let fixture: ComponentFixture<FtuFullscreenContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtuFullscreenContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtuFullscreenContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
