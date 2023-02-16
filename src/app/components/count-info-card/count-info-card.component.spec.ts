import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountInfoCardComponent } from './count-info-card.component';

describe('CountInfoCardComponent', () => {
  let component: CountInfoCardComponent;
  let fixture: ComponentFixture<CountInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
