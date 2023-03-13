import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBehaviorComponent } from './header-behavior.component';

describe('HeaderBehaviorComponent', () => {
  let component: HeaderBehaviorComponent;
  let fixture: ComponentFixture<HeaderBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
