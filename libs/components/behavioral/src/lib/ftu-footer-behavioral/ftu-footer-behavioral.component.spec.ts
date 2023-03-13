import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtuFooterBehavioralComponent } from './ftu-footer-behavioral.component';

describe('FtuFooterBehavioralComponent', () => {
  let component: FtuFooterBehavioralComponent;
  let fixture: ComponentFixture<FtuFooterBehavioralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtuFooterBehavioralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtuFooterBehavioralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
