import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtuComponent } from './ftu.component';

describe('FtuPageComponent', () => {
  let component: FtuComponent;
  let fixture: ComponentFixture<FtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
