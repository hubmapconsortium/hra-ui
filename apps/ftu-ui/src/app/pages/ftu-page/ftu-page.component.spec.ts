import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtuPageComponent } from './ftu-page.component';

describe('FtuPageComponent', () => {
  let component: FtuPageComponent;
  let fixture: ComponentFixture<FtuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtuPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
